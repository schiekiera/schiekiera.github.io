---
layout: post
title: "Classifying Positive Results in Clinical Psychology Using Natural Language Processing"
date: 2024-10-01
description: "Our paper in the <b>Zeitschrift für Psychologie</b> evaluates SciBERT and random forest for classifying whether clinical psychology abstracts report exclusively positive results. Trained on 1,900+ annotated abstracts, SciBERT reaches 86% accuracy and generalizes to out-of-domain data. Applied to 20,000+ psychotherapy RCT abstracts (1990–2022), the model reveals an inverted-U trend: positive results rose until the early 2010s and then declined."
authors:
  - Louis Schiekiera
  - Helen Niemeyer
  - Jonathan Diederichs
tags: [metascience, nlp, publication-bias, text-classification]
thumbnail: assets/img/publication_preview/attention.png
publication_type: "Journal Article"
paper_url: "https://doi.org/10.1027/2151-2604/a000563"
code_url: "https://github.com/schiekiera/NegativeResultDetector"
preregistration_url: "https://osf.io/tzsqy"
giscus_comments: false
related_posts: false
---

## Motivation

High rates of positive results are observed throughout the sciences. In psychology, rates between 84–97% have been reported, with clinical psychology and psychiatry reaching up to 100%. Given the typically small effect sizes and sample sizes in psychological research, these rates cannot be fully explained by high statistical power, suggesting the influence of publication bias or questionable research practices.

Understanding trends in positive results matters for clinical psychology in particular: biased evidence on treatment efficacy can misinform clinical decisions, and mental health treatment costs represent a substantial share of health-economic expenditures.

Previous attempts to track positive results over time relied on either **manual classification** (accurate but resource-intensive) or **rule-based algorithms** that search for predefined _n_-grams like "significant difference" or _p_ < .05. However, rule-based methods capture only a narrow set of expressions and ignore linguistic context entirely. As Ioannidis put it: _"No fancy informatics script can sort out that mess. One still needs to read the papers."_

We asked: **Can modern NLP models learn to classify positive results from annotated abstracts, and what do they reveal about trends in clinical psychology?**

## Method

### Annotation strategy

We annotated 1,978 English-language abstracts from clinical psychology researchers affiliated with German universities (2013–2022). Each abstract was classified into two categories:

- **Positive Results Only (PRO)**: All reported results support the tested hypotheses.
- **Mixed or Negative Results (MNR)**: At least one reported result is null, negative, or hypothesis-inconsistent.

Interrater reliability was solid (*κ* = .768, 88% agreement on a subset of 198 independently double-coded abstracts).

### Supervised learning pipelines

We evaluated two supervised models against three benchmarks.

<div class="project-grid cols-2">
  <div class="project-card">
    <h4 class="highlight-text">SciBERT</h4>
    <p>A BERT variant pretrained on 1.14M scientific papers (3.1B tokens). It leverages the Transformer self-attention mechanism to interpret words in their full linguistic context. We fine-tuned SciBERT on our annotated abstracts using a grid search over learning rates and batch sizes.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Random Forest</h4>
    <p>Operates on bag-of-words features: text is lowercased, lemmatized, tokenized via <code>CountVectorizer</code>, and classified with a <code>RandomForestClassifier</code>.</p>
  </div>
</div>

<div class="figure-container">
  <img src="/assets/img/blog/classifying_positive_results/Flowchart_SciBERT_and_RF.png" alt="Flowchart of SciBERT and Random Forest pipelines" data-zoomable>
  <span class="figure-caption">Flowchart of the SciBERT and Random Forest classification pipelines. SciBERT uses a pretrained transformer fine-tuned on annotated abstracts; Random Forest uses bag-of-words features with hyperparameter optimization via cross-validation.</span>
</div>

### Benchmarks

We compared against three rule-based approaches:

1. **_p_-value algorithm**: Classifies based on extracted _p_-values (_p_ < .05 vs. _p_ > .05).
2. **Natural language indicator (NLI) algorithm**: Classifies based on predefined _n_-grams like "significant difference" or "no significant difference".
3. **Naive abstract length**: A logistic regression using only word count as predictor.

<div class="figure-container">
  <img src="/assets/img/blog/classifying_positive_results/Rule_based_Classification_Flowchart.png" alt="Rule-based classification flowcharts" data-zoomable>
  <span class="figure-caption">Algorithms for rule-based classification based on <i>p</i>-values and natural language indicators. When no relevant <i>n</i>-grams are detected, the algorithm falls back to the base rate in the training data.</span>
</div>

## Results

### SciBERT outperforms all benchmarks

SciBERT achieved the highest accuracy across all evaluation sets: **86% on in-domain data** and 85–88% on two out-of-domain validation sets (psychotherapy RCTs from non-German authors and from 1990–2012). Random Forest showed solid but lower performance (80–83%). The rule-based benchmarks performed near chance (47–57%).

<div class="figure-container">
  <img src="/assets/img/blog/classifying_positive_results/barplot_results_models.png" alt="Model performance comparison" data-zoomable>
  <span class="figure-caption">Accuracy scores across in-domain (MAIN test) and out-of-domain (VAL1, VAL2) data. SciBERT (blue) consistently outperforms Random Forest and all rule-based benchmarks.</span>
</div>

Why do rule-based approaches fail? Only **9% of abstracts** in our data mentioned _p_-values and only **14%** contained predefined NLIs, leaving 79% of abstracts where rule-based classifiers must resort to random guessing. SciBERT, by contrast, learns from the full vocabulary and linguistic context of the abstract.

The fine-tuned SciBERT model was deployed publicly as the [NegativeResultDetector](https://huggingface.co/ClinicalMetaScience/NegativeResultDetector) on HuggingFace.

### Trends in positive results (1990–2022)

We applied SciBERT to predict result types for **20,212 unannotated psychotherapy RCT abstracts** spanning 1990–2022:

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">1990–2005</h4>
    <p>No significant linear increase in positive results (<em>b</em> = 9.70 × 10⁻³, <em>p</em> = .191).</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">2005–2022</h4>
    <p>A significant linear <em>decrease</em> in positive results (<em>b</em> = -6.96 × 10⁻³, <em>p</em> = .034).</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Full span (1990–2022)</h4>
    <p>Significant positive linear and negative quadratic effects, an inverted-U shape. Positive results rose from the early 1990s, peaked around the early 2010s, and then declined.</p>
  </div>
</div>

<div class="figure-container">
  <img src="/assets/img/blog/classifying_positive_results/inference_longitudinal_comparison_ZfP.png" alt="Longitudinal comparison of SciBERT predictions and rule-based approaches" data-zoomable>
  <span class="figure-caption">Predicted proportions of positive results in psychotherapy RCTs (1990–2022). The SciBERT model (M3b, inverted-U) is compared with rule-based trend lines for <i>p</i> < .05, <i>p</i> > .05, and natural language indicators. Dots represent observed yearly proportions (<i>n</i> = 20,212).</span>
</div>

A breakpoint analysis placed the inflection point around **2011** rather than the hypothesized 2005, suggesting a _time-lag effect_: research culture shifts take years to manifest in the published literature.

## Discussion

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">For metascience</h4>
    <p>Machine learning, especially transformer-based models like SciBERT, can substantially advance the automation of research synthesis tasks. Where rule-based methods fail because of the heterogeneity of result reporting, supervised NLP models learn from the full linguistic context. This opens the door to large-scale, systematic monitoring of positive results across disciplines.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">For clinical psychology</h4>
    <p>The decline in exclusively positive results since the early 2010s may coincide with the adoption of open science practices such as registered reports and preregistration, though it could also stem from changes in statistical power, effect sizes, or reporting norms.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Limitations</h4>
    <p>We classified abstracts (not full texts) into a binary scheme, a simplification that may obscure nuances. Larger language models with longer context windows could enable more fine-grained annotation strategies in the future. Furthermore, high rates of positive results do not necessarily imply publication bias; they could also reflect high statistical power or true effects.</p>
  </div>
</div>

<div class="insight-box">
  <strong>Deployment.</strong> The fine-tuned SciBERT model is publicly available as the <a href="https://huggingface.co/ClinicalMetaScience/NegativeResultDetector">NegativeResultDetector</a> on HuggingFace for researchers to classify their own data.
</div>

## Citation

If you find this work useful for your research, please consider citing our paper:

```bibtex
@article{schiekiera2024classifying,
  title={Classifying Positive Results in Clinical Psychology
         Using Natural Language Processing},
  author={Schiekiera, Louis and Diederichs, Jonathan
          and Niemeyer, Helen},
  journal={Zeitschrift f{\"u}r Psychologie},
  year={2024},
  doi={10.1027/2151-2604/a000563}
}
```
