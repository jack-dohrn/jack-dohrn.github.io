# Portfolio comparison

Reviewed Bernard Dohrn’s homepage and all five linked project pages on September 6, 2026. These notes distinguish presentation improvements from project claims that need confirmation against Jack’s own work and reports.

## Added

- A vertical project list with dates, context, summaries, technologies, thumbnails, and detail links. Existing project order is preserved.
- An explicit `status: "active"` indicator for EMG hand tracking, 3Brain MEA, and SLIM, visible on the list and project pages.
- A light/dark toggle throughout the site. It initially follows the system preference, remembers a manual choice, and applies the theme before rendering.
- A dedicated Contact section and navigation link.
- The EMG recording-session photograph from [Bernard’s EMG page](https://bernied04.github.io/emg-hand-pose.html), stored locally and credited in the project caption.

## Further useful additions

- **Full-size figures:** his EEG–fMRI figures open at full resolution. This would help readers inspect Jack’s activation maps and SLIM results.
- **Previous and next project links:** his detail pages offer both directions; Jack’s currently offers the next project and a return to all projects.
- **A brief introduction before the project list:** his homepage explains his focus before the projects. Jack’s introduction currently sits in About below the list.
- **More visible education and skills:** his About section includes coursework and practical skills. Jack already includes these in Resume; a short resume link or summary in About could make them easier to find without duplicating the whole resume.

## Shared-project details to consider after confirmation

- [EMG hand tracking](https://bernied04.github.io/emg-hand-pose.html): his write-up explains open/closed calibration at the start of each session and the sequence from collection to live inference. These would add practical detail to Jack’s page if they match his implementation. His dates, ISUR context, and motor-unit focus differ from Jack’s current framing; retain Jack’s confirmed source-separation scope.
- [EEG–fMRI](https://bernied04.github.io/eeg-fmri-reconstruction.html): he explains mean collapse, the purpose of the composite loss, figure threshold differences, and how GLM targets reduce the training sample count. These could improve the explanation after checking the report/code. His Transformer R² is −0.0406, while Jack’s page reports −0.406; this discrepancy needs source verification. His token count also differs from Jack’s architecture description.
- [Stroke classification](https://bernied04.github.io/motor-impairment-decoding.html): he includes full accuracy tables, low/high beta ranges, and feature standardization within each fold. Jack’s supplied paper left some of these details as placeholders, so confirm them from the analysis before expanding the page.
- [OpenInteraction](https://bernied04.github.io/openinteraction.html): his account describes calibration drift, blink robustness, competing GUI event loops, and concurrent configuration updates. These could support a short implementation-challenges section if confirmed. His site says **second place**, while Jack’s currently says **Winner**; the award wording needs reconciliation.
- [Neural interface software](https://bernied04.github.io/neurotech-interface-software.html): this describes his own preprocessing/model-training contributions and different involvement dates. Those are not missing accomplishments to transfer to Jack. Preserve Jack’s EEG collection, EMG t-SNE/UMAP analysis, actuator assistance, and URS presentation.

Jack’s site already has content absent from Bernard’s homepage, including dedicated 3Brain and SLIM case studies and a complete resume page. His personal skills and coursework should not be copied into Jack’s resume.


## Implementation update

Implemented the shared-project additions and full-size figures:

- All case-study figures and hero images now open their original image in a new tab, with an explicit full-size link. Display crops and width limits stay in place.
- EMG includes session calibration and the collection-to-live-inference workflow described by the coauthor. Existing acquisition dates and source-separation framing are retained.
- EEG/fMRI explains the loss terms and differing figure thresholds. The local NE 422 paper, Table 1, confirms Transformer R-squared = -0.406, so it was retained. The 256-dimensional token embedding is distinguished from token count; an unverified token count was not added.
- Stroke includes both full result tables, beta ranges, and within-fold standardization from the coauthor's analysis write-up, linked on the page. These supplement the incomplete methods and tables in the supplied paper; raw analysis code was not available for independent reproduction.
- OpenInteraction expands the practical challenges using the team's Devpost submission: jitter/latency, drift, false blink clicks, overlay issues, GUI coordination, and configuration saves. The user requested retaining Winner rather than changing it to second place.
- Prosthetic contributions remain Jack's confirmed contributions. No personal accomplishments from the colleague's page were transferred.

SLIM is now completed (May 2026), per the subsequent user correction; the original comparison above records the earlier state. Team sizes appear only on detail pages.
