// App bootstrap + state. Language is a parameter: German is a precompute
// rerun (data/index_de.json etc.), not a code change.

import { loadIndex, loadCoords, loadShard } from "./data.js";
import { Scatter } from "./scatter.js";
import { renderPanel } from "./panel.js";
import { Controls } from "./controls.js";

const LANG = "en";
const PLAY_MS = 950;
// Display counts. "All" = the model's actual object (every neighbour); the
// shipped exact head (index.top_n) is only a data/rendering budget.
const TOPN_OPTIONS = [10, 25, 50, 100, 200, 500, 1000, 5000, 10000, 20000, "All"];

const state = {
  index: null,
  shard: null,
  target: null,
  distractor: null,
  k: "1",
  topN: "all",
  qMaxPair: 0,
  allPairs: [],
  playTimer: null,
};

const targetSel = document.getElementById("target-select");
const distractorSel = document.getElementById("distractor-select");
const topnSel = document.getElementById("topn-select");
const scatter = new Scatter(
  document.getElementById("scatter"),
  document.getElementById("scatter-canvas"),
  document.getElementById("scatter-wrap"),
  document.getElementById("tooltip")
);
let controls;

function pairData() {
  return state.shard.distractors[state.distractor];
}

function stepItems(k) {
  const pair = pairData();
  const identity = state.target === state.distractor;
  const nNeigh = scatter.words.length - (identity ? 1 : 2);
  const HEAD = state.index.top_n;
  const N = state.topN === "all" ? nNeigh : Math.min(state.topN, nNeigh);
  if (k === "0") {
    return { items: [], qMax: 1, showEdges: false, dust: null, shownMass: null, nNeigh, nShown: 0 };
  }
  if (k === "inf") {
    const skip = new Set([state.target, state.distractor]);
    const items = [];
    for (const i of scatter.piOrder) {
      if (items.length >= Math.min(N, HEAD)) break;
      const w = scatter.words[i];
      if (skip.has(w)) continue;
      items.push({ word: w, q: scatter.pi[i], s: null });
    }
    const dustN = N - items.length;
    const exclude = new Set([state.target, state.distractor, ...items.map((it) => it.word)]);
    return {
      items, qMax: items[0]?.q ?? 1, showEdges: false,
      dust: dustN > 0 ? { mode: "pi", n: dustN, exclude } : null,
      shownMass: null, nNeigh, nShown: N,
    };
  }
  const st = pair.steps[k];
  const nHead = Math.min(N, st.idx.length);
  const items = [];
  for (let j = 0; j < nHead; j++) {
    items.push({ word: state.shard.words[st.idx[j]], q: st.q[j], s: st.s[j] });
  }
  const shownMass = items.reduce((a, b) => a + b.q, 0);
  let dust = null;
  if (N > st.idx.length) {
    const avg = (1 - st.mass) / (nNeigh - st.idx.length);
    dust = {
      mode: "uniform", q: avg, n: N - st.idx.length,
      exclude: new Set([state.target, state.distractor, ...items.map((it) => it.word)]),
    };
  }
  return { items, qMax: state.qMaxPair, showEdges: true, dust, shownMass, nNeigh, nShown: N };
}

function caption(k, view) {
  const HEAD = state.index.top_n;
  if (k === "0") return "k = 0 — only target and distractor are active; step through k or press play.";
  if (k === "inf") {
    return view.dust
      ? `k = ∞: stationary distribution π over the full vocabulary — top ${view.items.length} marked, remaining ${view.dust.n.toLocaleString()} words sized by π (exact).`
      : `k = ∞: top ${view.items.length} of the stationary distribution π.`;
  }
  const massPct = (view.shownMass * 100).toFixed(1);
  if (!view.dust) {
    return `k = ${k}: joint activation of target + distractor · top ${view.items.length} of ${view.nNeigh.toLocaleString()} neighbours · shown mass = ${massPct}%.`;
  }
  return `k = ${k}: top ${HEAD} exact (${massPct}% of the mass) + ${view.dust.n.toLocaleString()} tail words at their average activation — the model itself always uses all ${view.nNeigh.toLocaleString()} neighbours.`;
}

function panelStepVals(k) {
  const pair = pairData();
  const identity = state.target === state.distractor;
  if (k === "0") {
    return { kLabel: "0", kKey: null, ptd: identity ? 1 : 0, pdt: identity ? 1 : 0,
             dp: 0, H: null, CE: null, KL: null, note: "no spreading yet at k = 0" };
  }
  if (k === "1") {
    const v = pair.vars;
    return { kLabel: "1", kKey: "1", ptd: v.p1_td, pdt: v.p1_dt, dp: v.diff_p1,
             H: v.H_k1, CE: v.CE_pi_k1, KL: v.KL_1pi, note: "k = 1 values verbatim from df_final" };
  }
  if (k === "inf") {
    const s = pair.inf;
    return { kLabel: "∞", kKey: "inf", ptd: s.ptd, pdt: s.pdt, dp: s.dp,
             H: s.H, CE: s.CE, KL: s.KL, note: "stationary limit (recomputed)" };
  }
  const s = pair.steps[k];
  return { kLabel: k, kKey: k, ptd: s.ptd, pdt: s.pdt, dp: s.dp,
           H: s.H, CE: s.CE, KL: s.KL, note: `M3–M5 recomputed at k = ${k}` };
}

function render() {
  const view = stepItems(state.k);
  scatter.render({
    target: state.target,
    distractor: state.distractor,
    items: view.items,
    qMax: view.qMax,
    showEdges: view.showEdges,
    dust: view.dust,
  });
  renderPanel(document.getElementById("panel"), state.target, state.distractor,
              pairData().vars, panelStepVals(state.k), state.index.ranges);
  controls.setActiveStep(state.k);
  controls.setCaption(caption(state.k, view));
}

function setStep(k) {
  stopPlay();
  state.k = String(k);
  render();
}

function stopPlay() {
  if (state.playTimer) {
    clearInterval(state.playTimer);
    state.playTimer = null;
    controls.setPlaying(false);
  }
}

function togglePlay() {
  if (state.playTimer) {
    stopPlay();
    return;
  }
  const seq = state.index.steps.map(String);
  let i = 0;
  state.k = seq[0];
  render();
  controls.setPlaying(true);
  state.playTimer = setInterval(() => {
    i += 1;
    if (i >= seq.length) {
      stopPlay();
      return;
    }
    state.k = seq[i];
    render();
  }, PLAY_MS);
}

async function setTarget(word, preferredDistractor = null) {
  stopPlay();
  state.target = word;
  state.shard = await loadShard(LANG, word);
  const entry = state.index.targets.find((t) => t.word === word);
  distractorSel.innerHTML = "";
  for (const d of entry.distractors) {
    const o = document.createElement("option");
    o.value = o.textContent = d;
    distractorSel.appendChild(o);
  }
  let pick = preferredDistractor && entry.distractors.includes(preferredDistractor)
    ? preferredDistractor
    : (word === "bed" && entry.distractors.includes("sofa") ? "sofa" : entry.distractors[0]);
  distractorSel.value = pick;
  setDistractor(pick);
}

function setDistractor(word) {
  stopPlay();
  state.distractor = word;
  const pair = pairData();
  state.qMaxPair = Math.max(...Object.values(pair.steps).map((st) => st.q[0] ?? 0));
  render();
}

function randomPair() {
  const [t, d] = state.allPairs[Math.floor(Math.random() * state.allPairs.length)];
  if (t === state.target) {
    distractorSel.value = d;
    setDistractor(d);
  } else {
    targetSel.value = t;
    setTarget(t, d);
  }
}

async function boot() {
  const [index, coords] = await Promise.all([loadIndex(LANG), loadCoords(LANG)]);
  state.index = index;
  scatter.setCoords(coords);
  document.getElementById("lang-badge").textContent = index.language.toUpperCase();
  state.allPairs = index.targets.flatMap((t) => t.distractors.map((d) => [t.word, d]));

  controls = new Controls({
    steps: index.steps,
    onStep: setStep,
    onPlay: togglePlay,
  });

  for (const n of TOPN_OPTIONS) {
    const o = document.createElement("option");
    o.value = String(n);
    o.textContent = String(n);
    topnSel.appendChild(o);
  }
  topnSel.value = "All";
  topnSel.addEventListener("change", () => {
    state.topN = topnSel.value === "All" ? "all" : +topnSel.value;
    render();
  });
  document.getElementById("random-btn").addEventListener("click", randomPair);

  for (const t of index.targets) {
    const o = document.createElement("option");
    o.value = o.textContent = t.word;
    targetSel.appendChild(o);
  }
  targetSel.addEventListener("change", () => setTarget(targetSel.value));
  distractorSel.addEventListener("change", () => setDistractor(distractorSel.value));

  const first = index.targets.some((t) => t.word === "bed") ? "bed" : index.targets[0].word;
  targetSel.value = first;
  await setTarget(first);
}

boot().catch((e) => {
  console.error(e);
  document.getElementById("caption").textContent =
    `failed to load data — run precompute.py first (${e.message})`;
});
