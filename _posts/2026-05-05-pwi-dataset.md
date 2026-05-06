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

### Why we did this

Picture-word interference (PWI) is one of the most widely used experimental tools for investigating lexical access during language production: a participant names a picture (the *target*) while ignoring a distractor word, and naming latencies are modulated by the relationship between target and distractor. Four decades of PWI research have produced a rich literature on lexical competition, inhibitory control, semantic and phonological encoding, and individual differences.

But the trial-level data underlying those findings live in study-specific formats, scattered across personal archives, university servers, and assorted repositories with inconsistent variable names, accuracy codes, and exclusion criteria. That fragmentation makes mega-analyses, cross-study comparisons, and computational modeling at scale much harder than it needs to be.

This release is an attempt to fix that.

### What's in it

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

Across the funnel (programmatic searches, full-text screening, OSF queries, and direct author contact), we ended up with 42 that met our criteria *and* had usable trial-level data we could clean and merge.

<div class="figure-container">
  <img src="/assets/img/blog/pwi_data/pwi_data_collection_process.png" alt="Data collection and harmonization process across the five sources" data-zoomable>
  <span class="figure-caption">Data collection and screening process. The five colored streams converge into the final 42-study dataset, with exclusions tracked at each stage.</span>
</div>

### Inclusion criteria

To keep the harmonized dataset coherent, we restricted inclusion to:

- The **classical PWI paradigm**: a single target picture with a single distractor word.
- **English or German** stimuli (where most shareable trial-level data exist, and the languages the authors can validate categorical / associative / phonological relations in).
- **Non-clinical adult** participants (native or non-native speakers).
- **Trial-level** data with identifiable target and distractor words on every trial.

Tasks that bend the paradigm (Stroop, picture-word matching, delayed naming, sentence production, multiple distractors) were excluded. Extending to additional languages is a natural future direction; the pipeline is designed to make that straightforward.

### A 28-variable schema

Every dataset, regardless of source, gets harmonized into a single 28-variable schema organized into five thematic groups:

1. **Identifiers**: `study_id`, `experiment_id`, anonymized `participant_id` (unique across the merged file, even if original studies reused IDs).
2. **Trial-level response**: response time and a single harmonized `accuracy` vocabulary: `correct`, `wrong_word`, `other_error`, `technical_error`. Subject-side errors stay in the file so users can apply their own exclusion criteria; only `technical_error` (voice-key failures, microphone artefacts) is dropped centrally.
3. **Experimental design**: stimulus onset asynchrony, collection setting, and other design features that vary across labs.
4. **Target–distractor relationship**: categorical, associative, phonological, and other relatedness indicators.
5. **Psycholinguistic properties**: target / distractor word length and Zipf-scale frequency from the deWaC (German) and ukWaC (English) corpora.

### A three-stage pipeline

Rather than dumping a single merged file, we ship the **pipeline** that produced it:

- **Stage 1: Study-specific cleaning.** Each source dataset gets its own R cleaning script in `data/01_single_studies/<study>/Scripts/`. The script harmonizes per-study response codes into the common `accuracy` vocabulary, standardizes variable names, and assigns unique participant IDs. A runner executes all study-specific scripts in isolated environments.
- **Stage 2: Language-specific loading.** RTs ≤ 150 ms or > 3,000 ms are excluded (conservative thresholds attested across the prior literature), and word-frequency information is added on the Zipf scale.
- **Stage 3: Merging.** English and German are combined; binary variables are stored as human-readable factor labels (`yes/no`, `text/audio`, `related/unrelated`) so the file can be inspected without an extra coding lookup; trials flagged as `technical_error` are dropped; the final 28-column merged dataset is written to `data/03_merged_data/`.

<div class="figure-container">
  <img src="/assets/img/blog/pwi_data/pwi_data_folder_structure.png" alt="Folder structure of the released OSF repository" data-zoomable>
  <span class="figure-caption">Folder structure on OSF. Top-level <code>data/</code> and <code>scripts/</code> mirror each other; numbered subfolders correspond to successive pipeline stages.</span>
</div>

Adding a new study means writing one cleaning script in the Stage-1 convention and re-running the pipeline. No infrastructure rebuild.

### What this enables

- **Mega-analyses** with statistical power well beyond what any single experiment provides.
- **Computational modeling** of naming latencies on a unified trial-level scale, with consistent psycholinguistic predictors.
- **Replication and robustness work** at the trial level rather than at the level of summary statistics.
- **Methodological research** on how design choices (SOA, collection setting, distractor type) shape PWI effects.

### Get it / contribute

Everything (raw data, study-specific cleaning scripts, harmonization code, and the merged file) is on OSF: [10.17605/OSF.IO/2B3SX](https://doi.org/10.17605/OSF.IO/2B3SX). All 42 studies are released under CC-BY 4.0, with explicit author permission obtained for the 34 studies that had not previously released trial-level data under that license.

If you have a PWI dataset (English, German, or any other language) you'd like added, or you spot something you'd improve in the schema or pipeline, please get in touch: `louis.schiekiera [at] hu-berlin.de`.

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
