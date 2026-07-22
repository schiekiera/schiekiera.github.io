// Scatter renderer. Two layers sharing one zoom transform:
//   canvas (below): all 30k vocabulary words as grey dots + the "dust" tail
//                   (activation beyond the exact head) as translucent green
//   svg (above):    exact-head neighbor nodes, edges, stimuli, labels
// Uses the global `d3` from the vendored UMD bundle.

const W = 1200;
const H = 800;
const PAD = 45;
const DUR = 450;
const N_LABELS = 10;
const EDGE_MAX = 100;   // edges drawn for at most this many head words
const R_MIN = 1.4;
const R_MAX = 15;

export class Scatter {
  constructor(svgEl, canvasEl, wrapEl, tooltipEl) {
    this.svg = d3.select(svgEl);
    this.canvas = canvasEl;
    this.wrap = wrapEl;
    this.tip = tooltipEl;

    this.pt = new Map();      // word -> [x, y] in SVG units
    this.wordIdx = new Map(); // word -> vocab index
    this.words = [];
    this.xy = null;           // Float64Array 2n, SVG units
    this.pi = null;           // stationary distribution, aligned with words
    this.piOrder = null;      // vocab indices sorted by pi desc
    this.dustList = [];       // [[vocabIdx, r_svg], ...] for the canvas
    this.transform = d3.zoomIdentity;

    this.root = this.svg.append("g").attr("class", "root");
    this.gEdges = this.root.append("g");
    this.gNodes = this.root.append("g");
    this.gStim = this.root.append("g");
    this.gLabels = this.root.append("g");

    this.svg.call(
      d3.zoom()
        .scaleExtent([0.5, 14])
        .on("zoom", (e) => {
          this.transform = e.transform;
          this.root.attr("transform", e.transform);
          this.scheduleRedraw();
        })
    );
    window.addEventListener("resize", () => this.scheduleRedraw());
  }

  setCoords(coords) {
    const n = coords.words.length;
    this.words = coords.words;
    this.pi = coords.pi;
    const xs = coords.xy.map((p) => p[0]);
    const ys = coords.xy.map((p) => p[1]);
    const x = d3.scaleLinear().domain(d3.extent(xs)).range([PAD, W - PAD]);
    const y = d3.scaleLinear().domain(d3.extent(ys)).range([H - PAD, PAD]);
    this.xy = new Float64Array(2 * n);
    this.pt.clear();
    this.wordIdx.clear();
    for (let i = 0; i < n; i++) {
      const px = x(coords.xy[i][0]);
      const py = y(coords.xy[i][1]);
      this.xy[2 * i] = px;
      this.xy[2 * i + 1] = py;
      this.pt.set(coords.words[i], [px, py]);
      this.wordIdx.set(coords.words[i], i);
    }
    this.piOrder = Array.from({ length: n }, (_, i) => i)
      .sort((a, b) => coords.pi[b] - coords.pi[a]);
    this.scheduleRedraw();
  }

  rOf(q, qMax) {
    return R_MIN + (R_MAX - R_MIN) * Math.sqrt(Math.min(q / Math.max(qMax, 1e-12), 1));
  }

  // view: {target, distractor, items:[{word,q,s}], qMax, showEdges,
  //        dust: null | {mode:'uniform'|'pi', q?, n, exclude:Set<word>}}
  render(view) {
    const { target, distractor, qMax, showEdges } = view;
    const identity = target === distractor;
    const pT = this.pt.get(target);
    const pD = this.pt.get(distractor);
    const items = view.items.filter((it) => {
      const ok = this.pt.has(it.word);
      if (!ok) console.warn("no coords for", it.word);
      return ok;
    });

    const rScale = (q) => this.rOf(q, qMax);
    const wScale = d3.scaleLinear().domain([0, Math.max(qMax, 1e-12)]).range([0, 5.5]);
    const alpha = (q) => 0.35 + 0.65 * Math.min(q / Math.max(qMax, 1e-12), 1);
    const t = d3.transition().duration(DUR).ease(d3.easeCubicOut);

    // ---- dust layer (canvas) ----
    // Compressed radii (≤ ~3px): at 10-30k points, head-scale circles stack
    // into an opaque blob; the tail should read as a tint, the head on top.
    this.dustList = [];
    if (view.dust && view.dust.n > 0) {
      const excl = new Set();
      for (const w of view.dust.exclude) {
        const i = this.wordIdx.get(w);
        if (i !== undefined) excl.add(i);
      }
      const d = view.dust;
      this.dustAlpha = d.mode === "pi" ? 0.16 : 0.12;
      const dustR = (q) => 0.8 + 2.2 * Math.sqrt(Math.min(q / Math.max(qMax, 1e-12), 1));
      for (const i of this.piOrder) {
        if (this.dustList.length >= d.n) break;
        if (excl.has(i)) continue;
        const q = d.mode === "pi" ? this.pi[i] : d.q;
        this.dustList.push([i, dustR(q)]);
      }
    }
    this.scheduleRedraw();

    // ---- edges (top EDGE_MAX head words only) ----
    let edges = [];
    if (showEdges && pT && pD) {
      for (const it of items.slice(0, EDGE_MAX)) {
        const s = it.s == null ? 0.5 : it.s;
        edges.push({ key: `t|${it.word}`, from: pT, it, w: wScale(it.q * s), cls: "edge-t" });
        if (!identity) {
          edges.push({ key: `d|${it.word}`, from: pD, it, w: wScale(it.q * (1 - s)), cls: "edge-d" });
        }
      }
    }
    this.gEdges
      .selectAll("line")
      .data(edges, (d) => d.key)
      .join(
        (enter) =>
          enter
            .append("line")
            .attr("class", (d) => d.cls)
            .attr("x1", (d) => d.from[0])
            .attr("y1", (d) => d.from[1])
            .attr("x2", (d) => this.pt.get(d.it.word)[0])
            .attr("y2", (d) => this.pt.get(d.it.word)[1])
            .attr("stroke-width", 0)
            .attr("stroke-opacity", 0),
        (update) => update,
        (exit) => exit.transition(t).attr("stroke-width", 0).attr("stroke-opacity", 0).remove()
      )
      .transition(t)
      .attr("x1", (d) => d.from[0])
      .attr("y1", (d) => d.from[1])
      .attr("x2", (d) => this.pt.get(d.it.word)[0])
      .attr("y2", (d) => this.pt.get(d.it.word)[1])
      .attr("stroke-width", (d) => d.w)
      .attr("stroke-opacity", (d) => Math.min(0.13 + 0.16 * d.w, 0.9));

    // ---- exact-head neighbor nodes (svg) ----
    const self = this;
    this.gNodes
      .selectAll("circle")
      .data(items, (d) => d.word)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "nb-node")
            .attr("cx", (d) => this.pt.get(d.word)[0])
            .attr("cy", (d) => this.pt.get(d.word)[1])
            .attr("r", 0)
            .attr("opacity", 0),
        (update) => update,
        (exit) => exit.transition(t).attr("r", 0).attr("opacity", 0).remove()
      )
      .on("mousemove", function (event, d) {
        self.showTip(event, d, view);
      })
      .on("mouseleave", () => this.hideTip())
      .transition(t)
      .attr("r", (d) => rScale(d.q))
      .attr("opacity", (d) => alpha(d.q));

    // ---- stimulus markers ----
    const stim = [];
    if (pT) stim.push({ key: "target", word: target, cls: "target", r: 9 });
    if (pD && !identity) stim.push({ key: "distractor", word: distractor, cls: "distractor", r: 7.5 });
    this.gStim
      .selectAll("circle.stim-node")
      .data(stim, (d) => d.key)
      .join("circle")
      .attr("class", (d) => `stim-node ${d.cls}`)
      .attr("r", (d) => d.r)
      .attr("cx", (d) => this.pt.get(d.word)[0])
      .attr("cy", (d) => this.pt.get(d.word)[1]);
    // identity pair (congruent condition): one node, dual-color ring
    this.gStim
      .selectAll("circle.stim-ring")
      .data(identity && pT ? [target] : [], (d) => d)
      .join("circle")
      .attr("class", "stim-ring")
      .attr("r", 13)
      .attr("cx", (d) => this.pt.get(d)[0])
      .attr("cy", (d) => this.pt.get(d)[1]);

    // ---- labels: stimuli + top head words, greedy collision-skip ----
    const labels = stim.map((d) => ({ key: `s|${d.word}`, word: d.word, stim: true, dy: -13 }));
    const taken = labels.map((l) => this.pt.get(l.word));
    const MIN_D2 = 24 * 24;
    for (const d of items.slice(0, 2 * N_LABELS)) {
      const p = this.pt.get(d.word);
      if (taken.every((q) => (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2 > MIN_D2)) {
        labels.push({ key: `c|${d.word}`, word: d.word, stim: false, dy: -8 });
        taken.push(p);
        if (labels.length >= stim.length + N_LABELS) break;
      }
    }
    this.gLabels
      .selectAll("text")
      .data(labels, (d) => d.key)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", (d) => `node-label${d.stim ? " stim" : ""}`)
            .attr("text-anchor", "middle")
            .attr("x", (d) => this.pt.get(d.word)[0])
            .attr("y", (d) => this.pt.get(d.word)[1] + d.dy)
            .attr("opacity", 0)
            .text((d) => d.word),
        (update) => update,
        (exit) => exit.transition(t).attr("opacity", 0).remove()
      )
      .transition(t)
      .attr("x", (d) => this.pt.get(d.word)[0])
      .attr("y", (d) => this.pt.get(d.word)[1] + d.dy)
      .attr("opacity", 1);
  }

  // ---- canvas ----
  scheduleRedraw() {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = null;
      this.redrawCanvas();
    });
  }

  redrawCanvas() {
    if (!this.xy) return;
    const dpr = window.devicePixelRatio || 1;
    const cw = this.wrap.clientWidth;
    const ch = this.wrap.clientHeight;
    if (this.canvas.width !== cw * dpr || this.canvas.height !== ch * dpr) {
      this.canvas.width = cw * dpr;
      this.canvas.height = ch * dpr;
    }
    const ctx = this.canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    // svg viewBox "meet" mapping composed with the zoom transform
    const s0 = Math.min(cw / W, ch / H);
    const ox = (cw - s0 * W) / 2;
    const oy = (ch - s0 * H) / 2;
    const T = this.transform;
    const sx = (x) => ox + s0 * (T.k * x + T.x);
    const sy = (y) => oy + s0 * (T.k * y + T.y);
    const sc = s0 * T.k;

    // background: every vocabulary word
    const rBg = Math.max(0.35, Math.min(1.1 * sc, 2.4));
    ctx.fillStyle = "#D9D9D9";
    ctx.globalAlpha = 0.5;
    const n = this.words.length;
    for (let i = 0; i < n; i++) {
      const x = sx(this.xy[2 * i]);
      const y = sy(this.xy[2 * i + 1]);
      if (x < -4 || x > cw + 4 || y < -4 || y > ch + 4) continue;
      ctx.fillRect(x - rBg / 2, y - rBg / 2, rBg, rBg);
    }
    // dust: tail activation beyond the exact head
    if (this.dustList.length) {
      ctx.fillStyle = "#35B779";
      ctx.globalAlpha = this.dustAlpha ?? 0.12;
      const TAU = 2 * Math.PI;
      for (const [i, rSvg] of this.dustList) {
        const x = sx(this.xy[2 * i]);
        const y = sy(this.xy[2 * i + 1]);
        if (x < -20 || x > cw + 20 || y < -20 || y > ch + 20) continue;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(rSvg * sc, 0.4), 0, TAU);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  showTip(event, d, view) {
    const rect = this.wrap.getBoundingClientRect();
    const fmt = (v) => (v >= 0.001 ? v.toFixed(4) : v.toExponential(2));
    let html = `<div class="tt-word">${d.word}</div>activation ${fmt(d.q)}`;
    if (d.s != null && view.target !== view.distractor) {
      html += `<br>via ${view.target}: ${(d.s * 100).toFixed(0)}% · via ${view.distractor}: ${((1 - d.s) * 100).toFixed(0)}%`;
    }
    this.tip.innerHTML = html;
    this.tip.style.left = `${event.clientX - rect.left}px`;
    this.tip.style.top = `${event.clientY - rect.top}px`;
    this.tip.classList.remove("hidden");
  }

  hideTip() {
    this.tip.classList.add("hidden");
  }
}
