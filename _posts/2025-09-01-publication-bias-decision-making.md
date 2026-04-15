---
layout: distill
title: "Publication Bias in Academic Decision Making in Clinical Psychology"
date: 2025-09-01
description: "Our registered report in <b>Advances in Methods and Practices in Psychological Science</b> experimentally tests how statistical significance and hypothesis-consistency influence clinical psychologists' decisions to submit, read, and cite research. Across four within-subjects experiments with 303 researchers, we find a consistent preference for statistically significant abstracts, but no effect of hypothesis-consistency. Deliberation does not attenuate the bias."
tags: [metascience, publication-bias, decision-making, dual-process-theory]
thumbnail: /assets/img/blog/publication_bias_decision_making/figure3.png
bibliography: publication_bias_decision_making.bib
publication_type: "Journal Article"
paper_url: "https://doi.org/10.1177/25152459251338393"
giscus_comments: false
related_posts: false
toc:
  - name: "Motivation: Why do positive results dominate?"
  - name: "Method: Four within-subjects experiments"
    subsections:
      - name: "Experimental design and two-response paradigm"
      - name: "Participants and materials"
  - name: "Results"
    subsections:
      - name: "Statistical significance reduces publishability, readability, and citability"
      - name: "Hypothesis-consistency has no effect"
      - name: "Deliberation and Feeling of Rightness"
  - name: "Discussion and implications"
authors:
  - name: Louis Schiekiera
    affiliations:
      name: FU Berlin & HU Berlin
  - name: Kristina Eichel
    affiliations:
      name: University of Greifswald
  - name: Jacqueline Sachse
    affiliations:
      name: HU Berlin
  - name: Sophie P. Müller
    affiliations:
      name: HU Berlin
  - name: Felicitas Heßelmann
    affiliations:
      name: German Center for Higher Education and Science Studies
  - name: Helen Niemeyer
    affiliations:
      name: FU Berlin
---

**📄  [Paper (AMPPS)](https://doi.org/10.1177/25152459251338393)** | **📝 [Preregistration (OSF)](https://osf.io/6tpm7)** | **💻  [Code & Data (GitHub)](https://github.com/schiekiera/metascience_experiment_history)**

### Motivation: Why do positive results dominate?

Over 60 years ago, Sterling <d-cite key="sterling1959publication"></d-cite> documented a publication bias toward statistically significant findings in psychology journals. Since then, reviews have consistently shown that significant and hypothesis-consistent results are more likely to be published <d-cite key="fanelli2011negative"></d-cite> <d-cite key="scheel2021excess"></d-cite>. But where exactly does this bias enter the research pipeline? Greenwald <d-cite key="greenwald1975consequences"></d-cite> identified four choice points: hypothesis formulation, data collection, results evaluation, and editorial judgment.

Previous experimental studies produced mixed evidence---some found preferences for positive results <d-cite key="mahoney1977publication"></d-cite>, others did not <d-cite key="elson2020metascience"></d-cite> <d-cite key="augusteijn2023quality"></d-cite>. Critically, all used **between-subjects** designs with a single stimulus, limiting generalizability. The one exception, Chopra et al. <d-cite key="chopra2022null"></d-cite>, used a within-subjects design in economics and found a significant null result penalty.

We address three gaps: **(A)** within-subjects experiments on publication bias in psychology, **(B)** experimental research on non-reception (reading and citing), and **(C)** the role of decision-making processes, drawing on Dual Process Theory <d-cite key="kahneman2003perspective"></d-cite> <d-cite key="thompson2011intuition"></d-cite>.

<figure class="post-figure">
  <img src="/assets/img/blog/publication_bias_decision_making/figure1.png" alt="Hypothesized relationships between variables" class="zoomable" data-zoomable>
  <figcaption>Hypothesized relationships. Left: Direct effect of the treatment (statistical significance or hypothesis-consistency) on intuitive responses (LoSRC = Likelihood of Submission, Reading or Citing). Right: Mediation model where Feeling of Rightness (FOR) mediates the effect of treatment on response change between intuitive and considered evaluations (C-LoSRC = Considered Likelihood of Submission, Reading or Citing).</figcaption>
</figure>

### Method: Four within-subjects experiments

#### Experimental design and two-response paradigm

We conducted **four online experiments** with clinical psychology researchers ($n = 303$ total, ~75 per experiment). In each experiment, participants evaluated **16 fictitious abstracts** (from 16 pairs) using a two-response paradigm:

1. **Stage 1 (intuitive)**: Fast, gut-feeling evaluation of the abstract
2. **Feeling of Rightness**: How confident they felt about the initial response
3. **Stage 2 (considered)**: Deliberate re-evaluation with unlimited time

Experiments 1 and 2 assessed **publishability** (statistical significance and hypothesis-consistency, respectively). Experiments 3 and 4 assessed **reading and citation likelihood**.

<figure class="post-figure">
  <img src="/assets/img/blog/publication_bias_decision_making/figure2.png" alt="Experimental procedure" class="zoomable" data-zoomable>
  <figcaption>Experimental procedure for all four experiments. Participants read instructions, evaluated 16 abstracts using the two-response paradigm, and completed sociodemographic and professional questionnaires.</figcaption>
</figure>

#### Participants and materials

We contacted 33,924 clinical psychology researchers globally; 303 completed the study (1.0% completion rate). Participants were 58% female, 40% male; 27% pre-doctoral, 29% post-doctoral, and 44% professors, from 40+ countries.

The 64 abstract pairs were carefully constructed to be identical except for the experimentally varied result section (significant vs. non-significant, or hypothesis-consistent vs. hypothesis-inconsistent). Participants were explicitly told to assume all studies had sufficient statistical power.

### Results

#### Statistical significance reduces publishability, readability, and citability

Across all experiments involving statistical significance, non-significant abstracts were consistently rated lower:

- **Publishability** (Exp. 1): $b = -6.49$, $p < .001$
- **Reading likelihood** (Exp. 3): $b = -7.14$, $p < .001$
- **Citation likelihood** (Exp. 3): $b = -6.32$, $p < .001$

<figure class="post-figure">
  <img src="/assets/img/blog/publication_bias_decision_making/figure4.png" alt="Main results across experiments" class="zoomable" data-zoomable>
  <figcaption>Treatment effects across all four experiments. Statistical significance consistently reduces the likelihood of submission, reading, and citation. Hypothesis-consistency shows no significant effect in any experiment.</figcaption>
</figure>

#### Hypothesis-consistency has no effect

Whether an abstract's results were consistent or inconsistent with its hypothesis had **no detectable effect** on any outcome:

- Publishability (Exp. 2): $b = -1.21$, $p = .303$
- Reading (Exp. 4): $b = -1.29$, $p = .281$
- Citation (Exp. 4): $b = -1.44$, $p = .222$

#### Deliberation and Feeling of Rightness

In most experiments, initial intuitive evaluations were **not revised** after deliberation. FOR did not systematically mediate response changes. One exception: in Experiment 1, non-significant abstracts lowered FOR ($b = -0.16$, $p = .006$), but higher FOR unexpectedly predicted _more_ positive revision---contrary to our hypothesis.

### Discussion and implications

**For metascience**: Our within-subjects design provides experimental evidence that statistical significance---but not hypothesis-consistency---is associated with researchers' evaluations of abstracts for publication, reading, and citation. Effect sizes were small (1--2% of variance), reflecting the multifactorial nature of these decisions, but the pattern was consistent across four experiments.

**For decision-making research**: The two-response paradigm revealed that deliberation does not attenuate the significance bias. This suggests that the preference for significant results operates as a persistent heuristic rather than a correctable first impression.

**For clinical psychology**: If non-significant findings are less likely to be read and cited <d-cite key="tackett2019replication"></d-cite>, this could affect the composition of the evidence base that informs treatment evaluation.

**Limitations**: This is a controlled vignette study; how strongly these patterns translate into real-world publication outcomes with actual manuscripts and real incentives remains to be tested in field experiments.

### Citation
If you find this work useful for your research, please consider citing our paper:

```bibtex
@article{schiekiera2025publication,
  title={Publication Bias in Academic Decision Making
         in Clinical Psychology},
  author={Schiekiera, Louis and Eichel, Kristina and Sachse,
          Jacqueline and M{\"u}ller, Sophie P. and He{\ss}elmann,
          Felicitas and Niemeyer, Helen},
  journal={Advances in Methods and Practices in Psychological Science},
  year={2025}
}
```

### Links
📄 Read the paper [here](https://doi.org/10.1177/25152459251338393).

📝 View the preregistration on [OSF](https://osf.io/6tpm7).

💻 View the code and data on [GitHub](https://github.com/schiekiera/metascience_experiment_history).
