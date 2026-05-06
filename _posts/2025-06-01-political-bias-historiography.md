---
layout: post
title: "Is Partisan Bias Present in Historical Research?"
date: 2025-06-01
description: "Our preprint in <b>F1000Research</b> investigates whether historians prefer contemporary history abstracts that align with their political orientation. In an online experiment, 75 historians evaluated 17 fictitious abstract pairs varying in political stance. We find a significant interaction: left-leaning historians prefer progressive abstracts, right-leaning historians prefer conservative ones, and moderate historians show no preference. Deliberation does not diminish this bias."
tags: [metascience, political-bias, historiography, decision-making]
thumbnail: /assets/img/blog/political_bias/Figure_4_ILoS_Main_Results.png
publication_type: "Journal Article"
paper_url: "https://doi.org/10.12688/f1000research.157553.1"
preregistration_url: "https://doi.org/10.17605/OSF.IO/QCDV8"
code_url: "https://github.com/schiekiera/metascience_experiment_history"
giscus_comments: false
related_posts: false
---

## Motivation

In quantitative research, publication bias (the selective publication of studies based on factors other than research quality) is well documented. But what about disciplines where results are not framed in terms of statistical significance? In historiography, scholars have long discussed how cultural, social, and political backgrounds shape the selection of topics, methods, and interpretations. Yet experimental evidence on how political orientation influences historians' publication decisions has been virtually absent.

A classic survey by Kimball found strong correlations between historians' ideological standpoints and their explanations of historical events. The only experimental study in this space, by Abramowitz and colleagues in psychology, showed that reviewers' political orientation influenced their publication decisions, but it used only a single manuscript. We extend this work to historiography with a **within-subjects design** and **17 stimulus pairs**, allowing us to isolate the effect of political stance while controlling for abstract-specific characteristics.

## Method

### Experimental design

We recruited 75 historians globally (from 7,063 contacted) to evaluate **17 fictitious contemporary history abstracts** in an online experiment. Each abstract existed in two versions, progressive and conservative, that were identical except for the political framing. Each participant saw one version of each pair (9 progressive, 8 conservative), presented in randomized order.

<div class="figure-container">
  <img src="/assets/img/blog/political_bias/Figure_1_Flowchart_Procedure.png" alt="Experimental procedure flowchart" data-zoomable>
  <span class="figure-caption">Experimental procedure. Participants read instructions, then evaluated 17 abstracts using a two-response paradigm (intuitive response, Feeling of Rightness rating, considered response), followed by questionnaires on political orientation and demographics.</span>
</div>

### Two-response paradigm

Drawing on Dual Process Theory, we used a **two-response procedure**: participants first gave a fast, intuitive rating of publishability (Type 1 processing), then rated their Feeling of Rightness (FOR), and finally provided a considered re-evaluation (Type 2 processing). This allowed us to test whether deliberation attenuates political preferences.

Political orientation was measured on a 7-point left-right scale. Our sample was 75% left-leaning, 13% moderate, and 12% right-leaning, consistent with distributions found in other academic disciplines.

## Results

### Political stance shapes publishability judgments

We found a **significant interaction** between an abstract's political stance and a historian's political orientation (*b* = 1.82, *p* < .001).

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">Right-leaning historians</h4>
    <p>Rated conservative abstracts higher (ILoS = 65.6) than progressive ones (57.2).</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Left-leaning historians</h4>
    <p>Rated conservative abstracts lower (52.1) than progressive ones (57.5).</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Moderate historians</h4>
    <p>Showed no preference.</p>
  </div>
</div>

Overall, progressive abstracts were rated 3.07% more favorably, reflecting the predominantly left-leaning composition of our sample.

<div class="figure-container">
  <img src="/assets/img/blog/political_bias/Figure_4_ILoS_Main_Results.png" alt="ILoS results by political orientation" data-zoomable>
  <span class="figure-caption">Intuitive Likelihood of Submitting for publication (ILoS) as a function of political orientation and abstract political stance. Right-leaning historians prefer conservative abstracts; left-leaning historians prefer progressive ones; moderates show no preference.</span>
</div>

<div class="figure-container">
  <img src="/assets/img/blog/political_bias/Figure_2_Descriptive_Responses_Combined.png" alt="Descriptive response distributions" data-zoomable>
  <span class="figure-caption">Distributions of reading times, response variables, and Feeling of Rightness ratings across all trials.</span>
</div>

### Deliberation does not reduce bias

Contrary to our expectation, the Type 2 (considered) responses did not significantly differ from the Type 1 (intuitive) responses. The interaction of political stance and political orientation on response change (ΔLoS) was not significant (*b* = 0.11, *p* = .547). Even when given time to reflect, historians did not revise their politically influenced judgments.

Feeling of Rightness was likewise unaffected by political congruence (*b* = 0.02, *p* = .334), suggesting that political preferences in this context do not trigger the metacognitive conflict that typically prompts re-evaluation in logical reasoning tasks.

<div class="figure-container">
  <img src="/assets/img/blog/political_bias/Figure_3_Descriptive_Responses_Political_Scale.png" alt="Political orientation distribution" data-zoomable>
  <span class="figure-caption">Distribution of participants' self-reported political orientation on a 7-point left-right scale.</span>
</div>

## Discussion and implications

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">For metascience</h4>
    <p>Our findings indicate that political preferences are associated with publication decisions in historiography, a domain where such biases are discussed theoretically but have rarely been tested experimentally. Deliberation did not attenuate this effect in our data.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">For historiography</h4>
    <p>If publishability ratings depend partly on political preferences, this could affect which perspectives are more or less likely to be submitted for publication. This parallels the file drawer problem in quantitative science but operates through political rather than statistical dimensions.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Broader relevance</h4>
    <p>Our study can be viewed as a case study focused on historians; such political preferences are likely relevant in other academic disciplines and should be investigated further.</p>
  </div>
</div>

## Citation

If you find this work useful for your research, please consider citing our paper:

```bibtex
@article{schiekiera2025political,
  author  = {Schiekiera, Louis and Niemeyer, Helen},
  title   = {Political bias in historiography: an experimental
             investigation of preferences for publication as a function
             of political orientation},
  journal = {F1000Research},
  year    = {2025},
  volume  = {14},
  pages   = {320},
  doi     = {10.12688/f1000research.160170.1}
}
```
