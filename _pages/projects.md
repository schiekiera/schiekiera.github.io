---
layout: page
title: projects
permalink: /projects/
nav: true
nav_order: 3
---

# In Bocca al Lupo – Italian Flashcard App

<img src="https://schiekiera.github.io/assets/img/projects/inbocaallupo.jpg" alt="In Bocca al Lupo App" width="600">

**In Bocca al Lupo** is a free, browser-based flashcard app designed to help learners master the 562 most common Italian verbs. It supports both English and German translations, and uses simple tracking and spaced repetition to reinforce difficult vocabulary.

## Key Features
- Italian ↔ English / German
- Smart tracking of correct/incorrect answers
- Repeats challenging words automatically
- Session summary with word-level stats

🎯 [Try the app](https://inbocaallupo-9hvgzexhtsvwsanxjvfjd4.streamlit.app/)

---

### Open Source & Developer Friendly

Built with **Python + Streamlit**, the project is fully open source and open to collaboration.

📂 [View on GitHub](https://github.com/schiekiera/in_boca_al_lupo)

Fork the repo, contribute via PR, or give it a ⭐️ if you find it useful.

---

# NegativeResultDetector: SciBERT Text Classification Model

<img src="https://schiekiera.github.io/assets/img/publication_preview/scibert.png" alt="SciBERT Model Architecture" width="600">

**SciBERT text classification model for positive and negative results prediction in scientific abstracts of clinical psychology and psychotherapy.**

The corresponding paper "Classifying Positive Results in Clinical Psychology Using Natural Language Processing" by Louis Schiekiera, Jonathan Diederichs & Helen Niemeyer was published in the special issue Natural Language Processing in Psychology in ZfP.

## Data
We annotated over 1,900 clinical psychology abstracts into two categories: 'positive results only' and 'mixed or negative results', and trained models using SciBERT. The SciBERT model was validated against one in-domain (clinical psychology) and two out-of-domain data sets (psychotherapy).

## Results
- **Accuracy**: SciBERT achieved an accuracy of 0.864 on the test data.
- **F1 Score**: 0.867 for mixed & negative results, 0.830 for positive results only.

## Using the Model on Hugging Face
The model can be used on Hugging Face utilizing the "Hosted inference API". Click 'Compute' to predict the class labels for an example abstract or an abstract inserted by yourself.

## Using the Model for Larger Data
```python
from transformers import AutoTokenizer, Trainer, AutoModelForSequenceClassification

# 1. Load tokenizer
tokenizer = AutoTokenizer.from_pretrained('allenai/scibert_scivocab_uncased')

# 2. Apply preprocess function to data
def preprocess_function(examples):
    return tokenizer(examples["text"], truncation=True, max_length=512, padding='max_length')

tokenized_data = dataset.map(preprocess_function, batched=True)

# 3. Load Model
NegativeResultDetector = AutoModelForSequenceClassification.from_pretrained("ClinicalMetaScience/NegativeResultDetector")

# 4. Initialize the trainer with the model and tokenizer
trainer = Trainer(model=NegativeResultDetector, tokenizer=tokenizer)

# 5. Apply NegativeResultDetector for prediction on inference data
predict_test = trainer.predict(tokenized_data["inference"])
```


📂 [View on GitHub](https://github.com/schiekiera/NegativeResultDetector)

---

# ShootingBias: MATLAB's Psychtoolbox Implementation

<img src="https://www.frontiersin.org/files/Articles/483918/fpsyg-10-02140-HTML/image_m/fpsyg-10-02140-g001.jpg" alt="Shooter Task Figure" width="600">

**MATLAB's Psychtoolbox Implementation of the shooter task.** The shooter task is a famous social-psychological behavioral test for measuring implicit racial bias (Correll et al., 2002; Essien et al., 2017).

## Background: What is the Shooter Bias?
The shooter bias is a phenomenon observed in social psychology research that refers to the tendency for individuals to exhibit a bias in their decision-making and response times when faced with potentially threatening situations. Specifically, it investigates people's implicit racial or ethnic stereotypes.

In the shooter bias task, participants are typically presented with images or videos of individuals holding objects, some of which are weapons and others are harmless. Participants must quickly decide whether to shoot or not shoot based on their perception of threat.

## Experiment Description
In this replication of the experiment by Essien et al. (2017), participants perform the shooter task with unarmed and armed White and Arab-Muslim targets. The design is a 2 x 2 with repeated measures, involving "Target Ethnicity" and "Object Type" as factors.

## Hypotheses
- Reaction times are expected to be faster for armed Arab-Muslim targets compared to armed White targets.
- Reaction times are expected to be slower for unarmed Arab-Muslim targets compared to unarmed White targets.
- Participants show more liberal response biases for Arab-Muslim targets compared to White targets.

## References
- Correll, J., Park, B., Judd, C. M., & Wittenbrink, B. (2002). The police officer's dilemma: using ethnicity to disambiguate potentially threatening individuals. Journal of personality and social psychology, 83(6), 1314.
- Essien, I., Stelter, M., Kalbe, F., Koehler, A., Mangels, J., & Meliß, S. (2017). The shooter bias: Replicating the classic effect and introducing a novel paradigm. Journal of Experimental Social Psychology, 70, 41-47.

📂 [View on GitHub](https://github.com/schiekiera/ShootingBias)

