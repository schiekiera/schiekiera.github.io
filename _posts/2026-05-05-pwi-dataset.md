---
layout: post
title: "A Harmonized Trial-Level Dataset of Picture-Word Interference"
date: 2026-05-05
description: "We release a harmonized, openly accessible dataset of 688,976 trials from 86 picture-word interference experiments across 42 studies, assembled from five sources, unified into a 28-variable schema, and shipped with the full cleaning pipeline so future studies can be added without rebuilding the infrastructure."
tags: [psycholinguistics, language-production, open-data, megastudies]
thumbnail: /assets/img/blog/pwi_data/pwi_data_collection_process.png
publication_type: "Preprint (PsyArXiv)"
paper_url: "https://osf.io/preprints/psyarxiv/xp69t_v1"
giscus_comments: false
related_posts: false
---

_Preprint on **PsyArXiv**. Data and pipeline on **OSF**: [10.17605/OSF.IO/2B3SX](https://doi.org/10.17605/OSF.IO/2B3SX)._

**📄 [Preprint](https://osf.io/preprints/psyarxiv/xp69t_v1)** · **🗂️ [Dataset & pipeline (OSF)](https://doi.org/10.17605/OSF.IO/2B3SX)**

### Motivation: Why we did this

Picture-word interference (PWI) is one of the most widely used experimental tools for investigating lexical access during language production: a participant names a picture (the *target*) while ignoring a distractor word, and naming latencies are modulated by the relationship between target and distractor. Four decades of PWI research have produced a rich literature on lexical competition, inhibitory control, semantic and phonological encoding, and individual differences.

But the trial-level data underlying those findings live in study-specific formats, scattered across personal archives, university servers, and assorted repositories with inconsistent variable names, accuracy codes, and exclusion criteria. That fragmentation makes mega-analyses, cross-study comparisons, and computational modeling at scale much harder than it needs to be.

This release is an attempt to fix that.

### Method: What's in it

|                  |                  |
| ---------------- | ---------------- |
| **Trials**       | 688,976          |
| **Experiments**  | 86               |
| **Studies**      | 42               |
| **Participants** | 3,353            |
| **Languages**    | English & German |
| **License**      | CC-BY 4.0        |

<br>

The data come from five complementary sources:

<br>

| Source                                       | Studies | Experiments | Participants |      Trials |
| -------------------------------------------- | ------: | ----------: | -----------: | ----------: |
| In-house archive (HU Berlin)                 |      12 |          16 |          591 |     204,658 |
| OSF API search                               |      11 |          30 |        1,303 |     282,806 |
| Author contributions (data-sharing requests) |       6 |          12 |          364 |      86,224 |
| Bürki et al. (2020) meta-analysis            |       8 |          20 |          618 |      40,960 |
| OpenAlex + PubMed full-text searches         |       5 |           8 |          477 |      74,328 |
| **Total**                                    |  **42** |      **86** |    **3,353** | **688,976** |

<br>

Across the funnel (programmatic searches, full-text screening, OSF queries, and direct author contact), we ended up with 42 that met our criteria *and* had usable trial-level data we could clean and merge.
<br>

<div class="figure-container">
  <img src="/assets/img/blog/pwi_data/pwi_data_collection_process.png" alt="Data collection and harmonization process across the five sources" data-zoomable>
  <span class="figure-caption">Data collection and screening process. The five colored streams converge into the final 42-study dataset, with exclusions tracked at each stage.</span>
</div>

#### Inclusion criteria

To keep the harmonized dataset coherent, we restricted inclusion to:

- The *classical PWI paradigm*: a single target picture with a single distractor word.
- *English or German* stimuli.
- *Non-clinical adult* participants.
- *Trial-level* data with identifiable target and distractor words on every trial.


#### Variable types

Every dataset, regardless of source, gets harmonized into a single 28-variable schema organized into five thematic groups:

<div class="project-grid cols-2">
  <div class="project-card">
    <h4 class="highlight-text">Trial-level response</h4>
    <p>Response time plus a single harmonized accuracy vocabulary. </p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Experimental design</h4>
    <p>Stimulus onset asynchrony, collection setting, and other design features that vary across labs.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Target–distractor relationship</h4>
    <p>Categorical, associative, phonological, and other relatedness indicators.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Psycholinguistic properties</h4>
    <p>Target / distractor word length and Zipf-scale frequency.</p>
  </div>
</div>

#### The pipeline

Rather than dumping a single merged file, we ship the **pipeline** that produced it:

<div class="project-grid cols-1">
  <div class="project-card">
    <h4 class="highlight-text">Stage 1 · Study-specific cleaning</h4>
    <p>Each source dataset gets its own R cleaning script in <code>data/01_single_studies/&lt;study&gt;/Scripts/</code>.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Stage 2 · Language-specific loading</h4>
    <p>RTs ≤ 150 ms or > 3,000 ms are excluded and word-frequency information is added on the Zipf scale.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Stage 3 · Merging</h4>
    <p>English and German are combined and the final dataset is written to <code>data/03_merged_data/</code>.</p>
  </div>
</div>

<div class="figure-container">
  <img src="/assets/img/blog/pwi_data/pwi_data_folder_structure.png" alt="Folder structure of the released OSF repository" data-zoomable>
  <span class="figure-caption">Folder structure on OSF. Top-level <code>data/</code> and <code>scripts/</code> mirror each other; numbered subfolders correspond to successive pipeline stages.</span>
</div>

Adding a new study means writing one cleaning script in the Stage-1 convention and re-running the pipeline. No infrastructure rebuild.

### What this enables

<div class="project-grid cols-2">
  <div class="project-card">
    <h4 class="highlight-text">Mega-analyses</h4>
    <p>Statistical power well beyond what any single experiment provides.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Computational modeling</h4>
    <p>Naming latencies on a unified trial-level scale, with consistent psycholinguistic predictors.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Replication &amp; robustness work</h4>
    <p>At the trial level rather than at the level of summary statistics.</p>
  </div>
  <div class="project-card">
    <h4 class="highlight-text">Methodological research</h4>
    <p>How design choices (SOA, collection setting, distractor type) shape PWI effects.</p>
  </div>
</div>

### Get it / contribute

Everything (raw data, study-specific cleaning scripts, harmonization code, and the merged file) is on OSF: [10.17605/OSF.IO/2B3SX](https://doi.org/10.17605/OSF.IO/2B3SX). All 42 studies are released under CC-BY 4.0, with explicit author permission obtained for the 34 studies that had not previously released trial-level data under that license.

<div class="insight-box">
  <strong>Want to contribute?</strong> If you have a PWI dataset (English, German, or any other language) you'd like added, please get in touch: <code>louis.schiekiera [at] hu-berlin.de</code>.
</div>

<br>

### Citation
If you find this dataset useful for your research, please consider citing the preprint:

```bibtex
@misc{schiekiera2026pwi_dataset,
  title        = {A harmonized trial-level dataset of picture-word interference},
  author       = {Schiekiera, Louis and Abdel Rahman, Rasha and Gruber, Vincent
                  and B{\"u}rki, Audrey and Lorenz, Antje and Stark, Kirsten
                  and G{\"u}nther, Fritz},
  year         = {2026},
  howpublished = {Preprint, PsyArXiv},
  url          = {https://osf.io/preprints/psyarxiv/xp69t_v1}
}
```