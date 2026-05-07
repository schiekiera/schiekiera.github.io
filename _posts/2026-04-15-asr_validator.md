---
layout: post
title: "Automated Validation of Verbal Responses in Language-Production Research"
date: 2026-04-15
description: "In this blog post, Vincent Gruber presents a pipeline for the automated validation of verbal responses in word-production experiments. Using Faster-Whisper (large-v3-turbo) and a three-stage matching procedure the pipeline achieved a 93% automatic match rate across two English datasets (MALD, AELP)."
authors:
  - Vincent Gruber
  - Louis Schiekiera
  - Fritz Günther
tags: [psycholinguistics, speech-recognition, word-production, annotation, asr]
thumbnail: /assets/img/blog/asr_validator/error_analysis_barplot_thumb.png
publication_type: "Conference Poster"
paper_url: "https://schiekiera.github.io/assets/pdf/poster_TeaP2026.pdf"
code_url: "https://github.com/vincentgruber/voice-onset-validation-pipeline"
giscus_comments: false
related_posts: false
---

## Motivation

In picture naming experiments, participants produce verbal responses that must subsequently be validated: was the target word produced correctly, or does the response constitute an error? This manual annotation step is time-intensive, observer-dependent, and scales poorly as stimulus sets grow. A dataset of 1,000 trials can require several hours of careful listening and coding, and inter-rater reliability tends to decrease with fatigue and set size.

Automated approaches to adjacent problems exist. LeCoder, for instance, automates the *classification* of speech errors in picture naming using Word2Vec-based semantic similarity and normalized Levenshtein distance on IPA transcriptions. However, LeCoder operates on pre-transcribed responses and targets fine-grained error categorization in clinical populations. It is not designed for the more fundamental binary question of whether a response is correct or not, which arises in virtually every word-production experiment with healthy participants.

We present an ASR-based validation pipeline that closes this gap. The system transcribes raw audio recordings automatically using Faster-Whisper and resolves target–response matches through a three-stage phonetic matching procedure, routing only unresolved cases to a lightweight browser-based annotation interface for manual review.

## Pipeline

### Transcription

Each audio recording is transcribed using Faster-Whisper with the `large-v3-turbo` model. The model runs locally on standard CPU/GPU hardware and requires no cloud infrastructure or external API calls.

### Matching

The ASR transcription is compared against the expected target word (name of audio file) using three sequential procedures:

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">1 · Exact string comparison</h4>
    <p>The transcription is matched directly against the target word after Unicode normalization and stripping of punctuation.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">2 · Homophone check</h4>
    <p>If the exact match fails, both strings are converted to ARPABET phoneme sequences via CMUdict, and the sequences are compared for phonemic identity. Correctly handles homophone pairs like <em>to</em> / <em>two</em> or <em>way</em> / <em>weigh</em>.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">3 · Phonetic Levenshtein distance</h4>
    <p>If the homophone check also fails, the edit distance between the ARPABET sequences is computed and normalized by the length of the longer sequence.</p>
  </div>
</div>

Trials that pass any of the three stages are marked as automatically verified. Trials that fail all three stages are flagged for manual review.

### Manual review interface

Trials are presented in a browser-based annotation interface that displays the waveform, a mel spectrogram, the ASR transcription, and the target word alongside its recognition probability.

<div class="figure-container">
  <img src="/assets/img/blog/asr_validator/figure1.png" alt="Screenshot of the browser-based Speech Onset Validator annotation interface" data-zoomable>
  <span class="figure-caption">The browser-based Speech Onset Validator interface for manual review of flagged trials. Each trial displays the audio waveform with a draggable onset marker, a spectrogram, and the ASR transcription alongside its token-level recognition probability. Annotators operate the interface entirely via keyboard shortcuts to play, loop, and confirm or correct each response.</span>
</div>

The interface is operated entirely via keyboard shortcuts. Annotators can mark a response as correct, incorrect, or uncertain, and manually enter the spoken word if the ASR transcription was wrong.

## Validation

### Results

We validate the pipeline on two established English-language datasets: the Auditory English Lexicon Project (AELP; N = 600 trials, 6 speaker varieties) and the Massive Auditory Lexical Decision dataset (MALD; N = 1,000 trials, 1 speaker, Canadian English).

Across both datasets, the pipeline automatically verified **1,493 trials** (93.3%), with **107 cases (~6.7%) flagged** for manual review. Per-dataset match rates were 94.5% for AELP (567/600) and 92.6% for MALD (926/1,000), across 7 speakers in total.

<div class="figure-container">
  <img src="/assets/img/blog/asr_validator/results_barplot.png" alt="Horizontal bar chart showing automatic match rates of 94.5% for AELP and 92.6% for MALD" data-zoomable>
  <span class="figure-caption">Automatic match rates per dataset. The pipeline verified 94.5% of AELP trials (567/600, 6 speaker varieties) and 92.6% of MALD trials (926/1,000, Canadian English) without manual intervention, yielding a combined match rate of 93.3% across 1,600 trials. Amber segments indicate trials flagged for manual review.</span>
</div>

### Annotated workflow

The flagged cases can be reviewed directly by an expert annotator targeting the non-matches: expert time is concentrated on the genuinely ambiguous cases (phonetic near-misses, multi-word splits, noise artifacts) rather than distributed uniformly across all trials. This design ensures quality assurance without inflating the manual workload.

### Error analysis

Manual inspection of the 107 non-matches revealed three categories of failure:

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">Phonetic near-misses (69%, n = 74)</h4>
    <p>Whisper transcribes a phonetically close but distinct word (e.g., <em>ban</em> → <em>ben</em>, <em>bomber</em> → <em>bummer</em>), reflecting its language-model prior on ambiguous or low-frequency targets. Relaxing the Levenshtein threshold would absorb many of these at the cost of more false positives.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Multi-word splits (22%, n = 24)</h4>
    <p>Whisper segments one target into two tokens (e.g., <em>waterspout</em> → <em>what a spout</em>, <em>indisposition</em> → <em>in this position</em>), a known behavior on polysyllabic and morphologically complex forms. Affects MALD (n = 17) and AELP (n = 7) similarly.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Accent confusion (8%, n = 9)</h4>
    <p>Whisper maps non-native vowels or prosody to the nearest lexical entry in its prior (e.g., <em>halt</em> → <em>hold</em>, <em>detour</em> → <em>die Tür</em>). Found only in AELP, which includes non-native speakers.</p>
  </div>
</div>

<div class="figure-container">
  <img src="/assets/img/blog/asr_validator/error_analysis_barplot.png" alt="Horizontal bar chart showing error categories: phonetic near-misses (69%), multi-word splits (22%), and accent confusion (8%)" data-zoomable>
  <span class="figure-caption">Breakdown of the 107 flagged trials by error category and dataset. Phonetic near-misses account for the majority of failures in both MALD and AELP. Multi-word splits affect both datasets similarly, while accent confusion occurs exclusively in AELP, reflecting its inclusion of non-native speaker varieties.</span>
</div>

## Discussion

<div class="insight-box">
  <strong>Bottom line:</strong> the manual annotation workload in word-production research can be substantially reduced through ASR-based automation. On a dataset of 1,000 trials the pipeline reduces manual review to fewer than 110 cases (under 7% of the original workload), while ensuring that no trial is discarded without human inspection.
</div>

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">Generalizability</h4>
    <p>The pipeline is language-agnostic by design. Target language, model, and matching thresholds live in a single configuration file. Initial tests with German stimulus materials have been successful, and the system has been validated on speaker varieties from Canadian English to non-native L2 production.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Limitations</h4>
    <p>Phonetic near-misses are addressable via threshold tuning or post-hoc lexical filtering; multi-word splits require a different segmentation strategy or post-processing rules for compound words. Accent-conditioned failures are harder to mitigate without speaker-specific fine-tuning.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Future directions</h4>
    <p>(i) Multi-language extension (same pipeline applicable to different languages); (ii) direct integration of Chronset via Matlab; (iii) lab vs. online recording robustness (SNR comparison).</p>
  </div>
</div>
