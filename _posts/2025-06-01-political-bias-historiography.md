---
layout: distill
title: "Is Partisan Bias Present in Historical Research?"
date: 2025-06-01
description: "Our paper in <b>F1000Research</b> investigates whether historians prefer contemporary history abstracts that align with their political orientation. In an online experiment, 75 historians evaluated 17 fictitious abstract pairs varying in political stance. We find a significant interaction: left-leaning historians prefer progressive abstracts, right-leaning historians prefer conservative ones, and moderate historians show no preference. Deliberation does not diminish this bias."
tags: [metascience, political-bias, historiography, decision-making]
thumbnail: /assets/img/blog/political_bias/Figure_4_ILoS_Main_Results.png
bibliography: political_bias.bib
publication_type: "Journal Article"
paper_url: "https://doi.org/10.12688/f1000research.157553.1"
giscus_comments: false
related_posts: false
toc:
  - name: "Motivation: Political preferences in science"
  - name: "Method: A within-subjects experiment with historians"
    subsections:
      - name: "Experimental design"
      - name: "Two-response paradigm"
  - name: "Results"
    subsections:
      - name: "Political stance shapes publishability judgments"
      - name: "Deliberation does not reduce bias"
  - name: "Discussion and implications"
authors:
  - name: Louis Schiekiera
    affiliations:
      name: FU Berlin & HU Berlin
  - name: Helen Niemeyer
    affiliations:
      name: FU Berlin
---

**📄 [Paper (F1000Research)](https://doi.org/10.12688/f1000research.157553.1)** | **📝 [Preregistration (OSF)](https://doi.org/10.17605/OSF.IO/QCDV8)** | **💻 [Code & Data (GitHub)](https://github.com/schiekiera/metascience_experiment_history)**

### Motivation: Political preferences in science

In quantitative research, publication bias---the selective publication of studies based on factors other than research quality---is well documented <d-cite key="fanelli2010positive"></d-cite> <d-cite key="Fanelli2011"></d-cite>. But what about disciplines where results are not framed in terms of statistical significance? In historiography, scholars have long discussed how cultural, social, and political backgrounds shape the selection of topics, methods, and interpretations <d-cite key="mccullagh2000bias"></d-cite>. Yet experimental evidence on how political orientation influences historians' publication decisions has been virtually absent.

A classic survey by Kimball <d-cite key="kimball1984influence"></d-cite> found strong correlations between historians' ideological standpoints and their explanations of historical events. The only experimental study in this space---by Abramowitz and colleagues <d-cite key="abramowitz1975publish"></d-cite> in psychology---showed that reviewers' political orientation influenced their publication decisions, but it used only a single manuscript. We extend this work to historiography with a **within-subjects design** and **17 stimulus pairs**, allowing us to isolate the effect of political stance while controlling for abstract-specific characteristics.

### Method: A within-subjects experiment with historians

#### Experimental design

We recruited 75 historians globally (from 7,063 contacted) to evaluate **17 fictitious contemporary history abstracts** in an online experiment. Each abstract existed in two versions---progressive and conservative---that were identical except for the political framing. Each participant saw one version of each pair (9 progressive, 8 conservative), presented in randomized order.

<figure class="post-figure">
  <img src="/assets/img/blog/political_bias/Figure_1_Flowchart_Procedure.png" alt="Experimental procedure flowchart" class="zoomable" data-zoomable>
  <figcaption>Experimental procedure. Participants read instructions, then evaluated 17 abstracts using a two-response paradigm (intuitive response, Feeling of Rightness rating, considered response), followed by questionnaires on political orientation and demographics.</figcaption>
</figure>

#### Two-response paradigm

Drawing on Dual Process Theory <d-cite key="kahneman2003perspective"></d-cite> <d-cite key="thompson2011intuition"></d-cite>, we used a **two-response procedure**: participants first gave a fast, intuitive rating of publishability (Type 1 processing), then rated their Feeling of Rightness (FOR), and finally provided a considered re-evaluation (Type 2 processing). This allowed us to test whether deliberation attenuates political preferences.

Political orientation was measured on a 7-point left-right scale <d-cite key="inbar2012political"></d-cite>. Our sample was 75% left-leaning, 13% moderate, and 12% right-leaning---consistent with distributions found in other academic disciplines.

### Results

#### Political stance shapes publishability judgments

We found a **significant interaction** between an abstract's political stance and a historian's political orientation ($b = 1.82$, $p < .001$). Right-leaning historians rated conservative abstracts higher (ILoS = 65.6) than progressive ones (57.2), left-leaning historians rated conservative abstracts lower (52.1) than progressive ones (57.5), and moderates showed no preference.

Overall, progressive abstracts were rated 3.07% more favorably---reflecting the predominantly left-leaning composition of our sample.

<figure class="post-figure">
  <img src="/assets/img/blog/political_bias/Figure_4_ILoS_Main_Results.png" alt="ILoS results by political orientation" class="zoomable" data-zoomable>
  <figcaption>Intuitive Likelihood of Submitting for publication (ILoS) as a function of political orientation and abstract political stance. Right-leaning historians prefer conservative abstracts; left-leaning historians prefer progressive ones; moderates show no preference.</figcaption>
</figure>

<figure class="post-figure">
  <img src="/assets/img/blog/political_bias/Figure_2_Descriptive_Responses_Combined.png" alt="Descriptive response distributions" class="zoomable" data-zoomable>
  <figcaption>Distributions of reading times, response variables, and Feeling of Rightness ratings across all trials.</figcaption>
</figure>

#### Deliberation does not reduce bias

Contrary to our expectation, the Type 2 (considered) responses did not significantly differ from the Type 1 (intuitive) responses. The interaction of political stance and political orientation on response change ($\Delta$LoS) was not significant ($b = 0.11$, $p = .547$). Even when given time to reflect, historians did not revise their politically influenced judgments.

Feeling of Rightness was likewise unaffected by political congruence ($b = 0.02$, $p = .334$), suggesting that political preferences in this context do not trigger the metacognitive conflict that typically prompts re-evaluation in logical reasoning tasks.

<figure class="post-figure">
  <img src="/assets/img/blog/political_bias/Figure_3_Descriptive_Responses_Political_Scale.png" alt="Political orientation distribution" class="zoomable" data-zoomable>
  <figcaption>Distribution of participants' self-reported political orientation on a 7-point left-right scale.</figcaption>
</figure>

### Discussion and implications

**For metascience**: Our findings indicate that political preferences are associated with publication decisions in historiography---a domain where such biases are discussed theoretically but have rarely been tested experimentally. Deliberation did not attenuate this effect in our data <d-cite key="duarte2015political"></d-cite> <d-cite key="clark2023prosocial"></d-cite>.

**For historiography**: If publishability ratings depend partly on political preferences, this could affect which perspectives are more or less likely to be submitted for publication. This parallels the file drawer problem in quantitative science but operates through political rather than statistical dimensions.

**Broader relevance**: Our study can be viewed as a case study focused on historians; such political preferences are likely relevant in other academic disciplines and should be investigated further <d-cite key="ditto2019partisan"></d-cite>.

If you find this work useful for your research, please consider citing our paper:

```bibtex
@article{schiekiera2025partisan,
  title={Is Partisan Bias Present in Historiography? An Experimental
         Investigation of Preferences for Publication as a Function
         of Political Orientation},
  author={Schiekiera, Louis and Niemeyer, Helen},
  journal={F1000Research},
  year={2025}
}
```

📄 Read the paper [here](https://doi.org/10.12688/f1000research.157553.1)

📝 View the preregistration on [OSF](https://doi.org/10.17605/OSF.IO/QCDV8)

💻 View the code and data on [GitHub](https://github.com/schiekiera/metascience_experiment_history)
