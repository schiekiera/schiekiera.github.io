# cSLN spreading-activation visualization

Interactive companion to the cSLN project (spreading activation in the
picture–word interference paradigm). Pick a target and an attested
distractor, then step the lazy random walk over the fastText semantic space
(k = 0 … 20 and the stationary distribution π). The side panel shows the
pair's semantic variables by model rung (M1–M5), with green bars locating
each value within its min/max across the stimuli shipped with this tool.

Fully static: precomputed JSON + plain HTML/ES modules + vendored D3
(`lib/d3.v7.min.js`). No build step, no external requests.

Data are precomputed in the (private) research repository by
`05_visualize_networks/webviz/precompute.py`, which replicates the paper's
HPC feature pipeline (float16 cosine matrix, lazy walk DM = (2·SMNORM + I)/3,
ε = 1e-12 smoothing, natural-log entropies) and hard-fails unless the
recomputed features match the modelling dataset. The display's "show top"
count is a rendering budget only — the model itself always operates on the
full 29,998-neighbor distribution (default view: All, with the exact top-200
plus the remaining words at their average activation; exact π at k = ∞).

Note: the English stationary distribution π is dominated by a proper-noun/
surname hub cluster — a real property of the ukWaC fastText space, not an
artifact.
