const resume = {
  "headline": "Neural Engineering · Neural Signal Acquisition & Decoding",
  "location": "Greater St. Louis, IL",
  "phone": "618-498-6176",
  "updated": "September 2026",
  "education": {
    "school": "University of Illinois Urbana-Champaign",
    "degree": "B.S. Neural Engineering, Minor in Computer Science",
    "detail": "Expected May 2027",
    "honors": [
      "GPA 4.00 / 4.00",
      "Chancellor's Scholar",
      "Dean's List"
    ],
    "coursework": "Neural Cell/Tissue Engineering & Lab, Applied Machine Learning, Neural Data Analysis, Neuroimaging, Data Structures, Soft Robotics, Neural Circuits and Systems, Signals and Systems in Bioengineering, Neural Interface Engineering (Spring 2027)"
  },
  "projects": [
    {
      "slug": "cortical-neuron-mea",
      "title": "Cortical Neuron Signal Analysis via 3Brain MEA",
      "organization": "University of Illinois Urbana-Champaign",
      "date": "May 2026 – Present",
      "bullets": [
        "Culture cortical neurons and record extracellular neural activity using a high-density 3Brain microelectrode array (MEA) system.",
        "Develop analysis workflows for recorded neuronal activity to characterize signals and evaluate experimental recordings.",
        "Work across cell culture, electrophysiological recording, and computational analysis to connect experimental measurements with neural engineering questions."
      ],
      "tags": [
        "MEA electrophysiology",
        "cell culture",
        "signal analysis"
      ]
    },
    {
      "slug": "emg-hand-control",
      "title": "EMG-Based Hand Tracking and Computer Control",
      "organization": "Personal Project",
      "date": "May 2026 – Present",
      "bullets": [
        "Building a continuous-regression system that maps surface EMG signals to hand degrees of freedom for real-time computer input, rather than discrete gesture classification.",
        "Built a 4-channel acquisition system using BioAmp EXG Pill sensors and an Arduino Uno R4 Minima, achieving ~6.4 kHz aggregate sampling over wired USB.",
        "Developed a multi-threaded Python acquisition pipeline with real-time visualization, RMS-based detection, hysteresis/cooldown logic, and artifact characterization — diagnosing motion artifacts and floating-pin crosstalk.",
        "Completed continuous regression in Phase 1 with two ground-truth methods: a moving visual bar that participants followed while opening and closing their hand, and time-aligned MediaPipe webcam hand tracking that let them move at their own pace. Regression approaches include Ridge Regression / MLP models.",
        "Currently designing a custom PCB to expand channel count ahead of a Phase 2 upgrade (ADS1299 analog front-end + Teensy 4.0), exploring source separation to extract additional useful signal components."
      ],
      "tags": [
        "surface EMG",
        "embedded acquisition",
        "PCB design",
        "regression models"
      ]
    },
    {
      "slug": "slim-phenotyping",
      "title": "Label-Free Cytoarchitectural Phenotyping via SLIM",
      "organization": "Beckman Institute · Dr. Catherine Best-Popescu",
      "date": "Aug 2025 – Present",
      "bullets": [
        "Selected for the Grainger College of Engineering Illinois Scholars Undergraduate Research (ISUR) Program; presented findings at the UIUC Undergraduate Research Symposium.",
        "Developed a label-free PICS/QPI framework to classify viable, apoptotic, and dead cells from Spatial Light Interference Microscopy (SLIM) phase maps, analyzing approximately 12,000 CHO cells.",
        "Trained an E-U-Net deep learning model for three-class viability classification and extracted morphology, optical density, dry mass, and edge-core features for quantitative cell characterization.",
        "Built automated segmentation and feature-extraction pipelines integrating SLIM phase-map acquisition with downstream classification workflows."
      ],
      "tags": [
        "quantitative phase imaging",
        "deep learning",
        "cell classification"
      ]
    },
    {
      "slug": "eeg-fmri",
      "title": "EEG-to-fMRI Brain Activation Prediction",
      "organization": "NE 422 — Neuroimaging",
      "date": "Spring 2026",
      "bullets": [
        "The team developed and compared EEGNet+MLP, EEGNet+U-Net, and cross-modal Transformer architectures to predict fMRI activation maps from simultaneous EEG, using a public dataset spanning 17 subjects and 6 motor tasks.",
        "The team designed a cross-modal Transformer with voxel positional embeddings and cross-attention, achieving Pearson r = 0.291 and SSIM = 0.443.",
        "I implemented preprocessing and the EEGNet+MLP and EEGNet+U-Net models. The multimodal preprocessing pipelines covered 63-channel EEG and 4D fMRI, including filtering, bad-channel removal, re-referencing, GLM contrast estimation, motion correction, and spatial normalization."
      ],
      "tags": [
        "PyTorch",
        "Transformers",
        "multimodal neuroimaging"
      ]
    },
    {
      "slug": "stroke-classification",
      "title": "EEG-Based Motor Impairment Classification in Stroke Rehabilitation",
      "organization": "NE 412 — Neural Data Analysis",
      "date": "Spring 2026",
      "bullets": [
        "Collaborated across every part of the NE 412 team project, classifying stroke survivors versus healthy controls and motor task demand from an existing EEG dataset of 21 subjects using logistic regression and random forest classifiers.",
        "Engineered PSD, coherence, imaginary coherence, and phase-lag features from sensorimotor EEG channels; applied ICA artifact removal, filtering, epoch rejection, and subject-level cross-validation.",
        "Achieved a best stroke-vs.-control accuracy of 0.695 using PSD + phase-lag features with random forest."
      ],
      "tags": [
        "MNE-Python",
        "feature engineering",
        "classification"
      ]
    },
    {
      "slug": "openinteraction",
      "title": "OpenInteraction — Eye/Head Tracking Desktop Control System",
      "organization": "NeuroHack · Winner",
      "date": "Nov 2025",
      "bullets": [
        "The team designed a real-time, hands-free computer interface combining ML-based gaze estimation, head-pose tracking, signal preprocessing, and classification for users with motor impairments.",
        "The team built a Python implementation using OpenCV and PyQt5, with stabilization/filtering pipelines and custom gesture handlers for cursor control and assistive input emulation. I implemented backend control methods and overlays."
      ],
      "tags": [
        "computer vision",
        "assistive tech",
        "real-time systems"
      ]
    },
    {
      "slug": "neural-prosthetic",
      "title": "EEG/EMG Controlled Prosthetic",
      "organization": "Universum / Second Chance Innovations",
      "date": "Feb 2024 – Oct 2025",
      "bullets": [
        "Helped to design a neuro-controlled soft robotic prosthetic system for motor rehabilitation, integrating neural signal processing with embedded actuation hardware in a closed-loop prototype.",
        "Built and tested a soft actuator prototype and presented results at the UIUC Undergraduate Research Symposium.",
      ],
      "tags": [
        "soft robotics",
        "closed-loop control"
      ]
    }
  ],
  "skills": [
    {
      "title": "Programming",
      "detail": "Python, C++, MATLAB"
    },
    {
      "title": "Libraries / Tools",
      "detail": "Git, NumPy, PyTorch, scikit-learn, OpenCV, PyQt5, MNE-Python, Arduino"
    },
    {
      "title": "Engineering & Data",
      "detail": "EEG/EMG signal acquisition and processing, neuroimaging analysis, machine learning, deep learning, electrophysiology, microscopy imaging, mammalian cell culture, tissue engineering, biomaterials, histology, sterile technique, neural interface design (in progress)"
    }
  ],
  "experience": [
    {
      "title": "Bayer Crop Science — Research Assistant",
      "location": "Jerseyville, IL",
      "date": "May 2025 – Aug 2025",
      "description": "Collected field data on corn and soybean growth as part of ongoing agricultural research trials, supporting accurate and consistent experimental measurements."
    }
  ]
}

export default resume
