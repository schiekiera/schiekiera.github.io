---
layout: distill
title: "Beyond Onset Detection: Integrating ASR-Based Content Validation into Spoken-Word Production Annotation"
date: 2026-04-15
description: "This poster presents an ASR-based pipeline for the automated validation of verbal responses in word-production experiments. Using Faster-Whisper (large-v3-turbo) and a three-stage matching procedure — exact string comparison, homophone checking via CMUdict, and phonetic Levenshtein distance on ARPABET sequences — the pipeline achieved a 93.3% automatic match rate across two English datasets (MALD: 926/1000, Canadian English; AELP: 567/600, 6 speaker varieties), reducing manual annotation to 107 flagged cases (~6.7%). Non-matches decompose into phonetic near-misses (69%, n=74), multi-word splits (22%, n=24), and accent confusion (8%, n=9)."
tags: [psycholinguistics, speech-recognition, word-production, annotation, asr]
thumbnail: /assets/img/blog/asr_validator/figure1.png
publication_type: "Conference Poster"
paper_url: ""
code_url: ""
giscus_comments: false
related_posts: false
toc:
  - name: "Motivation"
  - name: "Pipeline"
    subsections:
      - name: "Transcription"
      - name: "Matching"
      - name: "Manual review interface"
  - name: "Validation"
    subsections:
      - name: "Results"
      - name: "Annotated workflow"
      - name: "Error analysis"
  - name: "Discussion and Future Directions"
authors:
  - name: Vincent Gruber
    affiliations:
      name: HU Berlin
  - name: Louis Schiekiera
    affiliations:
      name: HU Berlin
  - name: Fritz Günther
    affiliations:
      name: HU Berlin
---

**🖼️ [Poster (TeaP 2026)](#)** | **💻 [Code (GitHub)](#)**

### Motivation

In word-production research — picture naming, primed production, lexical decision — participants produce verbal responses that must subsequently be validated: was the target word produced correctly, or does the response constitute an error? This manual annotation step is time-intensive, observer-dependent, and scales poorly as stimulus sets grow. A dataset of 1,000 trials can require several hours of careful listening and coding, and inter-rater reliability tends to decrease with fatigue and set size.

Automated approaches to adjacent problems exist. LeCoder <d-cite key="hu2026lecoder"></d-cite>, for instance, automates the *classification* of speech errors in picture naming using Word2Vec-based semantic similarity and normalized Levenshtein distance on IPA transcriptions. However, LeCoder operates on pre-transcribed responses and targets fine-grained error categorization in clinical populations — it is not designed for the more fundamental binary question of whether a response is correct or not, which arises in virtually every word-production experiment with healthy participants.

We present an ASR-based validation pipeline that closes this gap. The system transcribes raw audio recordings automatically using Faster-Whisper and resolves target–response matches through a three-stage phonetic matching procedure, routing only unresolved cases to a lightweight browser-based annotation interface for manual review.


### Pipeline

#### Transcription

Each audio recording is transcribed using Faster-Whisper with the `large-v3-turbo` model. The model runs locally on standard CPU/GPU hardware and requires no cloud infrastructure or external API calls. 

#### Matching

The ASR transcription is compared against the expected target word (name of audio file) using three sequential procedures:

1. **Exact string comparison**: the transcription is matched directly against the target word after Unicode normalization and stripping of punctuation.
2. **Homophone check**: if the exact match fails, both strings are converted to ARPABET phoneme sequences via CMUdict (http://www.speech.cs.cmu.edu/cgi-bin/cmudict/), and the sequences are compared for phonemic identity. This correctly handles homophone pairs like *to* / *two* or *way* / *weigh*.
3. **Phonetic Levenshtein distance**: if the homophone check also fails, the edit distance between the ARPABET sequences is computed and normalized by the length of the longer sequence. 

Trials that pass any of the three stages are marked as automatically verified. Trials that fail all three stages are flagged for manual review.

#### Manual review interface

Trials are presented in a browser-based annotation interface that displays the waveform, a mel spectrogram, the ASR transcription, and the target word alongside its recognition probability.

<figure class="post-figure">
  <img src="/assets/img/blog/asr_validator/figure1.png" alt="Validator interface" class="zoomable" data-zoomable>
  <figcaption>The Speech Onset Validator interface. Each trial shows the waveform with a draggable onset marker, the mel spectrogram, and the ASR recognition result with token probability. The annotator can play, loop, and confirm or correct the response using keyboard shortcuts.</figcaption>
</figure>

The interface is operated entirely via keyboard shortcuts. Annotators can mark a response as correct, incorrect, or uncertain, and manually enter the spoken word if the ASR transcription was wrong.

### Validation

#### Results

We validate the pipeline on two established English-language datasets: the Auditory English Lexicon Project (AELP; <d-cite key="goh2020aelp"></d-cite>; N = 600 trials, 6 speaker varieties) and the Massive Auditory Lexical Decision dataset (MALD; <d-cite key="tucker2019mald"></d-cite>; N = 1,000 trials, 1 speaker, Canadian English).

Across both datasets, the pipeline automatically verified **1,493 trials** (93.3%), with  **107 cases (~6.7%) flagged** for manual review. Per-dataset match rates were 94.5% for AELP (567/600) and 92.6% for MALD (926/1,000), across 7 speakers in total.

#### Annotated workflow

The flagged cases can be reviewed directly by a expert annotator targeting the  non-matches  — that is, expert time is concentrated on the genuinely ambiguous cases (phonetic near-misses, multi-word splits, noise artifacts) rather than distributed uniformly across all trials. This design ensures quality assurance without inflating the manual workload.

#### Error analysis

Manual inspection of the 107 non-matches revealed three categories of failure:

**Phonetic near-misses (69%, n = 74)** — Whisper transcribes a phonetically proximate but distinct word (e.g., *ban* → *ben*, *bomber* → *bummer*). These cases reflect the interaction between Whisper's language-model prior and phonetically ambiguous or low-frequency targets. In principle, the phonetic Levenshtein threshold could be relaxed to absorb many of these, at the cost of increased false positives.

**Multi-word splits (22%, n = 24)** — Whisper segments a single target word into two tokens (e.g., *waterspout* → *what a spout*, *indisposition* → *in this position*). This is a well-documented behavior of Whisper for polysyllabic compound words and morphologically complex forms. It affects MALD (n = 17) and AELP (n = 7) similarly.

**Accent confusion (8%, n = 9)** — Whisper maps non-native vowels or prosodic patterns to the nearest lexical entry in its prior (e.g., *halt* → *hold*, *detour* → *die Tür*). This category was found exclusively in AELP, which includes non-native speaker varieties, and reflects the sensitivity of large-vocabulary ASR models to speaker-specific phonological variation.

### Discussion and Future Directions

The results demonstrate that the manual annotation workload in word-production research can be substantially reduced through ASR-based automation. On a dataset of 1,000 trials, the pipeline reduces manual review to fewer than 110 cases — under 7% of the original workload — while ensuring that no trial is discarded without human inspection.

**Generalizability**: The pipeline is language-agnostic by design. The target language, model, and matching thresholds are specified in a single configuration file. Initial tests with German-language stimulus materials have been successful, and the system has been validated on speaker varieties ranging from Canadian English to non-native L2 production.

**Limitations**: The two main failure modes — phonetic near-misses and multi-word splits — are structurally distinct. Near-misses are addressable through threshold tuning or post-hoc lexical filtering; multi-word splits require either a different segmentation strategy or post-processing rules for compound words. Accent-conditioned failures are harder to mitigate without speaker-specific fine-tuning of the ASR model.

**Future directions**: We plan to (i) Multi language extension (same pipeline applicable to different languages), (ii) direct integration of Chronset via Matlab, and (iii) lab vs online recording robustness (SNR comparison).


### Links

💻 View the repository on [GitHub](https://github.com/vincentgruber/voice-onset-validation-pipeline).