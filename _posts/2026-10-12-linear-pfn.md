---
layout: post
title: "LinearPFN: Amortized Variable Selection for Linear Models with Interactions"
date: 2026-10-12
description: "We present <b>LinearPFN</b>, a transformer pretrained once on synthetic data from an explicit spike-and-slab prior. A single forward pass over a new dataset returns posterior inclusion probabilities, posterior-mean coefficients and posterior predictive distributions for every main effect and pairwise interaction, with no per-dataset fitting. Its outputs match the exact posterior wherever that posterior can be enumerated, and on real social-science predictor matrices it selects better than five classical baselines."
authors:
  - Louis Schiekiera
  - Max Zimmer
  - Christophe Roux
  - Manuel Arnold
  - Sebastian Pokutta
  - Fritz Günther
tags: [variable-selection, bayesian-inference, prior-data-fitted-networks, interactions]
thumbnail: /assets/img/blog/linear_pfn/visual_abstract.png
publication_type: "Preprint (arXiv)"
paper_url: "https://arxiv.org/abs/2610.06580"
code_url: "https://github.com/schiekiera/LinearPFN"
data_url: "https://huggingface.co/schiekiera/LinearPFN"
giscus_comments: false
related_posts: false
---

## Motivation

Linear models are still the standard way to state quantitative claims in the social sciences: every coefficient is interpretable, and each one can be tested against the theory that motivated it. Researchers often extend them with pairwise interactions, which say that the effect of one predictor depends on the level of another. But fitting such a model requires a decision about which predictors and which interactions to include.

Spike-and-slab regression is the standard Bayesian answer. Each coefficient is either exactly zero (the spike) or drawn from a Gaussian (the slab), and the posterior is a distribution over which effects are active. Every candidate effect then carries a **posterior inclusion probability (PIP)**. The problem is cost: with $$p$$ predictors there are $$1 + p + \binom{p}{2}$$ candidate effects, and the number of possible models grows exponentially. At $$p = 10$$ there are already $$2^{55} \approx 3.6 \times 10^{16}$$ models. Beyond a handful of predictors, the posterior has to be approximated, typically by MCMC over the model space, which needs a fresh run for every dataset and may not converge within a fixed budget.

**LinearPFN** takes a different route. It is a prior-data fitted network (PFN): a transformer trained once on millions of synthetic datasets drawn from an explicit spike-and-slab prior, so that afterwards a single forward pass over a new dataset approximates the posterior under that prior.

<div class="figure-container">
  <img src="/assets/img/blog/linear_pfn/visual_abstract.png" alt="Pretraining and prediction of LinearPFN" data-zoomable>
  <span class="figure-caption">Pretraining and prediction of LinearPFN. Top: each prior draw fixes an active set and spike-or-slab coefficients for one synthetic dataset, and the loss compares the network's output with them. Bottom: in every layer, each cell first attends to the other cells in its row and then to the other cells in its column, and an MLP then updates each cell on its own. One forward pass over a new dataset returns inclusion probabilities and posterior-mean coefficients for every main effect and interaction, and a posterior predictive distribution for each query row.</span>
</div>

## Contributions

<div class="project-grid cols-2">
  <div class="project-card">
    <h4 class="highlight-text">A PFN for Bayesian variable selection</h4>
    <p>To our knowledge, LinearPFN is the first PFN that returns inclusion probabilities over a regression model space, covering main effects and pairwise interactions.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Validation against the exact posterior</h4>
    <p>The prior is conjugate by design, so the exact posterior can be enumerated for small problems, and every output of the network is scored against it on six criteria fixed before training.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">A prior calibrated to social-science data</h4>
    <p>Predictor matrices mimic individual-level data (Likert, binary, count and skewed scales, latent factors), and effect sizes match meta-analytic norms for published correlations in psychology.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Benchmark evaluation</h4>
    <p>10,000 datasets built on 383 real predictor matrices from social-science packages in <em>Rdatasets</em>, compared against five baselines, plus three variants that each break one assumption of the outcome model.</p>
  </div>
</div>

## The prior

LinearPFN learns whatever its training prior contains, so the prior is the central design decision. Each synthetic dataset has between 20 and 2,000 rows and between 2 and 30 predictors, and is drawn in three steps.

### Predictor prior

The predictor matrix is built to resemble the tables social scientists actually analyze. A share of the columns loads on latent factors, standing in for the multi-item scales through which constructs like IQ or social capital are measured, and the remaining columns are correlated manifest variables. After shuffling the column order, a Gaussian copula maps each column to a Gaussian, Likert, binary, count or skewed marginal.

<div class="figure-container">
  <img src="/assets/img/blog/linear_pfn/predictor_prior.png" alt="Predictor prior" data-zoomable>
  <span class="figure-caption">Predictor prior. Left: the generic block is generated jointly from a random correlation matrix, and the factor block loads on latent factors. Middle: the two blocks are merged and the column order is shuffled. Right: a Gaussian copula maps each column to its marginal, either unchanged (Gaussian) or transformed to a Likert, binary, count or skewed family.</span>
</div>

### Active-effects and effect-size priors

Every dataset follows **strong heredity**: an interaction can only be active when both of its parent main effects are. Active sets are drawn from a 50/50 mixture of a _count prior_ (draw how many effects are active, then pick them) and a _rate prior_ (draw an inclusion rate, then include each candidate with that probability). The slab scale is drawn per dataset and calibrated so that the standardized effect of an active main effect has prior quartiles of 0.078, 0.169 and 0.294, close to the meta-analytic norms of 0.11, 0.19 and 0.29 for correlations in psychology. Interactions get half the slab variance of main effects.

<div class="figure-container">
  <img src="/assets/img/blog/linear_pfn/active_outcome.png" alt="Active-effects and effect-size priors" data-zoomable>
  <span class="figure-caption">Active-effects prior (top): the active main effects and interactions are drawn under either the count prior or the rate prior, respecting strong heredity. Effect-size prior (bottom): the noise variance and slab scale are drawn per dataset, active coefficients come from the slab, inactive ones are exactly zero, and the outcome follows the linear model with Gaussian noise.</span>
</div>

## Architecture

LinearPFN is built on nanoTabPFN, a lightweight implementation of TabPFN. Each cell of the table becomes a token, and 8 transformer blocks alternate attention across features (within a row) and attention across rows (within a column). The model has 31.5M parameters and was trained for 37,500 steps on 2.4M synthetic datasets on two H200 GPUs.

Three heads read the final representation in the same forward pass:

<div class="project-grid cols-3">
  <div class="project-card">
    <h4 class="highlight-text">Selection head</h4>
    <p>Returns a PIP for every main effect and interaction, trained with binary cross-entropy against the simulated active sets.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Coefficient head</h4>
    <p>Returns the posterior-mean coefficient of every effect, averaged over models, trained with squared error against the simulated coefficients.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Regression head</h4>
    <p>Returns a posterior predictive distribution for each query row as a bar distribution, as in TabPFN.</p>
  </div>
</div>

One design detail matters for interactions: the table holds $$x_j$$ and $$x_k$$ but not their product, so no cell belongs to the interaction $$x_j x_k$$. Its input is therefore assembled from the two parent columns, combining _mean-then-combine_ summaries (what the network knows about each parent) with _combine-then-mean_ summaries, which multiply cells within each row before averaging and so carry the evidence for the interaction itself.

<div class="figure-container">
  <img src="/assets/img/blog/linear_pfn/heads.png" alt="The three read-out heads" data-zoomable>
  <span class="figure-caption">The three read-out heads. Path A averages each predictor column over the context rows. Paths B and C multiply the cells of two predictor columns within each row (in C also with the outcome cell) and then average. Path D is the outcome cell of a query row, not pooled. The selection and coefficient heads each use a main MLP and a pair MLP; the regression head maps each query row to a bar distribution.</span>
</div>

Following the median probability model, LinearPFN selects every effect whose PIP exceeds one half.

## Results

### Fidelity to the exact posterior

With up to 5 predictors there are at most 1,450 models, few enough to compute the exact posterior by enumeration. On held-out prior draws, LinearPFN meets all six validation criteria fixed before training: its AUC of the PIPs is within 0.003 of the exact posterior, and its posterior-mean coefficients correlate with the exact ones at r = 0.993. On real tables with their actual outcomes, where no ground truth exists, its PIPs correlate with those of an MCMC sampler targeting the same posterior at r = 0.972, and the two select identical models on 5 of 7 tables.

### Real predictor matrices, outcomes from the prior

The main benchmark combines real predictor matrices with outcomes drawn from the prior, so the true active set is known. Datasets are stratified over a grid of density and R² so that sparse and dense active sets, and weak and strong signal, are represented equally.

| Method        | AUC/ds   | F1/ds    | Coef. RMSE | Fit (s, 1 CPU thread) |
| ------------- | -------- | -------- | ---------- | --------------------- |
| **LinearPFN** | **0.96** | **0.77** | 0.041      | 7.40                  |
| hierNet       | 0.92     | 0.53     | 0.042      | 25.45                 |
| glinternet    | 0.79     | 0.57     | 0.044      | 4.39                  |
| SuSiE         | 0.85     | 0.66     | 0.051      | 0.16                  |
| lasso         | 0.82     | 0.48     | 0.049      | 0.14                  |
| stability     | 0.82     | 0.55     | 0.068      | 0.36                  |

LinearPFN is ahead in selection in every slice of the data. Against SuSiE, the closest baseline, the paired F1 difference per dataset is +0.118 (95% bootstrap interval [+0.114, +0.122]). The lasso, glinternet and hierNet tend to select many inactive effects, while SuSiE and stability selection miss more active ones. In coefficient error, LinearPFN matches the best baseline (hierNet) rather than beating it.

<div class="figure-container">
  <img src="/assets/img/blog/linear_pfn/ip_sweeps_three.png" alt="Benchmark results sliced by predictors, rows, density and signal" data-zoomable>
  <span class="figure-caption">Benchmark on 383 real predictor matrices, 10,000 datasets with outcomes drawn from the prior. Left: selection, F1 per dataset at each method's own selection rule. Middle: ranking, AUC per dataset. Right: estimation, coefficient RMSE over every candidate effect. Each panel slices the same datasets by the number of predictors, the number of rows, the density and the R².</span>
</div>

### Outcomes outside the prior

We then broke one assumption of the outcome model at a time: **fixed-magnitude coefficients** instead of Gaussian ones, **many large interactions** instead of few small ones, and **heavy-tailed noise** (Student-t with 3 degrees of freedom). LinearPFN keeps the highest AUC and F1 in every variant. The one metric where it is not first is coefficient RMSE under many large interactions, where three baselines have a lower error.

### Speed

On a single CPU thread, LinearPFN takes 7.4 seconds at the median, slower than every baseline except hierNet. But its forward pass runs on a GPU, which the reference implementations of the baselines do not support: on one NVIDIA L40 it takes **0.03 seconds**. The MCMC sampler over the same posterior needs 57 seconds per dataset on one CPU thread (about 1,900 times the GPU forward pass) and meets its convergence criteria on 93% of runs.

## Limitations

<div class="project-grid cols-2">
  <div class="project-card">
    <h4 class="highlight-text">Collinear predictors</h4>
    <p>When two predictors are nearly collinear, posterior mass splits across them and the median probability model may select neither. Unlike SuSiE, LinearPFN reports no credible sets that group such predictors.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">CPU cost</h4>
    <p>Without a GPU, LinearPFN is slow. Pruning, quantization and distillation are established routes to a cheaper forward pass that we did not pursue.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Coefficient accuracy</h4>
    <p>LinearPFN leads in selection but only matches the best baseline in coefficient error.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">A single fixed prior</h4>
    <p>The network assumes strong heredity, Gaussian noise, numeric predictors and independent rows. Conditioning the network on the prior's hyperparameters would let users state their own prior without retraining.</p>
  </div>
</div>

## Takeaway

Amortization reduces Bayesian variable selection with interactions to one forward pass. That makes Bayesian model averaging with interactions feasible where it has to be repeated many times. The code, including every experiment and the scripts that produce each number, table and figure, is on <a href="https://github.com/schiekiera/LinearPFN">GitHub</a>, and the trained model is on <a href="https://huggingface.co/schiekiera/LinearPFN">Hugging Face</a>.

## Citation

If you find this work helpful for your research, please consider citing our paper:

```bibtex
@misc{schiekiera2026linearpfnamortizedvariableselection,
  title={LinearPFN: Amortized Variable Selection for Linear Models
         with Interactions},
  author={Schiekiera, Louis and Zimmer, Max and Roux, Christophe
          and Arnold, Manuel and Pokutta, Sebastian
          and G{\"u}nther, Fritz},
  year={2026},
  eprint={2610.06580},
  archivePrefix={arXiv},
  primaryClass={cs.LG},
  url={https://arxiv.org/abs/2610.06580},
}
```
