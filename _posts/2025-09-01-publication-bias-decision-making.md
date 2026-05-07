---
layout: post
title: "Publication Bias in Academic Decision Making in Clinical Psychology"
date: 2025-09-01
description: "Our registered report in <b>Advances in Methods and Practices in Psychological Science</b> experimentally tests how statistical significance and hypothesis-consistency influence clinical psychologists' decisions to submit, read, and cite research. Across four within-subjects experiments with 303 researchers, we find a consistent preference for statistically significant abstracts, but no effect of hypothesis-consistency. Deliberation does not attenuate the bias."
authors:
  - Louis Schiekiera
  - Kristina Eichel
  - Felicitas Hesselmann
  - Jacqueline Sachse
  - Sophie Müller
  - Helen Niemeyer
tags: [metascience, publication-bias, decision-making, dual-process-theory]
thumbnail: /assets/img/blog/publication_bias_decision_making/figure3.png
publication_type: "Journal Article"
paper_url: "https://doi.org/10.1177/25152459251338393"
preregistration_url: "https://osf.io/6tpm7"
code_url: "https://github.com/schiekiera/metascience_experiment_history"
giscus_comments: false
related_posts: false
---

## Motivation

Over 60 years ago, Sterling (1959) documented a publication bias toward statistically significant findings in psychology journals. Since then, reviews have consistently shown that significant and hypothesis-consistent results are more likely to be published. But where exactly does this bias enter the research pipeline? Greenwald (1975) identified four choice points: hypothesis formulation, data collection, results evaluation, and editorial judgment.

Previous experimental studies produced mixed evidence: some found preferences for positive results, others did not. Critically, all used **between-subjects** designs with a single stimulus, limiting generalizability. The one exception, Chopra et al. (2022), used a within-subjects design in economics and found a significant null result penalty.

We address three gaps:

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">A. Within-subjects experiments on publication bias</h4>
    <p>Within-subjects designs to isolate the effect of statistical significance and hypothesis-consistency.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">B. Beyond submission: reading and citing</h4>
    <p>Experimental research on non-reception, i.e. how researchers select what to read and cite.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">C. Decision-making processes</h4>
    <p>The role of intuition vs. deliberation, drawing on Dual Process Theory.</p>
  </div>
</div>

<div class="figure-container">
  <img src="/assets/img/blog/publication_bias_decision_making/figure1.png" alt="Hypothesized relationships between variables" data-zoomable>
  <span class="figure-caption">Hypothesized relationships. Left: Direct effect of the treatment (statistical significance or hypothesis-consistency) on intuitive responses (LoSRC = Likelihood of Submission, Reading or Citing). Right: Mediation model where Feeling of Rightness (FOR) mediates the effect of treatment on response change between intuitive and considered evaluations (C-LoSRC).</span>
</div>

## Method

### Experimental design and two-response paradigm

We conducted **four online experiments** with clinical psychology researchers (*n* = 303 total, ~75 per experiment). In each experiment, participants evaluated **16 fictitious abstracts** (from 16 pairs) using a two-response paradigm:

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">Stage 1 · Intuitive</h4>
    <p>Fast, gut-feeling evaluation of the abstract.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Feeling of Rightness</h4>
    <p>How confident participants felt about the initial response.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Stage 2 · Considered</h4>
    <p>Deliberate re-evaluation with unlimited time.</p>
  </div>
</div>

Experiments 1 and 2 assessed **publishability** (statistical significance and hypothesis-consistency, respectively). Experiments 3 and 4 assessed **reading and citation likelihood**.

<div class="figure-container">
  <img src="/assets/img/blog/publication_bias_decision_making/figure2.png" alt="Experimental procedure" data-zoomable>
  <span class="figure-caption">Experimental procedure for all four experiments. Participants read instructions, evaluated 16 abstracts using the two-response paradigm, and completed sociodemographic and professional questionnaires.</span>
</div>

### Participants and materials

We contacted 33,924 clinical psychology researchers globally; 303 completed the study (1.0% completion rate). Participants were 58% female, 40% male; 27% pre-doctoral, 29% post-doctoral, and 44% professors, from 40+ countries.

The 64 abstract pairs were carefully constructed to be identical except for the experimentally varied result section (significant vs. non-significant, or hypothesis-consistent vs. hypothesis-inconsistent). Participants were explicitly told to assume all studies had sufficient statistical power.

## Results

### Statistical significance reduces publishability, readability, and citability

Across all experiments involving statistical significance, non-significant abstracts were consistently rated lower:

<div class="project-grid cols-3">
  <div class="project-card">
    <h4 class="highlight-text">Publishability (Exp. 1)</h4>
    <p><em>b</em> = -6.49, <em>p</em> &lt; .001.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Reading likelihood (Exp. 3)</h4>
    <p><em>b</em> = -7.14, <em>p</em> &lt; .001.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Citation likelihood (Exp. 3)</h4>
    <p><em>b</em> = -6.32, <em>p</em> &lt; .001.</p>
  </div>
</div>

<div class="figure-container">
  <img src="/assets/img/blog/publication_bias_decision_making/figure4.png" alt="Main results across experiments" data-zoomable>
  <span class="figure-caption">Treatment effects across all four experiments. Statistical significance consistently reduces the likelihood of submission, reading, and citation. Hypothesis-consistency shows no significant effect in any experiment.</span>
</div>

### Hypothesis-consistency has no effect

Whether an abstract's results were consistent or inconsistent with its hypothesis had **no detectable effect** on any outcome:

<div class="project-grid cols-3">
  <div class="project-card">
    <h4 class="highlight-text">Publishability (Exp. 2)</h4>
    <p><em>b</em> = -1.21, <em>p</em> = .303.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Reading (Exp. 4)</h4>
    <p><em>b</em> = -1.29, <em>p</em> = .281.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Citation (Exp. 4)</h4>
    <p><em>b</em> = -1.44, <em>p</em> = .222.</p>
  </div>
</div>

### Deliberation and Feeling of Rightness

In most experiments, initial intuitive evaluations were **not revised** after deliberation. FOR did not systematically mediate response changes. One exception: in Experiment 1, non-significant abstracts lowered FOR (*b* = -0.16, *p* = .006), but higher FOR unexpectedly predicted _more_ positive revision, contrary to our hypothesis.

## Discussion

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">For metascience</h4>
    <p>Our within-subjects design provides experimental evidence that statistical significance, but not hypothesis-consistency, is associated with researchers' evaluations of abstracts for publication, reading, and citation. Effect sizes were small (1–2% of variance), but the pattern was consistent across four experiments.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">For decision-making research</h4>
    <p>The two-response paradigm revealed that deliberation does not attenuate the significance bias. The preference for significant results operates as a persistent heuristic rather than a correctable first impression.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">For clinical psychology</h4>
    <p>If non-significant findings are less likely to be read and cited, this could affect the composition of the evidence base that informs treatment evaluation.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Limitations</h4>
    <p>This is a controlled vignette study; how strongly these patterns translate into real-world publication outcomes with actual manuscripts and real incentives remains to be tested in field experiments.</p>
  </div>
</div>

## Citation

If you find this work useful for your research, please consider citing our paper:

```bibtex
@article{schiekiera2025publication,
  title={Publication Bias in Academic Decision Making
         in Clinical Psychology},
  author={Schiekiera, Louis and Eichel, Kristina and Sachse,
          Jacqueline and M{\"u}ller, Sophie P. and He{\ss}elmann,
          Felicitas and Niemeyer, Helen},
  journal={Advances in Methods and Practices in Psychological Science},
  year={2025}
}
```
