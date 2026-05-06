---
layout: post
title: "Comparing Behavioral and Hidden-State Semantic Geometry in LLMs"
date: 2026-05-01
description: "Our paper <b>From Associations to Activations: Comparing Behavioral and Hidden-State Semantic Geometry in LLMs</b> (accepted at <b>ICML 2026</b>) investigates whether an LLM's internal semantic geometry can be recovered from its observable behavior. Across eight instruction-tuned transformers and 17.5M+ trials, we compare behavior-derived similarity structures from forced-choice and free-association paradigms to layerwise hidden-state geometry using representational similarity analysis. We find that forced-choice behavior aligns substantially more with internal representations than free association, and that behavioral similarity predicts unseen hidden-state similarities beyond lexical baselines."
tags: [interpretability, representation-learning, llm-behavior, semantic-geometry]
thumbnail: /assets/img/blog/neural_semantic_geometry/conceptual.png
publication_type: "ICML 2026"
paper_url: "https://arxiv.org/abs/2602.00628"
code_url: "https://github.com/schiekiera/llm-association-geometry"
data_url: "https://huggingface.co/datasets/schiekiera/llm-association-geometry"
giscus_comments: false
related_posts: false
---

## Motivation

In cognitive science, semantic knowledge is treated as a latent structure: we cannot observe a speaker's meaning representation directly, but we can systematically probe it through behavior. Word-association paradigms use exactly this logic, when a participant sees a cue (e.g., _dog_), the associations they produce or select (e.g., _cat_, _leash_, _bark_) are constrained by their underlying semantic organization. When such judgments are aggregated across trials, the resulting response statistics yield a similarity matrix that approximates the geometry of an otherwise unobserved semantic system.

We transfer this measurement logic to large language models. Unlike humans, both behavior _and_ internal representations are observable in LLMs. This creates a unique opportunity: we can systematically test how well an LLM's behavioral output reveals its internal semantic geometry. A key open question is not only how model behavior compares to humans, but also what a model's _own_ behavior reveals about its _own_ internal representations.

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/conceptual.png" alt="Conceptual overview of the framework" data-zoomable>
  <span class="figure-caption">Conceptual overview. For a shared vocabulary, we (i) extract layer-wise word representations to form a hidden-state similarity matrix, and (ii) run behavioral association tasks (forced choice / free association) to build a behavioral similarity matrix. Representational similarity analysis (RSA) correlates the pairwise similarities to quantify behavior–activation alignment.</span>
</div>

## Framework

### Two behavioral paradigms

We use two classic psycholinguistic paradigms, forced choice (FC) and free association (FA), to collect semantic relations from model behavior over a shared vocabulary of 5,000 high-frequency English nouns.

<div class="project-grid cols-2">
  <div class="project-card">
    <h4 class="highlight-text">Forced choice (FC)</h4>
   <p>Each cue word appears with 16 candidates; the model picks the two most semantically related to the cue.</p>  </div>
  <div class="project-card">
    <h4 class="highlight-text">Free association (FA)</h4>
    <p>The model is prompted with a single cue word and asked to generate exactly five single-word associates.</p>
  </div>
</div>

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/both_paradigms.png" alt="Forced choice and free association paradigms" data-zoomable>
  <span class="figure-caption">Behavioral paradigms and derived semantic geometries. Left (forced choice): given a cue word and a candidate set, the model selects the most related words. Right (free association): given a cue word alone, the model generates multiple associates. From the resulting cue–response count matrices, we compute similarity matrices by cosine similarity between rows.</span>
</div>

For each paradigm, model outputs are aggregated into a sparse cue–response count matrix **B**. We reweight counts with positive pointwise mutual information (PPMI) to reduce the influence of globally frequent responses, then compute a cue–cue similarity matrix via cosine similarity between the PPMI-weighted row vectors. In total, we collected over **17.5 million trials** across both paradigms and eight models.

### Hidden-state extraction

For each model and each word, we extract layerwise hidden-state representations under four contextual embedding strategies:

<div class="project-grid cols-2">
  <div class="project-card">
    <h4 class="highlight-text">Averaged</h4>
<p>Target word in 50 C4 sentences, hidden states averaged across contexts.</p>  </div>
  <div class="project-card">
    <h4 class="highlight-text">Meaning</h4>
    <p>A fixed definition-style prompt (<em>"What is the meaning of the word {w}?"</em>).</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Task (FC)</h4>
    <p>The target word embedded in the FC instruction prompt (without candidates).</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Task (FA)</h4>
    <p>The target word embedded in the FA instruction prompt.</p>
  </div>
</div>

Hidden-state similarity matrices are computed as cosine similarity between mean-centered layerwise word vectors.

### Models and baselines

We evaluate eight instruction-tuned decoder-only transformer models ranging from 7B to 14B parameters (Falcon3, Gemma-2, Llama-3.1, Mistral-7B, Mistral-Nemo, Phi-4, Qwen2.5, and rnj-1). Beyond behavioral embeddings, we compare hidden-state similarities to three baselines: **FastText** (static word vectors), **BERT** (contextual encoder), and a **cross-model consensus** geometry aggregating hidden-state similarities across all other models, motivated by recent evidence for a shared semantic subspace across diverse LLMs.

### Evaluation

We use three complementary evaluation methods:

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">Representational Similarity Analysis (RSA)</h4>
    <p>For each layer, we vectorize the upper-triangular entries of the hidden-state and reference similarity matrices and compute their Pearson correlation.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Nearest-neighbor overlap (NN@k)</h4>
    <p>We quantify how well the *k*-nearest-neighbor neighborhoods induced by hidden-state similarity match those of the reference spaces.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Held-out-words ridge regression</h4>
    <p>We test whether behavioral similarity predicts unseen hidden-state similarities on held-out words beyond lexical baselines and cross-model consensus.</p>
  </div>
</div>

## Results

### Forced choice aligns substantially more than free association

Across all models and evaluation methods, FC behavior aligns substantially more strongly with hidden-state geometry than FA. Mean FC RSA increases from *r = .346* under Averaged extraction to *r = .463* under Task (FC), while FA shows the same pattern at considerably lower magnitude (*r = .140* to *r = .199*).

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/rsa_nn_grid_1x2.png" alt="Summary RSA and nearest-neighbor overlap results" data-zoomable>
  <span class="figure-caption">Summary of RSA and neighborhood-overlap results (means across models). Left: mean RSA Pearson correlation as a function of layer. Right: mean nearest-neighbor overlap as a function of neighborhood size *k* (log scale). FC behavior (green) aligns substantially more with hidden-state geometry than FA behavior (red), while cross-model consensus (black) provides the strongest reference.</span>
</div>

Task-aligned and meaning-based extraction strategies yield the strongest alignment at earlier, mid-depth layers, whereas averaging over natural contexts shifts alignment peaks to later layers.

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/rsa_line_plot_1x2_grid_fc_fa.png" alt="Layerwise RSA for FC and FA under different extraction strategies" data-zoomable>
  <span class="figure-caption">Layerwise RSA for PPMI-weighted forced-choice similarity (left) and free-association similarity (right) under different extraction strategies. Task-aligned prompts yield peak alignment at earlier layers, while averaged contexts shift peaks later.</span>
</div>

The full model-by-model RSA comparison reveals that the FC advantage is consistent across all eight models, though the magnitude varies:

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/rsa_fc_fa_2x4_grid.png" alt="RSA heatmap across models" data-zoomable>
  <span class="figure-caption">RSA between model hidden-state similarity and behavior-derived semantic geometries. Each panel corresponds to a model and compares hidden-state similarity to PPMI-weighted forced-choice (left) and free-association (right) behavioral embeddings across extraction strategies and layers.</span>
</div>

### Behavioral similarity predicts unseen hidden-state structure

The held-out-words ridge regression shows that behavioral similarity, especially FC, predicts unseen hidden-state similarities beyond lexical baselines and cross-model consensus. Adding behavioral FC similarity on top of the baseline improves mean test *R^2* by *+.022*, whereas FA yields a smaller gain (*+.002*). The full model reaches mean *R^2 = .587* (vs. *.569* for the baseline). Peak performance reaches *R^2 = .844* for Llama-3.1-8B-Instruct.

<div class="figure-container">
  <img src="/assets/img/blog/neural_semantic_geometry/rr_model_performance_grid_2x4.png" alt="Ridge regression performance across models" data-zoomable>
  <span class="figure-caption">Ridge regression performance for predicting hidden-state similarity from behavioral and lexical features across eight models. Bold values show *R^2* for the full model (behavioral + baselines); parenthetical values show the baseline without behavioral features.</span>
</div>

## Discussion

Our findings show that structured behavior, particularly from constrained measurement paradigms like forced choice, preserves a nontrivial projection of a model's hidden-state similarity geometry, even without access to logits or internal activations. This has implications for both interpretability research and cognitive science:

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">For interpretability</h4>
    <p>Behavioral probing can serve as a practical tool for understanding internal representations when only black-box access is available. The FC paradigm's controlled candidate sets concentrate observations and produce a less sparse cue–response matrix, yielding higher signal-to-noise measurements of semantic geometry.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">For cognitive science</h4>
    <p>Using our fully observable language-model setup, we can subject a core assumption to rigorous empirical tests: that structured behavior is constrained by, and can therefore partially reveal, internal states. The finding that measurement protocol strongly determines recoverability (FC vs. FA) suggests that whether a behavioral task <em>reveals</em> internal structure is not a generic property of "behavior": it depends critically on how responses are constrained and aggregated.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Cross-model consensus</h4>
    <p>Similarity structure shared across other LLMs explains a large fraction of variance in a target model's hidden-state geometry, consistent with the hypothesis of a common semantic subspace.</p>
  </div>
</div>

## Citation

If you find this work helpful for your research, please consider citing our paper:

```bibtex
@inproceedings{schiekiera2026associations,
  title={From Associations to Activations: Comparing Behavioral and
         Hidden-State Semantic Geometry in {LLMs}},
  author={Schiekiera, Louis and Zimmer, Max and Roux, Christophe
          and Pokutta, Sebastian and G{\"u}nther, Fritz},
  booktitle={Proceedings of the 43rd International Conference on
             Machine Learning (ICML)},
  year={2026},
  publisher={PMLR},
}
```
