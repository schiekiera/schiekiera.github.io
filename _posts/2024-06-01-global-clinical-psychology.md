---
layout: distill
title: "Mapping Global Representation in Psychotherapy Trials: Who Gets First Authorship?"
date: 2024-06-01
description: "Our book chapter in <b>A Better How: Notes on Developmental Meta-Research</b> investigates regional representation in psychotherapy RCTs. Analyzing 17,095 first-author affiliations from 1990 to 2022, we find that North America and Europe dominate but North America's share has halved, while Asia's share has risen eightfold. Global South-only and mixed North–South teams are growing but remain a small minority."
tags: [metascience, global-south, clinical-psychology, authorship]
thumbnail: /assets/img/blog/global_clinical_psychology/figure1.jpg
bibliography: global_clinical_psychology.bib
publication_type: "Book Chapter"
paper_url: "https://www.busara.global/wp-content/uploads/2024/06/A-Better-How-Book.pdf"
code_url: "https://github.com/schiekiera/busara_2024"
giscus_comments: false
related_posts: false
toc:
  - name: "Motivation: How is authorship distributed in psychotherapy research?"
  - name: "Method: 17,095 psychotherapy RCTs from PubMed"
  - name: "Results"
    subsections:
      - name: "First authorship by world region"
      - name: "Team composition: Global North vs. South"
  - name: "Discussion"
authors:
  - name: Helen Niemeyer
    affiliations:
      name: FU Berlin
  - name: Louis Schiekiera
    affiliations:
      name: FU Berlin
---

**📄 [Book Chapter (A Better How)](https://www.busara.global/wp-content/uploads/2024/06/A-Better-How-Book.pdf)** | **💻 [GitHub](https://github.com/schiekiera/busara_2024)**

### Motivation: How is authorship distributed in psychotherapy research?

Psychotherapy research is conducted worldwide, yet the regional distribution of authorship in this literature has received limited quantitative attention <d-cite key="cheung2012mainstreaming"></d-cite> <d-cite key="adetula2022psychology"></d-cite>. Understanding who authors psychotherapy trials---and how this has changed over time---provides an empirical basis for discussions about the geographic composition of the field <d-cite key="heim2021reporting"></d-cite>.

We asked two questions: **(1)** How are first authorships in psychotherapy RCTs distributed across world regions, and how has this changed from 1990 to 2022? **(2)** What is the composition of research teams in terms of Global North vs. Global South affiliations?

### Method: 17,095 psychotherapy RCTs from PubMed

We searched PubMed for all randomized controlled trials in psychotherapy published between 1990 and 2022 using the query `(Psychotherapy[MeSH Terms]) AND ("1990"[Date - Publication]: "2022"[Date - Publication]) AND (Randomized Controlled Trial[Filter]) AND English[Language]`. This yielded 20,862 abstracts. After excluding 275 without an abstract, 93 non-English abstracts (detected via the cld2 R library), and 61 with missing publication years, we obtained affiliation data for 17,095 studies through OpenAlex, using ISO 3166-1 alpha-2 country codes for the first author's institution.

For the team composition analysis, we classified all author affiliations per study into Global North, Global South, or mixed using the UNCTAD regional classification.

### Results

#### First authorship by world region

The distribution of first-author affiliations varied considerably across regions:

| Region                    |   _n_ | Share |
| ------------------------- | ----: | ----: |
| North America             | 8,076 | 47.2% |
| Europe                    | 5,682 | 33.2% |
| Asia                      | 1,972 | 11.5% |
| Oceania                   | 1,031 |  6.0% |
| Latin America & Caribbean |   226 |  1.3% |
| Africa                    |   108 |  0.6% |

Over three decades, the landscape shifted substantially. North America's relative share declined from $M = 0.65$ (SD = 0.03) in the 1990s to $M = 0.36$ (SD = 0.03) by 2020--2022. Europe rose and then plateaued (from 0.27 to 0.32). The most dramatic change was in Asia, increasing from $M = 0.03$ (SD = 0.01) to $M = 0.23$ (SD = 0.03)---nearly an eightfold increase---driven in particular by China (0.08 in 2022) and Iran (0.05 in 2022), both of which had no publications before 1994.

<figure class="post-figure">
  <img src="/assets/img/blog/global_clinical_psychology/figure1.jpg" alt="Proportion of first-author affiliations by world region over time" class="zoomable" data-zoomable>
  <figcaption>Proportion of first-author academic affiliations in psychotherapy RCTs by world region over time (1990–2022). North America's share has declined while Asia's has increased. Africa and Latin America remained below 0.02 throughout the period.</figcaption>
</figure>

Latin America and the Caribbean, Africa, and Oceania showed smaller changes. Latin America increased from 0.01 to 0.02; Africa rose from 0.01 to 0.02; Oceania remained stable around 0.05--0.06 throughout the period.

#### Team composition: Global North vs. South

We also examined the affiliations of _all_ authors per study:

| Team Composition    |    _n_ | Share |
| ------------------- | -----: | ----: |
| Global North only   | 14,965 | 87.5% |
| Global South only   |  1,242 |  7.3% |
| Mixed North & South |    888 |  5.2% |

The composition of research teams changed over the observation period. In the 1990s, 98% of teams consisted exclusively of Global North authors ($M = 0.98$, SD = 0.01). By 2020--2022 this had decreased to 75% ($M = 0.75$, SD = 0.03). Global South-only teams increased from $M = 0.01$ to $M = 0.16$ (SD = 0.03). Mixed teams rose from $M = 0.02$ (SD = 0.01) to $M = 0.09$ (SD = 0.01).

<figure class="post-figure">
  <img src="/assets/img/blog/global_clinical_psychology/figure2.jpg" alt="Proportion of authorship by UNCTAD region over time" class="zoomable" data-zoomable>
  <figcaption>Proportion of authorship teams in psychotherapy RCTs classified by UNCTAD region (1990–2022). Global North-only teams decreased from 98% to 75%. Global South-only and mixed teams increased over the same period.</figcaption>
</figure>

### Discussion

**Regional shifts**: North America accounted for nearly two-thirds of first authorships in the 1990s but roughly one-third by 2020--2022. Asia showed the largest increase, rising from 3% to 23%. Africa and Latin America together accounted for less than 2% of first authorships across the entire 1990--2022 period, and their shares changed little over time.

**Team composition**: The share of exclusively Global North teams decreased from 98% to 75%, while Global South-only teams grew from 1% to 16% and mixed teams from 2% to 9%. These patterns indicate a shift in the geographic distribution of authorship, though the majority of studies continue to be authored by Global North-affiliated researchers.

**Limitations**: Our analysis is restricted to English-language publications indexed in PubMed and relies on affiliation data from OpenAlex. Research published in other languages or regional journals may not be captured. The UNCTAD classification groups heterogeneous countries together, and within-region variation is not examined here.

If you find this work useful for your research, please consider citing our chapter:

```bibtex
@incollection{niemeyer2024bookchapter,
  author = {Niemeyer, Helen and Schiekiera, Louis},
  title = {How inclusive and equitable is research in clinical
           psychology that focuses on the {Global South}?},
  booktitle = {A Better How: Notes on Developmental Meta-Research},
  editor = {Forscher, Patrick S. and Schmidt, Mario},
  year = {2024},
  publisher = {Busara},
  address = {Nairobi, Kenya},
  pages = {72--80},
  doi = {10.62372/ISCI6112}
}
```
