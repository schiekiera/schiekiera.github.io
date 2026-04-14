---
layout: distill
title: "Does Scientific Productivity Increase the Publication of Positive Results?"
date: 2025-04-01
description: "Our paper in <b>Collabra: Psychology</b> investigates whether German clinical psychology research groups with high versus low publication outputs differ in the prevalence of positive results. Analyzing 2,280 empirical studies from 99 research groups (2013–2022), we find approximately 90% positive results across the board, with no significant difference between high- and low-output groups. Scientific productivity does not differentially explain the excess of positive results."
tags: [metascience, positive-results, scientific-productivity, clinical-psychology]
thumbnail: /assets/img/blog/scientific_productivity/Figure_3.png
bibliography: scientific_productivity.bib
publication_type: "Journal Article"
giscus_comments: false
related_posts: false
toc:
  - name: "Motivation: Does publish-or-perish drive positive results?"
  - name: "Method: Mapping German clinical psychology output"
    subsections:
      - name: "Data collection"
      - name: "Annotation and analysis"
  - name: "Results"
    subsections:
      - name: "No difference between high- and low-output groups"
      - name: "Abstract-level analyses across all quartiles"
  - name: "Discussion and implications"
authors:
  - name: Louis Schiekiera
    affiliations:
      name: FU Berlin & HU Berlin
  - name: Helen Niemeyer
    affiliations:
      name: FU Berlin
---

**📄 [Paper (Collabra: Psychology)](https://online.ucpress.edu/collabra/article-pdf/11/1/137035/874484/collabra_2025_11_1_137035.pdf)** | **📝 [Preregistration (OSF)](https://osf.io/46fk9/files/osfstorage/65aea1a9b1f2b50389b0e3f3)** | **💻 [Code & Data (GitHub)](https://github.com/schiekiera/collabra_2025)**

### Motivation: Does publish-or-perish drive positive results?

Positive results are common in the psychology literature: rates between 91--97% are consistently reported for hypothesis-testing studies <d-cite key="fanelli2010positive"></d-cite> <d-cite key="fanelli2012negative"></d-cite> <d-cite key="scheel2021excess"></d-cite> <d-cite key="sterling1959publication"></d-cite>. One proposed explanation is publish-or-perish culture, where competition and pressure to publish may contribute to selective reporting. Fanelli <d-cite key="fanelli2010pressures"></d-cite> showed that US states with stronger publication pressures exhibited higher rates of positive results.

But previous work has measured pressure at the macro level (state-wide or discipline-wide). We asked: **does publication pressure at the organizational (meso) level---specifically, the scientific productivity of a research group---predict higher rates of positive results?**

Two mechanisms could link high productivity to more positive results. First, a **social mechanism**: groups under higher productivity expectations may face stronger pressure to produce publishable (i.e., positive) findings <d-cite key="franco2014publication"></d-cite>. Second, a **statistical mechanism**: highly productive groups may attract more funding, enabling larger sample sizes that reduce Type II errors.

<figure class="post-figure">
  <img src="/assets/img/blog/scientific_productivity/Figure_1.png" alt="Data acquisition procedure" class="zoomable" data-zoomable>
  <figcaption>Data acquisition procedure. We identified clinical psychology research groups at German universities, compiled researcher lists, extracted publications from PubMed and OpenAlex, and applied multi-step cleaning and verification to arrive at the final corpus of 2,280 empirical studies.</figcaption>
</figure>

### Method: Mapping German clinical psychology output

#### Data collection

We conducted a comprehensive survey of **all quantitative-empirical publications** first-authored by clinical psychology researchers affiliated with German universities from 2013 to 2022. This involved:

1. Identifying **99 research groups** across 52 universities (all 16 German federal states)
2. Compiling **1,128 researcher names** from group websites
3. Extracting metadata from PubMed and OpenAlex
4. Extensive multi-step cleaning (removing name confusions, duplicates, non-empirical studies)
5. Manual verification against institutional publication lists

The final corpus comprised **2,280 empirical studies**. Scientific productivity was defined as the ratio of quantitative-empirical publications to the number of academic staff per research group.

<figure class="post-figure">
  <img src="/assets/img/blog/scientific_productivity/Figure_2.png" alt="Research group distribution" class="zoomable" data-zoomable>
  <figcaption>Number of publications and number of researchers per research group, colored by scientific productivity quartile (Q1 = lowest, Q4 = highest). The 99 German clinical psychology research groups varied substantially in size and output.</figcaption>
</figure>

#### Annotation and analysis

We randomly sampled **300 papers** (150 from the bottom quartile Q1 and 150 from the top quartile Q4 of scientific productivity) and annotated the result of the first reported hypothesis following the procedures of Fanelli and Scheel et al. <d-cite key="fanelli2010positive"></d-cite> <d-cite key="scheel2021excess"></d-cite>. Each paper was classified as providing full support, partial support, or no support. Interrater reliability was high ($\kappa = .800$, 90% agreement).

Additionally, we conducted exploratory **abstract-level annotations** on 1,990 studies across all four quartiles, classifying each abstract based on all reported results.

### Results

#### No difference between high- and low-output groups

**~90% of studies reported positive results, regardless of group productivity**.

- Q1 (low output): 90.00% positive (95% CI: 84.0--94.3%)
- Q4 (high output): 89.33% positive (95% CI: 83.3--93.8%)
- Difference: $-0.67\%$, $p = .500$ (one-sided proportion test)

A logistic regression testing whether raw group paper count predicted positive results found no significant effect (OR = 1.00, $p = .356$).

<figure class="post-figure">
  <img src="/assets/img/blog/scientific_productivity/Figure_3.png" alt="Rates of positive results Q1 vs Q4" class="zoomable" data-zoomable>
  <figcaption>Rates of positive results for low-output (Q1) and high-output (Q4) research groups based on the first-reported hypothesis. Both groups report approximately 90% positive results with no significant difference.</figcaption>
</figure>

#### Abstract-level analyses across all quartiles

When extending to abstract-level annotations across all four quartiles, **97.19%** of 1,990 abstracts reported full or partial support. A chi-square test found no significant association between productivity quartile and support category ($\chi^2(6) = 6.67$, $p = .353$). Logistic regression with scientific productivity as a continuous predictor was likewise non-significant ($p = .432$).

<figure class="post-figure">
  <img src="/assets/img/blog/scientific_productivity/Figure_4.png" alt="Rates of positive results across all quartiles" class="zoomable" data-zoomable>
  <figcaption>Exploratory abstract-level analysis: Rates of positive results across all four quartiles of scientific productivity. No significant differences emerge. Error bars indicate 95% confidence intervals.</figcaption>
</figure>

An exploratory finding: bottom-quartile groups used the word "significant" more often when describing their first hypothesis results (38% vs. 27%, $p = .048$).

### Discussion and implications

**For metascience**: We did not find evidence that scientific productivity at the research group level differentially explains the high rate of positive results. This contrasts with Fanelli's <d-cite key="fanelli2010pressures"></d-cite> macro-level finding and may suggest that the mechanisms involved operate at the individual or system-wide level rather than at the organizational level.

**For clinical psychology**: Approximately 9 in 10 studies supported their first hypothesis, with no difference by group productivity. Our observed rate of 89.67% is consistent with Fanelli <d-cite key="fanelli2010positive"></d-cite> (91.5%) but lower than Scheel et al. <d-cite key="scheel2021excess"></d-cite> (96.05%), possibly reflecting our broader inclusion criteria (all empirical studies, not just those explicitly "testing hypotheses").

**Implications**: Since productivity differences do not appear to account for positive result rates, discussions about reforms---such as registered reports <d-cite key="scheel2021excess"></d-cite> and preregistration <d-cite key="vandenakker2023preregistration"></d-cite>---may be more productively directed at system-wide rather than group-level factors.

If you find this work useful for your research, please consider citing our paper:

```bibtex
@article{schiekiera2025productivity,
  title={Does Scientific Productivity Increase the Publication
         of Positive Results?},
  author={Schiekiera, Louis and Niemeyer, Helen},
  journal={},
  year={2025}
}
```

📄 Read the paper (Collabra: Psychology) [here](https://online.ucpress.edu/collabra/article-pdf/11/1/137035/874484/collabra_2025_11_1_137035.pdf).

📝 View the preregistration on [OSF](https://osf.io/46fk9/files/osfstorage/65aea1a9b1f2b50389b0e3f3).

💻 View the code and data on [GitHub](https://github.com/schiekiera/collabra_2025).