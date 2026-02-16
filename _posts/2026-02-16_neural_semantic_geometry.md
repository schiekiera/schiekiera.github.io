---
layout: distill
title: "From Associations to Activations: Comparing Behavioral and Hidden-State Semantic Geometry in LLMs"
date: 2026-02-16
description: "Our preprint <b>From Associations to Activations</b> investigates whether an LLM's internal semantic geometry can be recovered from its observable behavior. Across eight instruction-tuned transformers and 17.5M+ trials, we compare behavior-derived similarity structures from forced-choice and free-association paradigms to layerwise hidden-state geometry using representational similarity analysis. We find that forced-choice behavior aligns substantially more with internal representations than free association, and that behavioral similarity predicts unseen hidden-state similarities beyond lexical baselines."
tags: [interpretability, representation-learning, llm-behavior, semantic-geometry]
bibliography: neural_semantic_geometry.bib
publication_type: "Preprint"
paper_url: "https://arxiv.org/abs/2602.00628"
code_url: "https://github.com/schiekiera/llm-association-geometry"
giscus_comments: false
related_posts: false
authors:
  - name: Louis Schiekiera
    affiliations:
      name: Humboldt-Universität zu Berlin & Freie Universität Berlin
  - name: Max Zimmer
    affiliations:
      name: Zuse Institute Berlin & Technische Universität Berlin
  - name: Christophe Roux
    affiliations:
      name: Zuse Institute Berlin & Technische Universität Berlin
  - name: Sebastian Pokutta
    affiliations:
      name: Zuse Institute Berlin & Technische Universität Berlin
  - name: Fritz Günther
    affiliations:
      name: Humboldt-Universität zu Berlin
---

## Motivation: Can behavior reveal internal structure?

In cognitive science, semantic knowledge is treated as a latent structure: we cannot observe a speaker's meaning representation directly, but we can systematically probe it through behavior <d-cite key="de2019small"></d-cite>. Word-association paradigms use exactly this logic---when a participant sees a cue (e.g., *dog*), the associations they produce or select (e.g., *cat*, *leash*, *bark*) are constrained by their underlying semantic organization. When such judgments are aggregated across trials, the resulting response statistics yield a similarity matrix that approximates the geometry of an otherwise unobserved semantic system.

We transfer this measurement logic to large language models. Unlike humans, both behavior *and* internal representations are observable in LLMs. This creates a unique opportunity: we can systematically test how well an LLM's behavioral output reveals its internal semantic geometry. A key open question is not only how model behavior compares to humans, but also what a model's *own* behavior reveals about its *own* internal representations.

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/conceptual.pdf" alt="Conceptual overview of the framework" style="max-width: 100%;" class="zoomable" data-zoomable>
  <div class="figure-caption">Conceptual overview. For a shared vocabulary, we (i) extract layer-wise word representations to form a hidden-state similarity matrix, and (ii) run behavioral association tasks (forced choice / free association) to build a behavioral similarity matrix. Representational similarity analysis (RSA) correlates the pairwise similarities to quantify behavior--activation alignment.</div>
</div>

## Framework: Behavioral paradigms and hidden-state extraction

### Two behavioral paradigms

We use two classic psycholinguistic paradigms---forced choice (FC) and free association (FA)---to collect semantic relations from model behavior over a shared vocabulary of 5,000 high-frequency English nouns <d-cite key="brysbaert2012adding"></d-cite>.

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/both_paradigms.pdf" alt="Forced choice and free association paradigms" style="max-width: 100%;" class="zoomable" data-zoomable>
  <div class="figure-caption">Behavioral paradigms and derived semantic geometries. Left (forced choice): given a cue word and a candidate set, the model selects the most related words. Right (free association): given a cue word alone, the model generates multiple associates. From the resulting cue--response count matrices, we compute similarity matrices by cosine similarity between rows.</div>
</div>

In the **forced-choice** paradigm, each cue word is presented together with 16 candidate words, from which the model must select exactly two words that are most semantically related to the cue. Candidate sets are constructed by a deterministic shuffle of the remaining vocabulary, yielding 313 FC trials per cue. In the **free-association** paradigm, the model is prompted with a single cue word and asked to generate exactly five single-word associates. This is repeated across 126 stochastic runs per cue.

For each paradigm, model outputs are aggregated into a sparse cue--response count matrix $\mathbf{B}$. We reweight counts with positive pointwise mutual information (PPMI) to reduce the influence of globally frequent responses, then compute a cue--cue similarity matrix via cosine similarity between the PPMI-weighted row vectors. In total, we collected over **17.5 million trials** across both paradigms and eight models.

### Hidden-state extraction

For each model and each word, we extract layerwise hidden-state representations under four contextual embedding strategies:

- **Averaged**: The target word embedded in 50 naturally occurring C4 sentences <d-cite key="raffel2020exploring"></d-cite>, with hidden states averaged across contexts <d-cite key="bommasani2020interpreting"></d-cite>.
- **Meaning**: A fixed definition-style prompt (*"What is the meaning of the word {w}?"*).
- **Task (FC)**: The target word embedded in the FC instruction prompt (without candidates).
- **Task (FA)**: The target word embedded in the FA instruction prompt.

Hidden-state similarity matrices are computed as cosine similarity between mean-centered layerwise word vectors <d-cite key="ethayarajh2019contextual"></d-cite>.

### Models and baselines

We evaluate eight instruction-tuned decoder-only transformer models ranging from 7B to 14B parameters (Falcon3, Gemma-2, Llama-3.1, Mistral-7B, Mistral-Nemo, Phi-4, Qwen2.5, and rnj-1). Beyond behavioral embeddings, we compare hidden-state similarities to three baselines: **FastText** (static word vectors) <d-cite key="bojanowski2017enriching"></d-cite>, **BERT** (contextual encoder) <d-cite key="devlin2019bert"></d-cite>, and a **cross-model consensus** geometry aggregating hidden-state similarities across all other models---motivated by recent evidence for a shared semantic subspace across diverse LLMs <d-cite key="huh2024platonic"></d-cite>.

### Evaluation

We use three complementary evaluation methods:

1. **Representational Similarity Analysis (RSA)** <d-cite key="kriegeskorte2008representational"></d-cite> <d-cite key="nili2014toolbox"></d-cite>: For each layer, we vectorize the upper-triangular entries of the hidden-state and reference similarity matrices and compute their Pearson correlation.

2. **Nearest-neighbor overlap** ($\mathrm{NN@}k$): We quantify how well the $k$-nearest-neighbor neighborhoods induced by hidden-state similarity match those of the reference spaces.

3. **Held-out-words ridge regression**: We test whether behavioral similarity predicts unseen hidden-state similarities on held-out words beyond lexical baselines and cross-model consensus.

## Results

### Forced choice aligns substantially more than free association

Across all models and evaluation methods, FC behavior aligns substantially more strongly with hidden-state geometry than FA. Mean FC RSA increases from $r = .346$ under Averaged extraction to $r = .463$ under Task (FC), while FA shows the same pattern at considerably lower magnitude ($r = .140$ to $r = .199$).

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/rsa_nn_grid_1x2.pdf" alt="Summary RSA and nearest-neighbor overlap results" style="max-width: 100%;" class="zoomable" data-zoomable>
  <div class="figure-caption">Summary of RSA and neighborhood-overlap results (means across models). Left: mean RSA Pearson correlation as a function of layer. Right: mean nearest-neighbor overlap as a function of neighborhood size $k$ (log scale). FC behavior (green) aligns substantially more with hidden-state geometry than FA behavior (red), while cross-model consensus (black) provides the strongest reference.</div>
</div>

Task-aligned and meaning-based extraction strategies yield the strongest alignment at earlier, mid-depth layers, whereas averaging over natural contexts shifts alignment peaks to later layers.

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/rsa_line_plot_1x2_grid_fc_fa.pdf" alt="Layerwise RSA for FC and FA under different extraction strategies" style="max-width: 100%;" class="zoomable" data-zoomable>
  <div class="figure-caption">Layerwise RSA for PPMI-weighted forced-choice similarity (left) and free-association similarity (right) under different extraction strategies. Task-aligned prompts yield peak alignment at earlier layers, while averaged contexts shift peaks later.</div>
</div>

The full model-by-model RSA comparison reveals that the FC advantage is consistent across all eight models, though the magnitude varies:

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/rsa_fc_fa_2x4_grid.pdf" alt="RSA heatmap across models" style="max-width: 100%;" class="zoomable" data-zoomable>
  <div class="figure-caption">RSA between model hidden-state similarity and behavior-derived semantic geometries. Each panel corresponds to a model and compares hidden-state similarity to PPMI-weighted forced-choice (left) and free-association (right) behavioral embeddings across extraction strategies and layers.</div>
</div>

### Behavioral similarity predicts unseen hidden-state structure

The held-out-words ridge regression shows that behavioral similarity---especially FC---predicts unseen hidden-state similarities beyond lexical baselines and cross-model consensus. Adding behavioral FC similarity on top of the baseline improves mean test $R^2$ by $+.022$, whereas FA yields a smaller gain ($+.002$). The full model reaches mean $R^2 = .587$ (vs. $.569$ for the baseline). Peak performance reaches $R^2 = .844$ for Llama-3.1-8B-Instruct.

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/rr_model_performance_grid_2x4.pdf" alt="Ridge regression performance across models" style="max-width: 100%;" class="zoomable" data-zoomable>
  <div class="figure-caption">Ridge regression performance for predicting hidden-state similarity from behavioral and lexical features across eight models. Bold values show $R^2$ for the full model (behavioral + baselines); parenthetical values show the baseline without behavioral features.</div>
</div>

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/rr_delta_heatmap.pdf" alt="Incremental behavioral contribution" style="max-width: 100%;" class="zoomable" data-zoomable>
  <div class="figure-caption">Incremental contribution ($\Delta R^2$) of behavioral predictors to ridge regression performance, relative to a baseline with lexical and cross-model features. FC consistently provides the largest behavioral gain across models.</div>
</div>

## Discussion and implications

Our findings show that structured behavior---particularly from constrained measurement paradigms like forced choice---preserves a nontrivial projection of a model's hidden-state similarity geometry, even without access to logits or internal activations. This has implications for both interpretability research and cognitive science:

**For interpretability**: Behavioral probing can serve as a practical tool for understanding internal representations when only black-box access is available. The FC paradigm's controlled candidate sets concentrate observations and produce a less sparse cue--response matrix, yielding higher signal-to-noise measurements of semantic geometry <d-cite key="roads2021enriching"></d-cite>.

**For cognitive science**: Using our fully observable language-model setup, we can subject a core assumption to rigorous empirical tests---that structured behavior is constrained by, and can therefore partially reveal, internal states. The finding that measurement protocol strongly determines recoverability (FC vs. FA) suggests that whether a behavioral task *reveals* internal structure is not a generic property of "behavior": it depends critically on how responses are constrained and aggregated.

**Cross-model consensus**: A striking finding is the strength of cross-model consensus---similarity structure shared across other LLMs explains a large fraction of variance in a target model's hidden-state geometry, consistent with the hypothesis of a substantial common semantic subspace <d-cite key="huh2024platonic"></d-cite>.

If you find this interesting and if this work is helpful for your research, please consider citing our paper:

```bibtex
@misc{schiekiera2026associations,
  title={From Associations to Activations: Comparing Behavioral and
         Hidden-State Semantic Geometry in {LLMs}},
  author={Schiekiera, Louis and Zimmer, Max and Roux, Christophe
          and Pokutta, Sebastian and G{\"u}nther, Fritz},
  year={2026},
  eprint={2602.00628},
  archivePrefix={arXiv},
  primaryClass={cs.LG},
  url={https://arxiv.org/abs/2602.00628},
}
```
