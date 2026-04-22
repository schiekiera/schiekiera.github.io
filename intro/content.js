/* ------------------------------------------------------------------
 * Content for Louis Schiekiera's /intro/ page.
 * Edit this file to update the page — no HTML changes needed.
 * ------------------------------------------------------------------ */

const defined = {

  /* ---- Hero ---- */
  hero: {
    name: "Louis Schiekiera",
    subtitle: "Computational Cognitive Science",
    tagline:
      "Modeling meaning across humans and machines.",
    affiliations: [
      { abbr: "HU Berlin", url: "https://www.psychologie.hu-berlin.de/en/staff/1696407" },
      { abbr: "FU Berlin", url: "https://www.ewi-psy.fu-berlin.de/en/psychologie/arbeitsbereiche/klinisch_psychologische_intervention/mitarbeiter/lschiekiera/index.html" }
    ],
    siteUrl: "https://schiekiera.github.io",
    siteLabel: "schiekiera.github.io"
  },

  /* ---- About ---- */
  about: {
    bio:
    "I’m a computational scientist at the intersection of cognitive psychology and machine learning. By combining behavioral experiments with computational modeling, I study how meaning is represented across human minds and artificial systems. Currently, I work as a research assistant in the Computational Modeling Group at HU Berlin under the supervision of Fritz Günther.",
    photo: "/assets/img/ls.jpg",
    photoAlt: "Louis Schiekiera",
    roles: [
      {
        title: "Research Associate",
        org: "Computational Modeling Lab, HU Berlin",
        url: "https://www.psychologie.hu-berlin.de/en/staff/1696407"
      },
      {
        title: "PhD Candidate",
        org: "Division of Clinical Psychological Intervention, FU Berlin",
        url: "https://www.ewi-psy.fu-berlin.de/en/psychologie/arbeitsbereiche/klinisch_psychologische_intervention/mitarbeiter/lschiekiera/index.html"
      }
    ],
    education: [
      {
        degree: "PhD Psychology",
        inst: "Freie Universität Berlin",
        year: "2023-present",
        detail: "Focus: Publication bias, machine learning, statistics"
      },
      {
        degree: "M.Sc. Psychology",
        inst: "Universität Potsdam",
        year: "2021–2023",
        detail: "Focus: Statistics, machine learning, clinical psychology"
      },
      {
        degree: "B.Sc. Psychology",
        inst: "Universität Hamburg",
        year: "2018–2021",
        detail: "Focus: Statistics, clinical psychology"
      },
      {
        degree: "B.A. Sociology & Technology Studies",
        inst: "TU Berlin",
        year: "2014–2018",
        detail: "Minor: Human Factors Engineering"
      }
    ],
    experience: [
      {
        role: "Research Assistant",
        inst: "HU Berlin · Computational Modeling Lab",
        year: "2024–present",
        detail: "Computational modeling of language production; LLM interpretability"
      },
      {
        role: "Research Assistant",
        inst: "FU Berlin · Clinical Psychological Intervention",
        year: "2023–2024",
        detail: "Metascience of clinical psychology, publication bias"
      },
      {
        role: "Student Research Assistant",
        inst: "FU Berlin · Clinical Psychological Intervention",
        year: "2021–2023",
        detail: "Metascience of clinical psychology, publication bias"
      },
      {
        role: "Student Research Assistant",
        inst: "University of Hamburg · University Hospital Eppendorf",
        year: "2018–2021",
        detail: "Statistics, medical psychology, medical sociology"
      },
      {
        role: "Student Research Assistant",
        inst: "Technische Universität Berlin · General Sociology",
        year: "2018–2021",
        detail: "Phenomenology, sociology of knowledge"
      }
    ]
  },

  /* ---- Research focus ---- */
  research: {
    tldr:
      "My work connects cognitive science, language models, and metascience.",
 
    cards: [
      {
        icon: "fa-solid fa-diagram-project",
        name: "Computational Cognitive Modeling",
        desc:
          "Turning verbal psychological theories into runnable models grounded in distributional semantics. Current focus: the Swinging Lexical Network account of semantic context effects in language production."
      },
      {
        icon: "fa-solid fa-layer-group",
        name: "LLM Interpretability",
        desc:
          "Recovering hidden-state geometry from behavioral signals. Using representational similarity analysis to align layerwise activations with machine-derived semantic structure."
      },
      {
        icon: "fa-solid fa-comments",
        name: "Psycholinguistics",
        desc:
          "Studying the cognitive mechanisms of language production: how lexical cohorts compete, how semantic context facilitates or interferes, and how picture-naming paradigms expose the underlying geometry of the mental lexicon."
      },
      {
        icon: "fa-solid fa-flask",
        name: "Mega Studies",
        desc:
          "I am interested in planning and conducting large-scale behavioral studies. Currently, I am involved in the data collection for the German Lexicon Project."
      },
      {
        icon: "fa-solid fa-magnifying-glass-chart",
        name: "Publication Bias",
        desc:
          "Measuring and explaining the bias against statistically non-significant results in psychology. Combining within-subjects experiments, dual-process decision theory, and NLP-based field-scale analyses."
      },
      {
        icon: "fa-solid fa-scale-balanced",
        name: "Political Bias",
        desc:
          "I study how scholars' political orientations shape the evaluation and reception of scientific claims, and whether deliberation corrects it."
      }
    ]
  },



  /* ---- Selected work ---- */
  selectedWork: {
    tldr: "Recent works across my research areas.",
    allUrl: "https://schiekiera.github.io/publications/",
    items: [
      {
        tag: "Machine Psychology · 2026",
        title: "From Associations to Activations: Comparing Behavioral and Hidden-State Semantic Geometry in LLMs",
        venue: "Schiekiera, Zimmer, Roux, Pokutta & Günther · arXiv 2026",
        desc:
          "Across eight instruction-tuned transformer models, we run two psycholinguistic paradigms (forced choice & free association) over a shared 5,000-word vocabulary, collecting 17.5M+ trials. Using RSA, we show that forced-choice behavior aligns substantially more with hidden-state geometry than free association, and that behavior alone predicts unseen hidden-state similarities beyond lexical baselines.",
        preview: "/assets/img/publication_preview/neural_semantic.jpg",
        links: [
          { label: "PDF",   url: "https://arxiv.org/pdf/2602.00628" },
          { label: "arXiv", url: "https://arxiv.org/abs/2602.00628" },
          { label: "Code",  url: "https://github.com/schiekiera/llm-association-geometry" },
          { label: "Data",  url: "https://huggingface.co/datasets/schiekiera/llm-association-geometry" }
        ]
      },
      {
        tag: "NLP · 2024",
        title: "Classifying Positive Results Using NLP",
        venue: "Schiekiera, Niemeyer & Diederichs · Zeitschrift für Psychologie",
        desc:
          "Fine-tuned SciBERT on ~1,900 manually annotated abstracts, then scanned 20,000+ studies. SciBERT outperformed random-forest baselines in and out of domain; the trend analysis revealed a significant decrease in the share of exclusively positive results between 2005 and 2022.",
        preview: "/assets/img/publication_preview/attention.png",
        links: [
          { label: "PDF",  url: "https://refubium.fu-berlin.de/bitstream/handle/fub188/45033/schiekiera-et-al-2024-classifying-positive-results-in-clinical-psychology-using-natural-language-processing.pdf?sequence=1&isAllowed=y" },
          { label: "Code", url: "https://github.com/schiekiera/NegativeResultDetector" }
        ]
      },
      {
        tag: "Metascience · 2025",
        title: "Publication Bias in Psychological Science",
        venue: "Schiekiera et al. · Advances in Methods and Practices in Psychological Science & Collabra Psychology",
        desc:
          "A within-subjects study grounded in dual-process decision-making: 303 psychology researchers evaluated fictitious abstracts varying in statistical significance and hypothesis consistency. Significant results were systematically favored; intuitive judgments were rarely revised, and feeling-of-rightness did not predict revision.",
        preview: "/assets/img/publication_preview/ampps_bias.png",
        links: [
          { label: "PDF",  url: "https://journals.sagepub.com/doi/epub/10.1177/25152459251372134" },
          { label: "Code", url: "https://github.com/schiekiera/metascience_experiment_psychology" }
        ]
      },
      {
        tag: "Computational Cognitive Modeling · In progress",
        title: "Swinging Lexical Network — a computational implementation",
        venue: "With Abdel Rahman & Günther · HU Berlin",
        desc:
          "Work in progress: Turning a verbal cognitive theory into a runnable model: distributional semantics as semantic memory, Kintsch's construction–integration algorithm for cohort co-activation, parameter estimation from published context-effect studies, and empirical validation in new picture-naming experiments.",
        preview: "/assets/img/publication_preview/csln.png",
          links: [
          { label: "DFG page", url: "https://gepris.dfg.de/gepris/projekt/532390335?language=en" }
        ]
      },
      {
        tag: "Mega Study · in progress",
        title: "German Lexicon Project",
        venue: "Multi-lab collaboration · 30+ participating labs",
        desc:
          "A large-scale mega study collecting lexical-decision data for a broad sample of German words across more than 30 labs in Germany, Austria, Switzerland, Italy, and the Netherlands. I co-coordinate the data collection and built an automated monitoring pipeline that tracks per-lab progress toward the target of 2,453 participants in near real time.",
        preview: "/assets/img/publication_preview/glp.png",
        links: [
          { label: "GitHub", url: "https://github.com/schiekiera/German_Lexicon_Multilab_Monitoring" }
        ]
      }
    ]
  },

  /* ---- Blog ---- */
  blog: {
    tldr: "Short notes on language models, cognition, and the science of science.",
    allUrl: "https://schiekiera.github.io/blog/",
    items: [
      {
        tag: "Machine Psychology",
        title: "From Associations to Activations",
        desc: "How behavioral similarity judgments predict hidden-state geometry in instruction-tuned LLMs.",
        date: "Feb 2026",
        url: "https://schiekiera.github.io/blog/2026/neural-semantic-geometry/"
      },
      {
        tag: "Research Methods",
        title: " Automating Validation of Verbal Responses",
        desc: "A pipeline for the automated validation of verbal responses in word-production experiments in psycholinguistics.",
        date: "2026",
        url: "https://schiekiera.github.io/blog/"
      },
      {
        tag: "Metascience",
        title: "Publication Bias in Decision-Making",
        desc: "A dual-process theory informed within-subjects experiment on biases in academic decision-making.",
        date: "Sep 2025",
        url: "https://schiekiera.github.io/blog/2025/publication-bias-decision-making/"
      },
      {
        tag: "NLP for Science",
        title: "SciBERT for Positive Results",
        desc: "Fine-tuning SciBERT to classify positive vs. mixed/negative results in psychotherapy abstracts.",
        date: "2024",
        url: "https://schiekiera.github.io/blog/2024/classifying-positive-results/"
      },
      {
        tag: "Metascience",
        title: "Political Bias in Historical Research",
        desc: "Historians preferred abstracts matching their political orientation and deliberation didn't correct it.",
        date: "May 2025",
        url: "https://schiekiera.github.io/blog/2025/political-bias-historiography/"
      },
      {
        tag: "Clinical Psychology",
        title: "Scientific Productivity and Positive Results",
        desc: "High prevalence of positive results in clinical psychology, but no evidence for higher positive results rates as a function of scientific productivity.",
        date: "May 2025",
        url: "https://schiekiera.github.io/blog/2025/scientific-productivity-positive-results/"
      }
    ]
  },

  /* ---- Footer ---- */
  footer: {
    links: [
      { label: "Home",         url: "https://schiekiera.github.io/" },
      { label: "Publications", url: "https://schiekiera.github.io/publications/" },
      { label: "CV",           url: "https://schiekiera.github.io/cv/" },
      { label: "Blog",         url: "https://schiekiera.github.io/blog/" }
    ],
    social: [
      { icon: "fa-solid fa-envelope",   label: "Email",        url: "mailto:louis.schiekiera@hu-berlin.de" },
      { icon: "fa-brands fa-github",    label: "GitHub",       url: "https://github.com/schiekiera" },
      { icon: "fa-brands fa-x-twitter", label: "X / Twitter",  url: "https://twitter.com/LJS_Berlin" },
      { icon: "fa-brands fa-linkedin",  label: "LinkedIn",     url: "https://www.linkedin.com/in/louis-schiekiera" },
      { icon: "fa-brands fa-orcid",     label: "ORCID",        url: "https://orcid.org/0000-0003-0082-175X" }
    ],
    meta: "© Louis Schiekiera · Berlin"
  }
};
