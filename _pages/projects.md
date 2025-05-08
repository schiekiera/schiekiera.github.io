---
layout: page
title: projects
permalink: /projects/
nav: true
nav_order: 3
---

# Overview

This page contains a collection of projects I've worked on.

---

## In Bocca al Lupo – Italian Flashcard App

![In Bocca al Lupo App](https://schiekiera.github.io/assets/img/projects/inbocaallupo.jpg){: width="600"}

**In Bocca al Lupo** is a free, browser-based flashcard application designed to help learners efficiently master the 562 most commonly used Italian verbs. It incorporates English and German translations and employs spaced repetition alongside simple performance tracking to support effective vocabulary acquisition.

### Key Features
- Translation modes: Italian ↔ English or German
- Adaptive repetition based on user accuracy
- Performance tracking of challenging vocabulary
- Comprehensive session summaries with individual word statistics

🎯 [Try the app](https://inbocaallupo-9hvgzexhtsvwsanxjvfjd4.streamlit.app/)

---

### Open Source & Collaboration

Built with **Python and Streamlit**, the application is fully open source, welcoming contributions from developers.

📂 [View on GitHub](https://github.com/schiekiera/in_boca_al_lupo)

Fork the repository, submit pull requests, or give it a ⭐️ if you find it helpful.

---

## NegativeResultDetector: SciBERT Text Classification Model

![SciBERT Model Architecture](https://schiekiera.github.io/assets/img/publication_preview/scibert.png){: width="600"}

**NegativeResultDetector** is a text classification model based on SciBERT, developed to identify whether scientific abstracts in clinical psychology and psychotherapy report positive results exclusively or contain mixed/negative findings.

This model is featured in the publication "Classifying Positive Results in Clinical Psychology Using Natural Language Processing" by Louis Schiekiera, Jonathan Diederichs, and Helen Niemeyer, published in the ZfP special issue on Natural Language Processing in Psychology.

### Data and Methods
- Annotated dataset of over 1,900 clinical psychology abstracts categorized into:
  - Positive results only
  - Mixed or negative results
- Model validation performed on clinical psychology data and two psychotherapy datasets.

### Performance Metrics
- **Accuracy**: 86.4% on the test set
- **F1 Score**:
  - Mixed/negative results: 0.867
  - Positive results only: 0.830

### Model Usage on Hugging Face
Use the hosted inference API on [Hugging Face](https://huggingface.co/ClinicalMetaScience/NegativeResultDetector)
 by entering an abstract or testing provided examples.


📂 [View on GitHub](https://github.com/schiekiera/NegativeResultDetector)

---

## ShootingBias: MATLAB Psychtoolbox Implementation

![Shooter Task Example](https://www.frontiersin.org/files/Articles/483918/fpsyg-10-02140-HTML/image_m/fpsyg-10-02140-g001.jpg){: width="600"}

**ShootingBias** is a MATLAB Psychtoolbox implementation of the "shooter task," a well-established behavioral test used in social psychology to measure implicit racial bias (Correll et al., 2002; Essien et al., 2017).

### Background
The shooter bias refers to implicit biases revealed by participants’ reaction times and decisions to "shoot" or "not shoot" based on the perceived threat from individuals of different ethnic backgrounds. It assesses the influence of racial stereotypes on rapid decision-making.

### Experimental Design
This implementation replicates Essien et al. (2017) using a 2 × 2 repeated-measures design with two factors:

- **Target Ethnicity**: Arab-Muslim vs. White
- **Object Type**: Armed vs. Unarmed

### Hypotheses
- Reaction times will be faster for armed Arab-Muslim targets compared to armed White targets.
- Reaction times will be slower for unarmed Arab-Muslim targets compared to unarmed White targets.
- Participants will demonstrate greater liberal response bias toward Arab-Muslim targets.

### References
- Correll, J., Park, B., Judd, C. M., & Wittenbrink, B. (2002). *Journal of Personality and Social Psychology*, 83(6), 1314–1329.
- Essien, I., Stelter, M., Kalbe, F., Koehler, A., Mangels, J., & Meliß, S. (2017). *Journal of Experimental Social Psychology*, 70, 41–47.

📂 [View on GitHub](https://github.com/schiekiera/ShootingBias)

