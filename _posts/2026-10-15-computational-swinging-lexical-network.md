---
layout: post
title: "A Computational Swinging Lexical Network"
date: 2026-10-15
description: "We implement the <b>Swinging Lexical Network</b> model of word production computationally, letting activation spread through a 30,000-word distributional semantic network. Across 392,156 picture-word interference trials from 86 English and German experiments, one semantic predictor holds in both languages: naming slows when a few co-activated words stand out as strong competitors, and speeds up when activation is spread thinly across many."
authors:
  - Louis Schiekiera
  - Rasha Abdel Rahman
  - Alissa Melinger
  - Vincent Gruber
  - Fritz Günther
tags: [psycholinguistics, language-production, spreading-activation, distributional-semantics]
thumbnail: /assets/img/blog/csln/cohort_concentration.png
publication_type: "Preprint (PsyArXiv)"
paper_url: "https://osf.io/preprints/psyarxiv/whu3d_v1"
data_url: "https://doi.org/10.17605/OSF.IO/G6S87"
giscus_comments: false
related_posts: false
---

## Motivation

In picture-word interference (PWI), speakers name a picture (a dog) while ignoring a distractor word (_CAT_). Related distractors usually slow naming down. The **Swinging Lexical Network (SLN)** model explains this through the _lexical cohort_ that target and distractor jointly activate (for dog-CAT, words like _mouse_, _horse_ or _pet_): priming within the cohort speeds naming up, competition within it slows naming down.

As a verbal theory, the SLN leaves one question open: **what counts as a competitor?** Any co-activated word, or only words whose activation stands out from the rest? Building the model computationally forced us to be explicit in our modelling choices.

## The model

We let activation spread through a 30,000-word fastText network (separately for English and German), starting from the target and the distractor. From this process we derive two measures:

<div class="project-grid cols-2">
  <div class="project-card">
    <h4 class="highlight-text">Cohort concentration</h4>
    <p>The entropy of the joint activation after one spreading step. Low entropy: a few words absorb most of the activation. High entropy: activation is spread thinly over many words.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">The swing</h4>
    <p>How much the activation pattern still changes over later spreading steps, measured as the KL divergence from the network's stationary distribution.</p>
  </div>
</div>

<div class="figure-container">
  <img src="/assets/img/blog/csln/cohort_concentration.png" alt="High-entropy and low-entropy cohorts" data-zoomable>
  <span class="figure-caption">Cohort concentration. The target and distractor rows of the one-step transition matrix are averaged over their neighbors, giving the joint-activation distribution. Its entropy is high when activation is spread evenly (left) and low when a few neighbors dominate (right).</span>
</div>

We tested these measures in a chain of six mixed-effects models, each adding one semantic construct (cosine similarity, neighborhood density, directional activation, cohort concentration, swing), on the [harmonized PWI dataset](/blog/2026/pwi-dataset/): 392,156 trials from 86 experiments.

## Results

**Cohort concentration was the only semantic predictor with a reliable effect in both languages.** Naming was _slower_ when the cohort was concentrated and _faster_ when activation was diffuse. 

This decides the open question in favor of an **effective-competitor** reading. Total activation is fixed, so a flat distribution means that no word stands out: it marks the absence of competition, not a maximal cohort. Competitors are the words whose activation rises above that background.

<div class="figure-container">
  <img src="/assets/img/blog/csln/competitor_interpretations.png" alt="Effective- and nominal-competitor interpretations of cohort entropy" data-zoomable>
  <span class="figure-caption">Two readings of cohort entropy. Under the effective-competitor interpretation (middle), only neighbors with activation above the near-uniform background compete, so a flat profile yields almost no competition. Under the nominal-competitor interpretation (bottom), every co-activated neighbor counts. The data support the effective-competitor reading.</span>
</div>

The remaining predictors did less:

- **Cosine similarity** had no stable population effect once cohort concentration entered the model.
- **Neighborhood density** of the target or distractor alone had no stable effect either: in PWI, what matters seems to be the cohort of the pair, not each word separately.
- **The swing** improved fit, but could not be separated from cohort concentration (within-experiment r = −0.84 in English, −0.97 in German). Spreading converges on the same network-wide state for every word pair, so later steps mostly re-express the first-step cohort.

## Takeaway

In the SLN, semantic interference depends on how co-activation is _distributed_ across the cohort, and a competitor is a word that stands out, not every word that receives some activation. You can step through the spreading dynamics yourself in the [interactive visualization](/csln_visualization/). All code, fitted models and derived data are on [OSF](https://doi.org/10.17605/OSF.IO/G6S87).

## Citation

```bibtex
@misc{schiekiera2026csln,
  title        = {A Computational Swinging Lexical Network: Cohort Concentration
                  Predicts Semantic Interference in a Large-Scale
                  Picture--Word Interference Dataset},
  author       = {Schiekiera, Louis and Abdel Rahman, Rasha and Melinger, Alissa
                  and Gruber, Vincent and G{\"u}nther, Fritz},
  year         = {2026},
  howpublished = {Preprint, PsyArXiv},
  doi          = {10.31234/osf.io/whu3d_v1},
  url          = {https://osf.io/preprints/psyarxiv/whu3d_v1}
}
```
