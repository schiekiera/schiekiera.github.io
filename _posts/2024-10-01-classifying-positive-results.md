---
layout: distill
title: "Classifying Positive Results in Clinical Psychology Using Natural Language Processing"
date: 2024-10-01
description: "Our paper in the <b>Zeitschrift für Psychologie</b> evaluates SciBERT and random forest for classifying whether clinical psychology abstracts report exclusively positive results. Trained on 1,900+ annotated abstracts, SciBERT reaches 86% accuracy and generalizes to out-of-domain data. Applied to 20,000+ psychotherapy RCT abstracts (1990–2022), the model reveals an inverted-U trend: positive results rose until the early 2010s and then declined."
tags: [metascience, nlp, publication-bias, text-classification]
thumbnail: /assets/img/blog/classifying_positive_results/Abstract_Classification.png
bibliography: classifying_positive_results.bib
publication_type: "Journal Article"
paper_url: "https://doi.org/10.1027/2151-2604/a000563"
code_url: "https://github.com/schiekiera/NegativeResultDetector"
giscus_comments: false
related_posts: false
toc:
  - name: "Motivation: Why classify positive results?"
  - name: "Method: From annotations to transformers"
    subsections:
      - name: "Annotation strategy"
      - name: "Supervised learning pipelines"
      - name: "Benchmarks"
  - name: "Results"
    subsections:
      - name: "SciBERT outperforms all benchmarks"
      - name: "Trends in positive results (1990–2022)"
  - name: "Discussion and implications"
authors:
  - name: Louis Schiekiera
    affiliations:
      name: Freie Universität Berlin
  - name: Jonathan Diederichs
    affiliations:
      name: Freie Universität Berlin
  - name: Helen Niemeyer
    affiliations:
      name: Freie Universität Berlin
---

**📄 [Read the full paper (Zeitschrift für Psychologie)](https://doi.org/10.1027/2151-2604/a000563)** | **💻 [View code on GitHub](https://github.com/schiekiera/NegativeResultDetector)** | **🤗 [NegativeResultDetector on HuggingFace](https://huggingface.co/ClinicalMetaScience/NegativeResultDetector)**

### Motivation: Why classify positive results?

High rates of positive results are observed throughout the sciences <d-cite key="fanelli2010positive"></d-cite> <d-cite key="Fanelli2011"></d-cite>. In psychology, rates between 84--97% have been reported <d-cite key="Scheel2021"></d-cite> <d-cite key="Sterling1959"></d-cite>, with clinical psychology and psychiatry reaching up to 100% <d-cite key="rossignol2012review"></d-cite>. Given the typically small effect sizes and sample sizes in psychological research, these rates cannot be fully explained by high statistical power---suggesting the influence of publication bias or questionable research practices <d-cite key="Scheel2021"></d-cite>.

Understanding trends in positive results matters for clinical psychology in particular: biased evidence on treatment efficacy can misinform clinical decisions <d-cite key="hopwood2018reproducibility"></d-cite>, and mental health treatment costs represent a substantial share of health-economic expenditures <d-cite key="knapp2020economics"></d-cite>.

Previous attempts to track positive results over time relied on either **manual classification**---accurate but resource-intensive <d-cite key="Fanelli2011"></d-cite>---or **rule-based algorithms** that search for predefined _n_-grams like "significant difference" or _p_ < .05 <d-cite key="pautasso2010worsening"></d-cite> <d-cite key="dewinter2015surge"></d-cite>. However, rule-based methods capture only a narrow set of expressions and ignore linguistic context entirely. As Ioannidis put it: _"No fancy informatics script can sort out that mess. One still needs to read the papers"_ <d-cite key="ioannidis2014discussion"></d-cite>.

We asked: **Can modern NLP models learn to classify positive results from annotated abstracts, and what do they reveal about trends in clinical psychology?**

<figure class="post-figure">
  <img src="/assets/img/blog/classifying_positive_results/Abstract_Classification.png" alt="Conceptual overview of abstract classification" class="zoomable" data-zoomable>
  <figcaption>Conceptual overview. Scientific abstracts are classified as reporting "positive results only" (PRO) or "mixed or negative results" (MNR) using supervised machine learning models trained on human annotations.</figcaption>
</figure>

### Method: From annotations to transformers

#### Annotation strategy

We annotated 1,978 English-language abstracts from clinical psychology researchers affiliated with German universities (2013--2022). Each abstract was classified into two categories:

- **Positive Results Only (PRO)**: All reported results support the tested hypotheses.
- **Mixed or Negative Results (MNR)**: At least one reported result is null, negative, or hypothesis-inconsistent.

Interrater reliability was solid ($\kappa = .768$, 88% agreement on a subset of 198 independently double-coded abstracts).

#### Supervised learning pipelines

We evaluated two supervised models against three benchmarks:

**SciBERT** <d-cite key="beltagy2019SciBERT"></d-cite> is a BERT variant <d-cite key="devlin2018bert"></d-cite> pretrained on 1.14M scientific papers (3.1B tokens). It leverages the Transformer self-attention mechanism <d-cite key="Vaswani2017"></d-cite> to interpret words in their full linguistic context. We fine-tuned SciBERT on our annotated abstracts using a grid search over learning rates and batch sizes.

**Random Forest** <d-cite key="breiman2001random"></d-cite> operates on bag-of-words features: text is lowercased, lemmatized, tokenized via `CountVectorizer`, and classified with a `RandomForestClassifier` <d-cite key="scikit-learn"></d-cite>.

<figure class="post-figure">
  <img src="/assets/img/blog/classifying_positive_results/Flowchart_SciBERT_and_RF.png" alt="Flowchart of SciBERT and Random Forest pipelines" class="zoomable" data-zoomable>
  <figcaption>Flowchart of the SciBERT and Random Forest classification pipelines. SciBERT uses a pretrained transformer fine-tuned on annotated abstracts; Random Forest uses bag-of-words features with hyperparameter optimization via cross-validation.</figcaption>
</figure>

#### Benchmarks

We compared against three rule-based approaches:

1. **_p_-value algorithm**: Classifies based on extracted _p_-values (_p_ < .05 vs. _p_ > .05) following De Winter & Dodou <d-cite key="dewinter2015surge"></d-cite>.
2. **Natural language indicator (NLI) algorithm**: Classifies based on predefined _n_-grams like "significant difference" or "no significant difference" <d-cite key="pautasso2010worsening"></d-cite>.
3. **Naive abstract length**: A logistic regression using only word count as predictor.

<figure class="post-figure">
  <img src="/assets/img/blog/classifying_positive_results/Rule_based_Classification_Flowchart.png" alt="Rule-based classification flowcharts" class="zoomable" data-zoomable>
  <figcaption>Algorithms for rule-based classification based on <i>p</i>-values and natural language indicators. When no relevant <i>n</i>-grams are detected, the algorithm falls back to the base rate in the training data.</figcaption>
</figure>

### Results

#### SciBERT outperforms all benchmarks

SciBERT achieved the highest accuracy across all evaluation sets: **86% on in-domain data** and 85--88% on two out-of-domain validation sets (psychotherapy RCTs from non-German authors and from 1990--2012). Random Forest showed solid but lower performance (80--83%). The rule-based benchmarks performed near chance (47--57%).

<figure class="post-figure">
  <img src="/assets/img/blog/classifying_positive_results/barplot_results_models.png" alt="Model performance comparison" class="zoomable" data-zoomable>
  <figcaption>Accuracy scores across in-domain (MAIN test) and out-of-domain (VAL1, VAL2) data. SciBERT (blue) consistently outperforms Random Forest and all rule-based benchmarks.</figcaption>
</figure>

Why do rule-based approaches fail? Only **9% of abstracts** in our data mentioned _p_-values and only **14%** contained predefined NLIs, leaving 79% of abstracts where rule-based classifiers must resort to random guessing. SciBERT, by contrast, learns from the full vocabulary and linguistic context of the abstract.

The fine-tuned SciBERT model was deployed publicly as the [NegativeResultDetector](https://huggingface.co/ClinicalMetaScience/NegativeResultDetector) on HuggingFace <d-cite key="schiekiera_huggingface"></d-cite>.

#### Trends in positive results (1990–2022)

We applied SciBERT to predict result types for **20,212 unannotated psychotherapy RCT abstracts** spanning 1990--2022. The key findings:

- **1990--2005**: No significant linear increase in positive results ($b = 9.70 \times 10^{-3}$, $p = .191$).
- **2005--2022**: A significant linear _decrease_ in positive results ($b = -6.96 \times 10^{-3}$, $p = .034$).
- **Full span (1990--2022)**: Significant positive linear and negative quadratic effects---an **inverted-U shape**. Positive results rose from the early 1990s, peaked around the early 2010s, and then declined.

<figure class="post-figure">
  <img src="/assets/img/blog/classifying_positive_results/inference_longitudinal_comparison_ZfP.png" alt="Longitudinal comparison of SciBERT predictions and rule-based approaches" class="zoomable" data-zoomable>
  <figcaption>Predicted proportions of positive results in psychotherapy RCTs (1990–2022). The SciBERT model (M3b, inverted-U) is compared with rule-based trend lines for <i>p</i> < .05, <i>p</i> > .05, and natural language indicators. Dots represent observed yearly proportions (<i>n</i> = 20,212).</figcaption>
</figure>

The absence of an increase in the 1990s diverges from Fanelli's cross-disciplinary finding of rising positive results <d-cite key="Fanelli2011"></d-cite>. This may reflect early awareness of publication bias in clinical trials or the relatively strong funding for psychotherapy RCTs during that period. The decline after the early 2010s aligns with the growing influence of the open science movement, catalyzed by landmark publications like Ioannidis <d-cite key="ioannidis2005most"></d-cite> and the Open Science Collaboration's replication study <d-cite key="openscience2015"></d-cite>.

A breakpoint analysis placed the inflection point around **2011** rather than the hypothesized 2005, suggesting a _time-lag effect_---research culture shifts take years to manifest in the published literature.

### Discussion and implications

**For metascience**: Machine learning---especially transformer-based models like SciBERT---can substantially advance the automation of research synthesis tasks <d-cite key="Marshall2019"></d-cite>. Where rule-based methods fail because of the heterogeneity of result reporting, supervised NLP models learn from the full linguistic context. This opens the door to large-scale, systematic monitoring of positive results across disciplines.

**For clinical psychology**: The inverted-U trend we observe is cautiously encouraging. The decline in exclusively positive results since the early 2010s may reflect the adoption of open science practices such as registered reports and preregistration <d-cite key="Scheel2021"></d-cite>, though it could also stem from changes in statistical power, effect sizes, or reporting norms. Open science practices appear to be gaining ground even in clinical psychology, where adoption has historically lagged behind other subdisciplines <d-cite key="tackett2019"></d-cite>.

**Limitations**: We classified abstracts (not full texts) into a binary scheme---a simplification that may obscure nuances. Larger language models with longer context windows could enable more fine-grained annotation strategies in the future. Furthermore, high rates of positive results do not necessarily imply publication bias; they could also reflect high statistical power or true effects.

**Deployment**: The fine-tuned SciBERT model is publicly available as the [NegativeResultDetector](https://huggingface.co/ClinicalMetaScience/NegativeResultDetector) <d-cite key="schiekiera_huggingface"></d-cite> for researchers to classify their own data. Code for training, evaluation, and inference is on [GitHub](https://github.com/schiekiera/NegativeResultDetector) <d-cite key="schiekiera_github"></d-cite>.

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
