---
layout: post
title: "A Harmonized Trial-Level Dataset of Picture-Word Interference"
date: 2026-05-05
description: "We release a harmonized, openly accessible dataset of 688,976 trials from 86 picture-word interference experiments across 42 studies, involving 3,353 English- and German-speaking participants — assembled from five sources and unified into a common 28-variable schema."
tags: [psycholinguistics, language-production, open-data, mega-analysis]
thumbnail: /assets/img/blog/pwi_data/pwi_data_collection_process.png
publication_type: "Preprint (PsyArXiv)"
paper_url: "https://osf.io/preprints/psyarxiv/xp69t_v1"
giscus_comments: false
related_posts: false
---

_Preprint on **PsyArXiv**._

**📄 [Preprint](https://osf.io/preprints/psyarxiv/xp69t_v1)**

### Why a harmonized PWI dataset?

Decades of picture-word interference (PWI) research have produced a rich literature on how distractor words modulate picture naming, yet the trial-level data underlying these findings remain fragmented across laboratories, repositories, and bespoke file formats, limiting large-scale reuse and cross-study comparison.

We assembled a harmonized, openly accessible dataset comprising:

- **688,976 trials**
- **86 experiments** across **42 studies**
- **3,353 participants** naming pictures in English or German

Data come from five sources: an in-house laboratory archive, raw data from a prior meta-analysis, systematic literature searches (OpenAlex, PubMed), direct author contributions, and the Open Science Framework.

<div class="figure-container">
  <img src="/assets/img/blog/pwi_data/pwi_data_collection_process.png" alt="Data collection and harmonization process across the five sources" data-zoomable>
  <span class="figure-caption">Data collection and harmonization process across the five sources.</span>
</div>

### A common 28-variable schema

All datasets were cleaned and harmonized into a single schema covering:

- Trial identifiers and response times.
- A harmonized response-accuracy code that aligns conventions across labs.
- Experimental design characteristics (SOA, distractor type, naming language, etc.).
- Target–distractor relatedness indicators.
- Basic psycholinguistic properties of target and distractor words.

Technical validation shows the expected reaction-time distributions across studies.

<div class="figure-container">
  <img src="/assets/img/blog/pwi_data/pwi_data_folder_structure.png" alt="Folder structure of the released dataset" data-zoomable>
  <span class="figure-caption">Folder structure of the released dataset.</span>
</div>

### Built to grow

The full data-collection and cleaning pipeline is openly released so that the resource is **extensible**: future PWI studies, additional languages, and further harmonized variables can be added by other researchers without rebuilding the infrastructure from scratch.

### What this enables

- **Mega-analyses** with statistical power beyond what individual studies can provide.
- **Computational modeling** of naming latencies on a unified scale.
- **Replication work** at the trial level rather than the summary-statistic level.
- **Methodological investigations** of how design choices interact with the canonical PWI effects.

If you have a PWI dataset you'd like included, or you're interested in using the harmonized resource, please reach out — the pipeline is built to absorb new contributions.
