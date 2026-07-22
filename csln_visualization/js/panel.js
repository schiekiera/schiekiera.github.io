// Variables panel: semantic variables grouped by model rung, labeled as in
// the paper (tables_figures.R display labels). M1/M2 are step-independent
// df_final values; the M3–M5 rows track the displayed step k (k = 1 shows
// the df_final values verbatim). Green bars locate each value within its
// min/max across the stimuli shipped with this tool.

function fmt(v) {
  if (v == null || Number.isNaN(v)) return "–";
  const a = Math.abs(v);
  if (a !== 0 && a < 0.001) return v.toExponential(2);
  return v.toFixed(4);
}

function bar(value, range) {
  if (value == null || !range) return "";
  const [lo, hi] = range;
  if (!(hi > lo)) return "";
  const pct = Math.max(0, Math.min(1, (value - lo) / (hi - lo))) * 100;
  return `<div class="vbar"><div class="vbar-fill" style="width:${pct.toFixed(1)}%"></div></div>`;
}

function row(label, value, opts = {}) {
  return `<div class="varblock">
    <div class="varrow${opts.sub ? " sub" : ""}">
      <span class="vlab">${label}</span>
      <span class="vval" title="${value ?? ""}">${fmt(value)}</span>
    </div>${bar(value, opts.range)}
  </div>`;
}

function rung(tag, name, rows) {
  return `<div class="rung"><span class="rung-tag">${tag}</span><span class="rung-name">${name}</span>${rows}</div>`;
}

export function renderPanel(el, target, distractor, vars, sv, ranges) {
  const kl = sv.kLabel;
  const rs = sv.kKey ? ranges.steps[sv.kKey] : null;
  el.innerHTML = `
    <h2><span class="pair-t">${target}</span> – <span class="pair-d">${distractor}</span></h2>
    ${rung("M1", "pairwise similarity",
      row("cos(t,d)", vars.cosine_similarity, { range: ranges.cosine_similarity }))}
    ${rung("M2", "neighborhood density",
      row("Density<sub>fixed</sub>(t)", vars.fixed_density_target, { range: ranges.fixed_density }) +
      row("Density<sub>fixed</sub>(d)", vars.fixed_density_context, { range: ranges.fixed_density }))}
    ${rung("M3", "asymmetric spreading",
      row(`diff<sub>p,${kl}</sub>`, sv.dp, { range: rs?.diff_p }) +
      row(`p<sub>${kl}</sub>(t→d)`, sv.ptd, { sub: true }) +
      row(`p<sub>${kl}</sub>(d→t)`, sv.pdt, { sub: true }))}
    ${rung("M4", "cohort breadth",
      row(`H<sub>${kl}</sub>`, sv.H, { range: rs?.H }))}
    ${rung("M5", "multi-step swing",
      row(`KL(p<sub>${kl}</sub>‖π)`, sv.KL, { range: rs?.KL }) +
      row(`H(p<sub>${kl}</sub>,π)`, sv.CE, { sub: true }))}
    <div class="panel-meta">${vars.n_trials} trials in df_final · ${sv.note} ·
      bars: min–max across this tool's stimuli</div>
  `;
}
