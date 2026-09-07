// Case studies are ordered here; media paths are relative to public/.
const projects = [
  {
    "slug": "emg-hand-control",
    "showListImage": false,
    "teamSize": 2,
    "status": "active",
    "title": "EMG-Based Hand Tracking & Computer Control",
    "shortTitle": "EMG",
    "type": "Personal Project",
    "year": "2026–Present",
    "description": "Built a four-channel surface EMG pipeline with time-aligned MediaPipe hand tracking and continuous regression. Now developing a custom ADS1299 acquisition board for the next phase of signal analysis.",
    "tags": [
      "EMG",
      "Python",
      "Arduino",
      "Machine Learning"
    ],
    "image": "/images/emg/data-collection.jpg",
    "heroImage": "/images/emg/data-collection.jpg",
    "imageCrop": {
      "x": 0,
      "y": 16,
      "width": 1600,
      "height": 1181,
      "sourceWidth": 1600,
      "sourceHeight": 1197
    },
    "github": null,
    "demo": null,
    "imageAlt": "EMG recording session with forearm electrodes and MediaPipe hand landmarks overlaid on the webcam view",
    "imageFit": "contain",
    "heroCaption": "EMG and webcam hand-tracking data collection.",
    "tone": "blue",
    "featured": true,
    "sections": [
      {
        "type": "text",
        "title": "Continuous input from muscle activity",
        "content": [
          "This project explores a continuous path from forearm muscle activity to mouse and gamepad axes. Inspired by CTRL-labs’ neural interface work, the goal is to estimate hand degrees of freedom rather than map a handful of gestures to discrete commands.",
          "I approached the project in two stages: first build an acquisition and regression pipeline on accessible hardware, then develop a custom board to explore richer signal representations. Along the way, I’m learning electronics and PCB design from the ground up through datasheets, KiCad, and bench validation."
        ]
      },
      {
        "type": "text",
        "title": "Phase 1 / Acquisition, hand tracking, and regression",
        "content": [
          "I started with four BioAmp Candy EMG sensors connected to an Arduino Uno R4 Minima over wired USB. The sensors have a specified gain of ×2420 and a 72–720 Hz analog bandpass. Differential electrodes were placed approximately 2 cm apart along the target forearm muscle, with the reference at the elbow.",
          "The first software milestone was a threaded Python acquisition pipeline with live visualization and RMS-based trigger detection. Debugging motion artifacts, electrode-placement effects, and floating-pin crosstalk helped connect what I saw in the signal to the physical recording setup.",
          "With acquisition in place, we implemented continuous regression from EMG to hand opening and closing, using two methods to collect training labels.",
          "Visual guidance: an on-screen bar moved along a horizontal scale, with an open hand represented at the left and a closed hand at the right. The wearer tried to match their hand opening and closing to the bar’s position. That position supplied the target label, so label accuracy depended on how closely the wearer followed the cue.",
          "Webcam tracking: MediaPipe measured hand opening and closing while the wearer moved at their own pace. Time-aligning those measurements with the EMG stream provided labels based on observed movement. Both methods were used for continuous regression, completing the Phase 1 path from acquisition to hand-motion estimation.",
          "Each webcam-labeling session begins with an open-hand and closed-fist calibration to set the endpoints of the hand-curl range for that session. After calibration, the participant moves naturally while EMG and hand tracking are recorded together. The workflow then moves through feature extraction, regression training, and live inference on incoming EMG."
        ]
      },
      {
        "type": "stats",
        "title": "Current acquisition setup",
        "items": [
          {
            "value": "4",
            "label": "BioAmp Candy channels"
          },
          {
            "value": "≈6.4 kHz",
            "label": "Aggregate sampling rate"
          }
        ],
        "caption": "Arduino Uno R4 Minima · multiplexed sampling · wired USB"
      },
      {
        "type": "text",
        "title": "The acquisition pipeline",
        "content": [
          "emg_reader.py runs serial acquisition in a background thread. Bulk reads and queue-based backlog protection keep a slow consumer from blocking acquisition.",
          "trigger.py performs auto-calibrating RMS-based detection across all four channels. Hysteresis and a cooldown reduce repeated triggering around the threshold.",
          "plotter.py displays four stacked channels with raw signals and RMS envelopes. main.py connects the reader, detection logic, and visualization."
        ]
      },
      {
        "type": "text",
        "title": "Why four channels became the practical limit",
        "content": [
          "In my current Uno R4 implementation, four channels provide a useful balance of per-channel sampling rate and a debuggable serial stream. Moving to six would require changes such as ADC prescaler tuning, a higher baud rate, and binary transmission, with tradeoffs in resolution, timing, and ease of inspection.",
          "The ADC also samples channels sequentially, introducing inter-channel timing skew. Together, channel count and sampling alignment motivated the move to custom hardware for the next stage of signal analysis."
        ]
      },
      {
        "type": "text",
        "title": "Phase 2 / Richer EMG acquisition and source separation — in progress",
        "content": [
          "I’m now designing a custom acquisition board in KiCad, using TI’s ADS1299EEG-FE reference documentation, SLAU443, as the primary guide. The aim is to support source-separation experiments that extract more useful components of muscle activity for continuous control.",
          "Designing from scratch lets me understand each hardware block and choose the controller, connectors, and power arrangement around this project. The board is currently in schematic development."
        ]
      },
      {
        "type": "text",
        "title": "Target hardware architecture",
        "content": [
          "Acquisition: TI ADS1299, with eight simultaneous channels and 24-bit conversion. Controller: Teensy 4.0.",
          "Connections: JST PH 2.0 mm electrode connectors to match the existing BioAmp cables. Proposed analog power: bipolar ±2.5 V rails using LM317/LM337 regulators.",
          "These are specifications for the proposed design; board performance remains to be measured."
        ]
      },
      {
        "type": "text",
        "title": "Schematic progress",
        "content": [
          "Completed schematic work includes the VCAP bypass network, per-channel RC input filtering, the bias-drive series resistor, and the SPI/control header layout.",
          "The analog front end and bias-drive circuitry remain key review areas. The next schematic pass will address remaining power and interface details and add test points for oscilloscope debugging during bring-up."
        ]
      },
      {
        "type": "text",
        "title": "Next steps: layout, assembly, and testing",
        "content": [
          "First, finish schematic capture and review it section by section against SLAU443.",
          "Then, complete PCB layout with attention to input routing, return paths, and the bias-drive circuit. Assembly is planned using the university ECE lab’s stencils, reflow oven, and hot-air rework equipment.",
          "Bench bring-up and oscilloscope validation come before any body-connected evaluation. Finally, I’ll repeat the Phase 1 signal-quality and trigger-detection checks to assess whether the custom board improves the acquisition pipeline."
        ]
      },
      {
        "type": "text",
        "title": "Separating useful sources from recorded EMG",
        "content": [
          "Once the board is validated, I plan to investigate convolutive blind source separation. Standard instantaneous ICA is constrained by the number and independence of observed mixtures; incorporating EMG’s temporal structure offers another avenue to explore.",
          "Time-delayed embedding stacks lagged copies of each channel into an extended observation vector. This lets the model use how signals evolve over time alongside differences between electrodes, with the aim of separating additional useful components from the eight recorded channels.",
          "Those delayed copies do not add independent measurements. Whether the expanded representation yields useful sources is an experimental question."
        ]
      },
      {
        "type": "text",
        "title": "Candidate methods for source extraction",
        "content": [
          "1. CKC / gCKC: investigate classical decomposition methods as an initial approach to source extraction.",
          "2. Convolutive BSS with FastICA and Progressive FastICA Peel-off: investigate temporal embedding and iterative source extraction.",
          "3. Swarm-Contrastive Decomposition (SCD): explore an additional candidate motivated by recent high-density surface EMG research.",
          "4. Bi-GRU-attention: investigate learned decomposition as a possible route toward online inference. These methods are candidates for exploration; their usefulness for continuous regression, latency, and reliability will need to be evaluated."
        ]
      },
      {
        "type": "text",
        "title": "How I’ll assess the next stage",
        "content": [
          "The intended combination of relatively few channels and dynamic movement is a demanding setting. Findings from high-density arrays or controlled contractions cannot be assumed to transfer to this hardware.",
          "Volume conduction, electrode geometry, noise, and movement will affect source separation. I’ll assess whether the extracted components remain stable and improve hand-motion regression over the Phase 1 baseline, along with their latency and suitability for continuous input."
        ]
      },
      {
        "type": "text",
        "title": "What I’m learning",
        "content": [
          "Working through the full pipeline has taught me to trace modeling decisions back to acquisition choices: timing, electrode placement, and label collection all shape what a regression model can learn. The custom-board work is extending that process into circuit design, where each design choice needs a corresponding way to test it."
        ]
      },
      {
        "type": "external-links",
        "title": "Design reference and further reading",
        "links": [
          {
            "label": "TI ADS1299EEG-FE user guide (SLAU443)",
            "href": "https://www.ti.com/lit/ug/slau443b/slau443b.pdf"
          },
          {
            "label": "High-yield motor unit decomposition — Grison et al.",
            "href": "https://arxiv.org/abs/2410.14800"
          },
          {
            "label": "Bi-GRU-attention decomposition paper",
            "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10965553/"
          },
          {
            "label": "Swarm-Contrastive Decomposition (2024)",
            "href": "https://doi.org/10.1109/TBME.2024.3446806"
          }
        ]
      }
    ]
  },
  {
    "slug": "cortical-neuron-mea",
    "teamSize": 2,
    "status": "active",
    "title": "Cortical Neuron Signal Analysis via 3Brain MEA",
    "shortTitle": "MEA",
    "type": "Research / In progress",
    "year": "2026–Present",
    "description": "Wet-lab research combining mammalian cell culture, cortical neuron culture, and extracellular recording with high-density 3Brain microelectrode arrays. The project connects hands-on neural cell culture with electrophysiology and signal analysis.",
    "tags": [
      "Electrophysiology",
      "Wet Lab",
      "Mammalian Cell Culture",
      "MEA",
      "Signal Processing"
    ],
    "image": "/images/mea/3brain-mea.jpg",
    "heroImage": "/images/mea/3brain-mea.jpg",
    "imageFit": "contain",
    "tileImageCrop": {
      "x": 81.2,
      "y": 0,
      "width": 1457.6,
      "height": 911,
      "sourceWidth": 1620,
      "sourceHeight": 911
    },
    "imageCrop": {
      "x": 0,
      "y": 101,
      "width": 1620,
      "height": 810,
      "sourceWidth": 1620,
      "sourceHeight": 911
    },
    "github": null,
    "demo": null,
    "imageAlt": "3Brain single-well HD-MEA plates arranged upright on a light gray background",
    "tone": "slate",
    "featured": false,
    "sections": [
      {
        "type": "text",
        "title": "From neural cell culture to recordings — in progress",
        "content": [
          "This ongoing project brings together wet-lab experimentation and computational analysis. I work with mammalian cortical neuron cultures, developing hands-on neural cell culture skills alongside extracellular recording with a high-density 3Brain microelectrode array.",
          "The work spans the biological preparation, electrophysiological recording, and interpretation of neural signals. The current focus is developing this experimental workflow; project-specific findings will be added as the work progresses.",
          "Mammalian cell culture and sterile technique are central to the work. Working with cortical neurons connects cell handling and culture maintenance to the needs of an electrophysiology experiment, building practical experience with living neural preparations.",
          "The culture work also provides context for the recordings: interpreting electrical activity requires attention to the biological preparation and experimental conditions as well as the downstream analysis."
        ]
      },
      {
        "type": "text",
        "title": "From the electrode array to neural activity",
        "content": "A high-density MEA records electrical activity at many locations across a preparation. These recordings provide a basis for examining neural signals and their spatial and temporal patterns. The images on this page are official 3Brain examples for context, not recordings or results from this project."
      },
      {
        "type": "image",
        "src": "/images/mea/3brain-example-data.png",
        "alt": "3Brain example showing extracellular traces, spike waveform clusters, and sorting results",
        "caption": "Manufacturer example: recorded traces and spike-sorting visualizations from 3Brain’s neuronal-culture application page. These are illustrative data, not project results."
      },
      {
        "type": "external-links",
        "title": "Technology and image sources",
        "links": [
          {
            "label": "3Brain CorePlate 1W single-well HD-MEA",
            "href": "https://www.3brain.com/products/single-well/hd-mea"
          },
          {
            "label": "3Brain neuronal-culture examples",
            "href": "https://www.3brain.com/applications/neuronal-stem-cell-cultures"
          }
        ]
      }
    ],
    "imageCredit": "Reference image: 3Brain",
    "heroCaption": "3Brain CorePlate 1W single-well HD-MEA. Manufacturer reference photograph."
  },
  {
    "slug": "eeg-fmri",
    "teamSize": 3,
    "title": "EEG-to-fMRI Brain Activation Prediction",
    "shortTitle": "EEG → fMRI",
    "type": "NE 422 / Course Project",
    "year": "Spring 2026",
    "description": "A team course project comparing three deep-learning approaches for predicting fMRI activation maps from EEG: EEGNet + MLP, EEGNet + U-Net, and a cross-modal Transformer.",
    "tags": [
      "EEG",
      "fMRI",
      "PyTorch",
      "Transformers"
    ],
    "image": "/images/eeg-fmri/transformer-comparison.png",
    "heroImage": "/images/eeg-fmri/transformer-comparison.png",
    "github": "https://github.com/jellyfishtacoz/ne422_final_project",
    "demo": null,
    "imageAlt": "Cross-modal Transformer comparison from the NE 422 report: ground-truth activation maps above predicted maps",
    "tone": "lavender",
    "featured": false,
    "sections": [
      {
        "type": "text",
        "title": "Can EEG predict spatial activation?",
        "content": [
          "For our NE 422 final project, we investigated whether EEG recorded during motor tasks could predict the spatial activation patterns measured with fMRI. We trained models to regress from EEG epochs to fMRI t-statistic maps, rather than reconstruct raw BOLD time series.",
          "As a team, we compared three architectures: EEGNet + MLP, EEGNet + U-Net, and a cross-modal Transformer. We evaluated their predictions on held-out participants and analyzed where each approach succeeded or fell short."
        ]
      },
      {
        "type": "text",
        "title": "Building the paired dataset",
        "content": [
          "We used the simultaneous EEG-fMRI dataset described by Bondi et al. (2025): 17 participants, three runs per participant, and six motor execution and imagery conditions involving the hands and right foot. Each run contained approximately 460 fMRI volumes, acquired at a two-second repetition time.",
          "EEG was recorded with 63 channels at 5,000 Hz and preprocessed to 250 Hz with a 0.2–40 Hz bandpass. Excluding Ch32, the ECG artifact channel, left 62 EEG channels for modeling.",
          "Subjects 1–13 formed the training set, subjects 14–15 the validation set, and subjects 16–17 the held-out test set. This split evaluated transfer to unseen participants."
        ]
      },
      {
        "type": "text",
        "title": "From recordings to regression targets",
        "content": [
          "The EEG preprocessing pipeline used MNE-Python and PyTorch dataloaders to create 0–3 second post-onset epochs. The report also describes a multi-lag representation with five lags spaced two seconds apart, giving a 62 × 5 × 751 input tensor. The EEGNet models used 62 × 751 epochs.",
          "For fMRI, I used Nilearn to fit a general linear model with an SPM hemodynamic response function and a 1/128 Hz high-pass cutoff. Task contrasts, including right-hand minus left-hand, produced voxel-wise t-statistic maps used as regression targets.",
          "The target volumes contained 79 × 95 × 79 voxels. Rest epochs were assigned zero maps, a simplifying choice that became an important limitation when interpreting the results."
        ]
      },
      {
        "type": "text",
        "title": "First model / EEGNet + MLP",
        "content": [
          "I began with EEGNet as a compact feature encoder, using temporal, depthwise spatial, and separable convolutions to summarize the EEG epoch. An MLP then predicted the target volume’s voxel values.",
          "This provided a direct baseline, but the decoder did not explicitly model relationships between neighboring voxels. In the reported predictions, it converged toward a nearly constant average map with little sensitivity to the EEG input—the mean-collapse behavior visible below."
        ]
      },
      {
        "type": "full-width-image",
        "src": "/images/eeg-fmri/mlp-comparison.png",
        "alt": "EEGNet + MLP ground-truth activation maps above near-flat predictions",
        "caption": "Figure 1 from the report. The MLP predictions show mean collapse, with little correspondence to the ground-truth activation."
      },
      {
        "type": "text",
        "title": "Adding spatial structure / EEGNet + U-Net",
        "content": [
          "I replaced the MLP decoder with a U-Net to introduce spatial structure into the reconstruction. The decoder upsamples the encoded representation to the target volume, using skip connections to preserve context.",
          "The predictions showed more spatial variation, but their correspondence to the true activation remained weak. Our report attributes this behavior to overfitting in a small training set: a more structured decoder did not translate into better generalization."
        ]
      },
      {
        "type": "full-width-image",
        "src": "/images/eeg-fmri/unet-comparison.png",
        "alt": "EEGNet + U-Net ground-truth maps above predicted maps across seven brain slices",
        "caption": "Figure 2 from the report. U-Net predictions vary spatially but do not reliably reproduce the ground-truth activation pattern."
      },
      {
        "type": "text",
        "title": "Cross-modal Transformer",
        "content": [
          "We also implemented a cross-modal Transformer using frequency-band EEG features embedded as 256-dimensional tokens, with temporal and electrode-position information. Four encoder layers processed those tokens, while four cross-attention decoder layers let spatially encoded voxel queries attend to the EEG features.",
          "We trained the 6.4-million-parameter model with a loss combining weighted MSE, Pearson correlation, and a variance-matching penalty to discourage flat predictions. Training used Adam, a batch size of four, and six epochs under laptop-GPU compute constraints.",
          "The composite loss addresses the mean collapse seen in the MLP baseline. MSE can favor an average map when training data are limited; the correlation term encourages agreement with the spatial pattern, while variance matching discourages an output that is nearly flat. The 256-dimensional embedding describes the size of each token, rather than the number of tokens in a sample."
        ]
      },
      {
        "type": "full-width-image",
        "src": "/images/eeg-fmri/transformer-comparison.png",
        "alt": "Cross-modal Transformer comparison showing true activation slices above predicted slices",
        "caption": "Figure 3 from the report. The Transformer captured some regional structure, with only partial correspondence to the reference maps."
      },
      {
        "type": "text",
        "title": "Reading the activation figures",
        "content": [
          "The figures illustrate the character of each model’s output, but their display settings differ. The MLP and U-Net examples use subject 16, run 1, with an anatomical underlay and a threshold of |t| > 2. The Transformer panel uses a cross-validation example, no anatomical underlay, and a lower threshold of |t| > 0.5. Apparent activation extent is therefore not directly comparable across the panels.",
          "Use the quantitative results alongside the images: a map that looks more detailed or more extensive is not necessarily a more accurate prediction. Open a figure at full size to inspect its labels and individual slices."
        ]
      },
      {
        "type": "table",
        "title": "Held-out results",
        "caption": "Table 1 from the NE 422 final report. Test subjects: 16–17. Dashes indicate SSIM was not reported for those models.",
        "columns": [
          "Model",
          "MSE",
          "MAE",
          "R²",
          "Pearson r",
          "SSIM"
        ],
        "rows": [
          [
            "EEGNet + MLP",
            "0.740",
            "0.424",
            "−0.226",
            "0.034",
            "—"
          ],
          [
            "EEGNet + U-Net",
            "0.960",
            "0.467",
            "−0.589",
            "0.003",
            "—"
          ],
          [
            "Transformer",
            "1.040",
            "0.608",
            "−0.406",
            "0.291",
            "0.443"
          ]
        ]
      },
      {
        "type": "text",
        "title": "What the comparison showed",
        "content": [
          "The Transformer had the highest Pearson correlation and a reported SSIM of 0.443, but also the highest MSE and MAE. The MLP’s lower voxel-wise error coexisted with nearly flat predictions, showing why error magnitude alone was insufficient to judge the maps.",
          "All three models had negative R². The report therefore found only weak support for the hypothesis: some spatial structure was recovered, but the models did not consistently outperform a mean-map baseline. This was a feasibility study, not a demonstrated substitute for fMRI."
        ]
      },
      {
        "type": "text",
        "title": "Limits of the experiment",
        "content": [
          "Only 13 subjects were available for training. Computing condition-level GLM targets across multiple trials also reduced the number of distinct paired observations compared with pairing EEG to every fMRI time point.",
          "The zero-map targets for rest, limited Transformer training, and focus on motor tasks further constrained the experiment. With only two held-out subjects, the reported results provide a narrow view of cross-subject generalization."
        ]
      },
      {
        "type": "text",
        "title": "Where we would take it next",
        "content": [
          "The report proposes larger paired datasets, leave-one-subject-out cross-validation, and subject-adaptive fine-tuning. These would help assess how much of the limitation comes from available data and transfer between participants.",
          "We also considered a simpler two-stage baseline: classify the motor condition from EEG, then retrieve a condition-specific fMRI template. This was not implemented. Comparing it with direct voxel regression, and exploring SSIM-based optimization, would help test whether added model complexity produces useful spatial information."
        ]
      },
      {
        "type": "text",
        "title": "Lessons from the model comparison",
        "content": [
          "Implementing the preprocessing and both EEGNet variants made the connection between target construction and model behavior concrete. The comparison reinforced the need to inspect predictions alongside multiple metrics: a low reconstruction error can hide an uninformative output, while a more expressive architecture can still fail to generalize."
        ]
      },
      {
        "type": "external-links",
        "title": "Read the class paper",
        "links": [
          {
            "label": "NE 422 final report (PDF)",
            "href": "/papers/ne422-final-paper.pdf"
          }
        ]
      }
    ],
    "imageFit": "contain",
    "imageCrop": {
      "x": 280,
      "y": 45,
      "width": 1591,
      "height": 655,
      "sourceWidth": 1871,
      "sourceHeight": 705
    },
    "heroCaption": "Cross-modal Transformer, Figure 3 of the final report. Ground-truth maps (top) and predictions (bottom) show partial correspondence in regional activation."
  },
  {
    "slug": "slim-phenotyping",
    "teamSize": 3,
    "showListImage": false,
    "status": "completed",
    "title": "Label-Free Cytoarchitectural Phenotyping via SLIM",
    "shortTitle": "SLIM",
    "type": "Research / URS Presentation",
    "year": "Aug 2025–May 2026",
    "description": "Label-free cell viability research at the Beckman Institute, combining SLIM quantitative phase imaging, deep learning, and interpretable structural features. Presented at the UIUC Undergraduate Research Symposium.",
    "tags": [
      "Deep Learning",
      "Microscopy",
      "Python",
      "Computer Vision"
    ],
    "image": "/images/slim/classification.png",
    "tileImageCrop": {
      "x": 1172,
      "y": 363,
      "width": 657,
      "height": 510,
      "sourceWidth": 1920,
      "sourceHeight": 1034
    },
    "tileImageAlt": "SLIM cell examples from rows three through five, showing phase images with true and predicted viability labels",
    "heroImage": "/images/slim/classification.png",
    "github": null,
    "demo": null,
    "imageAlt": "SLIM viability classification results with training curves, a confusion matrix, and labeled cell images",
    "tone": "sage",
    "featured": false,
    "sections": [
      {
        "type": "text",
        "title": "Reading cell viability through structure",
        "content": [
          "Spatial Light Interference Microscopy (SLIM) measures the phase shifts that occur as light passes through a cell, producing quantitative maps of its optical structure without fluorescent labeling. These maps provide information about cell shape, dry mass, and the organization of intracellular material.",
          "At the Beckman Institute, this research combines SLIM with computational analysis in a phase imaging with computational specificity (PICS) workflow to investigate how cellular structure relates to viability.",
          "I presented this work at the UIUC Undergraduate Research Symposium. The poster connects viability classification with structural phenotyping: understanding which changes in cell shape and intracellular organization accompany different cell states."
        ]
      },
      {
        "type": "text",
        "title": "Following treatment-associated changes",
        "content": [
          "The experimental design uses CHO cells imaged at baseline and at 15, 30, and 60 minutes after introducing a chemotherapeutic agent. The poster associates these time points with control, stressed/early apoptotic, later apoptotic, and dead populations.",
          "SLIM phase maps capture changes in optical path length associated with cellular structure. The analysis compares these treatment-associated groups rather than assuming every cell at a given time point has an identical biological state."
        ]
      },
      {
        "type": "image",
        "src": "/images/slim/experimental-design.png",
        "alt": "CHO cell treatment timeline with SLIM imaging at baseline and 15, 30, and 60 minutes",
        "caption": "Experimental design from Figure 1 of the poster. Time after treatment defines the comparison groups."
      },
      {
        "type": "text",
        "title": "From phase images to cell-level measurements",
        "content": [
          "I worked on automated cell segmentation and feature extraction. The workflow uses a U-Net segmentation model on label-free phase maps, followed by per-cell measurements of morphology, optical density, dry mass, and edge-to-core features.",
          "Matched NucBlue/NucGreen fluorescence images provide reference information for viability validation. The prediction input is label-free phase imaging; fluorescence supports the assessment of the labels and results."
        ]
      },
      {
        "type": "full-width-image",
        "src": "/images/slim/workflow.png",
        "alt": "SLIM imaging workflow through segmentation, feature extraction, classification, and validation",
        "caption": "Figure 3: the workflow connects label-free images to quantitative features and viability assessment."
      },
      {
        "type": "text",
        "title": "Learning three viability classes",
        "content": [
          "An E-U-Net-based model was trained for three-class viability classification. The poster describes the targets as healthy, stressed/apoptotic, and dead, while the structural analysis examines four treatment-associated populations.",
          "The opening figure reports focal loss, accuracy, and macro F1 over 70 epochs, alongside example predictions. Healthy cells were easier to distinguish; transitional apoptotic states remained challenging. The examples include errors as well as correct predictions."
        ]
      },
      {
        "type": "stats",
        "title": "Classification results reported in the poster",
        "items": [
          {
            "value": "96.88%",
            "label": "Test accuracy"
          },
          {
            "value": "0.8705",
            "label": "Macro F1"
          }
        ],
        "caption": "Values transcribed from the E-U-Net test-results panel. Macro F1 complements overall accuracy when class representation is uneven."
      },
      {
        "type": "text",
        "title": "Looking beyond the predicted label",
        "content": [
          "The poster reports analysis of approximately 12,000 CHO cells to examine how structure varies across viability states. Shape descriptors and edge-to-core optical-path-length features capture both overall morphology and the distribution of intracellular content.",
          "Representative phase maps illustrate differences among control, early apoptosis, late apoptosis, and dead cells. These images motivate a richer description of cell state than a single categorical prediction."
        ]
      },
      {
        "type": "full-width-image",
        "src": "/images/slim/phase-maps.png",
        "alt": "Representative SLIM phase maps of control, early apoptotic, late apoptotic, and dead CHO cells",
        "caption": "Figure 5: control, early apoptosis, late apoptosis, and dead cells, from left to right. The 5 μm scale bar applies to all four panels."
      },
      {
        "type": "text",
        "title": "Interpreting the structural variation",
        "content": [
          "Principal component analysis summarizes the filtered structural features and reveals population-level differences. The poster reports that PC1 explains 50.1% of the variance; feature loadings help identify which descriptors contribute to the main axes of variation.",
          "The group centroids describe a progression across treatment-associated states. This is a comparison of populations in feature space, not evidence that each plotted cell was individually tracked through that progression."
        ]
      },
      {
        "type": "full-width-image",
        "src": "/images/slim/pca-populations.png",
        "alt": "PCA density plots comparing healthy, stressed, apoptotic, and dead cell populations across three component pairings",
        "caption": "PCA population comparisons from Figure 6. Distributions show both shifts and overlap among the cell-state groups."
      },
      {
        "type": "text",
        "title": "Next steps / Mapping the viability continuum",
        "content": [
          "The observed structural differences indicate that label-free phenotyping is a promising way to characterize cell viability, including the transitional states between healthy and dead cells.",
          "The next step is to develop a trajectory through PCA feature space that maps the progression of these structural changes. The goal is to estimate where a cell lies along a viability continuum, moving beyond a discrete class label toward a more continuous description of cell state. This trajectory remains to be developed and validated."
        ]
      }
    ],
    "imageFit": "contain",
    "heroCaption": "Classification results from the URS poster: E-U-Net learning curves, test results, and representative cell predictions."
  },
  {
    "slug": "openinteraction",
    "showListImage": true,
    "teamSize": 2,
    "title": "OpenInteraction",
    "shortTitle": "OpenInteraction",
    "type": "NeuroHack Winner",
    "year": "2025",
    "description": "An open-source webcam interface exploring hands-free computer access for people with motor impairments, using configurable eye and head tracking. Winner at NeuroHack 2025.",
    "tags": [
      "OpenCV",
      "Python",
      "Computer Vision",
      "Assistive Technology"
    ],
    "image": "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/996/404/datas/original.png",
    "heroImage": null,
    "github": "https://github.com/jellyfishtacoz/OpenInteraction",
    "demo": null,
    "imageAlt": "OpenInteraction configuration interface from the Devpost submission",
    "tone": "sand",
    "featured": false,
    "sections": [
      {
        "type": "text",
        "title": "Computer access beyond the mouse and keyboard",
        "content": [
          "We built OpenInteraction with people who have difficulty using a mouse or keyboard in mind. The goal is to offer alternative ways to interact with a computer through eye movement, head movement, and blinking, using an ordinary webcam.",
          "For someone with limited hand or arm control, these inputs could support more independent desktop interaction. The prototype explores that potential through configurable controls that can be adapted to the movements a person can comfortably use."
        ]
      },
      {
        "type": "video-embed",
        "title": "OpenInteraction demo",
        "src": "https://player.vimeo.com/video/1137435765?byline=0&portrait=0&title=0&dnt=1",
        "watchUrl": "https://vimeo.com/1137435765",
        "caption": "The project demonstration submitted to NeuroHack Fall 2025."
      },
      {
        "type": "text",
        "title": "From tracking to desktop actions",
        "content": [
          "OpenCV captures camera frames, EyeTrax estimates gaze, and MediaPipe facial landmarks provide head-pose features. Modular handlers map these signals to cursor movement or keyboard input; blink detection supports optional double-blink clicking.",
          "I implemented backend control methods for eye and head tracking and developed overlays to make those controls easier to use."
        ]
      },
      {
        "type": "image",
        "src": "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/996/404/datas/original.png",
        "alt": "OpenInteraction settings interface",
        "caption": "The configuration interface shown in the Devpost submission."
      },
      {
        "type": "text",
        "title": "Adapting controls to the person",
        "content": [
          "The accessibility goal makes adjustability central to the design. Eye and head control modes, configurable thresholds, and action bindings offer ways to match the interface to different movement preferences and abilities. Live overlays show how tracked movement translates into input.",
          "PyQt5 renders that feedback, while a Tkinter interface edits settings and saves changes to JSON. Calibration and recentering help align tracking with the user; hotkeys provide quick pause and exit controls."
        ]
      },
      {
        "type": "text",
        "title": "Keeping the interface responsive",
        "content": [
          "Smoothing reduced gaze jitter but introduced a tradeoff with cursor latency. Calibration drift also affected how head movement mapped to screen coordinates, making recentering an important part of the interface.",
          "Blink detection needed to avoid false clicks under changing lighting. Overlay flicker and windows moving off-screen created separate usability problems even when the tracking estimates were usable.",
          "Tkinter settings and PyQt5 overlays had to run without blocking each other. Live JSON updates required coordination between settings callbacks and the tracking loop to avoid overly frequent saves and configuration races. These integration details connected the tracking prototype to an interface that could be operated in real time."
        ]
      },
      {
        "type": "text",
        "title": "Prototype limits and next steps",
        "content": [
          "The repository notes that gaze tracking works best near the camera in good lighting. Camera selection and keybinding support were also limited in the documented prototype.",
          "The submission proposes broader customization, multi-monitor support, an on-screen keyboard, and additional operating-system support. These remain roadmap items here rather than claims about the demonstrated version."
        ]
      },
      {
        "type": "external-links",
        "title": "Project submission",
        "links": [
          {
            "label": "OpenInteraction on Devpost",
            "href": "https://devpost.com/software/openinteraction"
          }
        ]
      }
    ],
    "imageFit": "contain"
  },
  {
    "slug": "stroke-classification",
    "teamSize": 8,
    "teamLabel": "8-author project",
    "title": "EEG-Based Stroke & Motor Task Classification",
    "shortTitle": "Stroke EEG",
    "type": "NE 412 · Class Project",
    "year": "Spring 2026",
    "description": "A team investigation of whether sensorimotor EEG features can distinguish stroke survivors from healthy controls and classify motor task demand, comparing logistic regression and random forest across five feature sets.",
    "tags": [
      "EEG",
      "MNE-Python",
      "Machine Learning",
      "Feature Engineering"
    ],
    "image": null,
    "heroImage": null,
    "imageFit": "contain",
    "imageAlt": "Workflow from sensorimotor EEG through spectral and connectivity features to subject-grouped classification",
    "heroCaption": "An overview of the analysis workflow, illustrated from the class paper.",
    "tone": "blue",
    "featured": false,
    "github": null,
    "demo": null,
    "sections": [
      {
        "type": "text",
        "title": "Two questions about motor-related EEG",
        "content": [
          "For NE 412: Neural Data Analysis, we explored EEG-based classification in the context of stroke rehabilitation. We asked two questions: can sensorimotor EEG distinguish stroke survivors from healthy controls, and can it distinguish two levels of effort during an upper-limb motor task?",
          "We collaborated across every part of the project, from the analysis workflow and feature extraction to model comparisons, interpretation, and the class paper. The longer-term motivation was to explore signals that could support objective monitoring of motor recovery. This study tested group and task classification, rather than directly measuring recovery over time."
        ]
      },
      {
        "type": "text",
        "title": "Starting with an existing motor-task dataset",
        "content": [
          "The dataset came from Dr. Yuan Yang’s laboratory at the University of Illinois Urbana-Champaign and included 21 participants: 14 stroke survivors and seven healthy controls. Participants performed shoulder abduction at 20% and 40% of their maximum voluntary contraction (MVC). Data collection preceded this class project.",
          "Stroke-versus-control classification used participant group labels. The task-demand analysis compared 20% versus 40% MVC across both groups together. Because the recordings lacked a clear baseline and precise event timing for ERD/ERS analysis, we focused on general spectral and connectivity differences across conditions."
        ]
      },
      {
        "type": "text",
        "title": "Preparing the signals and extracting features",
        "content": [
          "The preprocessing workflow included band-pass filtering, independent component analysis for artifact removal, and epoch-based artifact rejection. Signals were segmented into one-second epochs. Analysis focused on sensorimotor electrodes: FC1–FC6, C1–C6, CP1–CP6, FCz, Cz, and CPz.",
          "We examined four feature types. Power spectral density (PSD), computed with Welch’s method and averaged across epochs per participant and condition, described signal power in low beta (13–20 Hz) and high beta (20–30 Hz). Coherence captured frequency-dependent relationships between channels; imaginary coherence emphasized their time-lagged component. Phase lag described timing differences between signals.",
          "To test which information helped classification, we compared five combinations: PSD alone; PSD with coherence; PSD with coherence and imaginary coherence; PSD with phase lag; and all four feature types together."
        ]
      },
      {
        "type": "text",
        "title": "Comparing models across participants",
        "content": [
          "We evaluated logistic regression and random forest for both classification tasks with each feature combination. This compared a linear classifier with an ensemble of decision trees while keeping the task and feature comparisons consistent.",
          "Evaluation kept samples from the same participant together to avoid leakage between training and testing. The paper describes an 80/20 subject-level split and reports primary accuracies from five-fold stratified grouped cross-validation, with ROC AUC calculated from cross-validated probabilities.",
          "Feature standardization was fitted within each cross-validation fold, keeping information from held-out participants out of the training transformation."
        ]
      },
      {
        "type": "table",
        "title": "Stroke vs. control / Feature comparison",
        "columns": [
          "Feature set",
          "Logistic regression",
          "Random forest"
        ],
        "rows": [
          [
            "All features",
            "0.600",
            "0.615"
          ],
          [
            "PSD only",
            "0.575",
            "0.665"
          ],
          [
            "PSD + coherence",
            "0.550",
            "0.615"
          ],
          [
            "PSD + coherence + imaginary coherence",
            "0.500",
            "0.575"
          ],
          [
            "PSD + phase lag",
            "0.620",
            "0.695"
          ]
        ],
        "caption": "Cross-validated accuracy across the five feature sets. Detailed values are also documented in the coauthor’s project write-up."
      },
      {
        "type": "table",
        "title": "20% vs. 40% MVC / Feature comparison",
        "columns": [
          "Feature set",
          "Logistic regression",
          "Random forest"
        ],
        "rows": [
          [
            "All features",
            "0.575",
            "0.555"
          ],
          [
            "PSD only",
            "0.460",
            "0.530"
          ],
          [
            "PSD + coherence",
            "0.435",
            "0.405"
          ],
          [
            "PSD + coherence + imaginary coherence",
            "0.455",
            "0.550"
          ],
          [
            "PSD + phase lag",
            "0.545",
            "0.450"
          ]
        ],
        "caption": "Cross-validated accuracy across the five feature sets. Detailed values are also documented in the coauthor’s project write-up."
      },
      {
        "type": "table",
        "title": "Best reported results",
        "columns": [
          "Task",
          "Model",
          "Features",
          "Accuracy",
          "ROC AUC"
        ],
        "rows": [
          [
            "Stroke vs. control",
            "Random forest",
            "PSD + phase lag",
            "≈70%",
            "0.59"
          ],
          [
            "20% vs. 40% MVC",
            "Logistic regression",
            "All features",
            "≈57%",
            "0.56"
          ]
        ],
        "caption": "Rounded results reported in the NE 412 class paper. ROC AUC of 0.50 corresponds to chance discrimination."
      },
      {
        "type": "text",
        "title": "What the comparisons showed",
        "content": [
          "For stroke versus control, random forest with PSD and phase lag produced the strongest reported accuracy. PSD alone reached about 67%; adding coherence reduced that to about 61%, and adding imaginary coherence reduced it further to about 57%. More features did not automatically improve performance.",
          "Task demand was harder to distinguish. Accuracies ranged from about 40% to 57%, with all-feature logistic regression performing best. The AUC values of 0.59 and 0.56 show that discrimination remained modest for both tasks. The 14-to-seven group imbalance also matters when interpreting stroke-versus-control accuracy."
        ]
      },
      {
        "type": "text",
        "title": "Limits and next steps",
        "content": [
          "The small dataset and substantial variation between participants limited generalization, particularly for larger feature sets. These results provide an exploratory comparison of EEG representations, rather than a validated measure of impairment severity or a clinical monitoring tool.",
          "Future directions include larger datasets, participant-specific models, and comparisons with EEG-focused deep learning architectures such as EEGNet. Recordings with suitable baselines and event timing would also make it possible to study movement-related changes through ERD/ERS analysis."
        ]
      },
      {
        "type": "external-links",
        "title": "Additional project documentation",
        "links": [
          {
            "label": "Coauthor’s analysis and complete result tables",
            "href": "https://bernied04.github.io/motor-impairment-decoding.html"
          }
        ]
      }
    ]
  },
  {
    "slug": "neural-prosthetic",
    "showListImage": false,
    "teamSize": 6,
    "title": "EEG/EMG Controlled Prosthetic",
    "shortTitle": "Prosthetic",
    "type": "Neurotechnology",
    "year": "2024–2025",
    "description": "An early EEG/EMG soft robotic prosthetic project involving EEG data collection, EMG signal analysis, actuator development, and a presentation at the UIUC Undergraduate Research Symposium.",
    "tags": [
      "EEG",
      "EMG",
      "Soft Robotics",
      "Embedded Systems"
    ],
    "image": "/images/prosthetic/second-chance-device.png",
    "imageFit": "contain",
    "imageCredit": "Later device concept: Second Chance Innovations",
    "heroImage": null,
    "github": null,
    "demo": null,
    "imageAlt": "Later upper-limb assistive device concept illustrated on the Second Chance Innovations website",
    "tone": "rose",
    "featured": false,
    "sections": [
      {
        "type": "text",
        "title": "Biosignals and soft robotics",
        "content": "This project explored how EEG and EMG could support a soft robotic assistive device. The prototype brought biological signal processing together with a soft actuator and embedded actuation hardware."
      },
      {
        "type": "text",
        "title": "EEG collection and EMG analysis",
        "content": "I collected EEG data and separately analyzed EMG signals using t-SNE and UMAP. This work combined hands-on EEG acquisition with dimensionality-reduction methods for exploring the EMG data in the context of assistive control."
      },
      {
        "type": "text",
        "title": "Actuator development and URS presentation",
        "content": "I helped with the soft robotic actuator and presented the work at the UIUC Undergraduate Research Symposium. The experience brought together signal analysis, physical prototyping, and communicating an interdisciplinary engineering project."
      },
      {
        "type": "text",
        "title": "Where the project went next",
        "content": "The project later developed into the startup Second Chance Innovations. My involvement was in the earlier project during 2024–2025; I no longer work on it. The company’s website below describes its subsequent work."
      },
      {
        "type": "external-links",
        "title": "Project continuation",
        "links": [
          {
            "label": "Second Chance Innovations",
            "href": "https://secchance.com/"
          }
        ]
      }
    ]
  }
]

export default projects
