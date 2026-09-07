# Jack Dohrn — portfolio

React + Vite portfolio using HashRouter for GitHub Pages. Run `npm install`, `npm run dev`, `npm run build`, or `npm run lint`. On Windows PowerShell with script execution disabled, use `npm.cmd`.

## Content and routing

Edit `src/data/projects.js` to change project order, metadata, media, or case-study sections. The homepage shows one project at a time, starting with the first entry. Previous/next buttons wrap through the list; left/right keyboard arrows work while focus is inside the carousel. Projects opens a dropdown linking directly to all six case studies in the same order. It closes on selection, outside click, focus leaving, or Escape. Existing slugs are preserved. About and back-to-projects links use HashRouter anchors (`/#about` and `/#projects`). Public project URLs remain `https://jack-dohrn.github.io/#/projects/emg-hand-control`, etc.

Personal links are in Navbar and Footer. Optional per-project `github` and `demo` URLs appear near the end of the article when supplied.

## Assets to supply

Vite serves the root `public/` directory, **not** `src/public/`. Add actual project documentation at these paths. Every absent or failed image displays a labeled, abstract placeholder; the placeholder is not research data.

| File to add | Usage |
| --- | --- |
| `public/images/emg/hero.jpg` | EMG tile and case-study hero |
| `public/images/emg/signal.png` | EMG signal figure |
| `public/images/emg/pipeline.png` | EMG full-width pipeline figure |

Update the corresponding alt text and captions to describe the actual images you supply. Homepage/hero media is cropped; article figures preserve their original proportions.

The EEG-to-fMRI images are populated from the submitted NE 422 paper: `public/images/eeg-fmri/mlp-comparison.png`, `unet-comparison.png`, and `transformer-comparison.png`. The Transformer figure is also the homepage/hero image, with `imageFit: 'contain'` to keep its labels visible. The report is available at `public/papers/ne422-final-paper.pdf`.

The SLIM figures are extracted from the supplied URS poster into `public/images/slim/`: `classification.png`, `experimental-design.png`, `workflow.png`, `phase-maps.png`, and `pca-populations.png`. The classification figure is used on the homepage and at the top of the case study. No SLIM image placeholders remain. The original PowerPoint is not bundled with the site.

Resume opens the HTML page at `/#/resume`. Edit `src/data/resume.js` for education, project contribution summaries, and skills. Project names and dates are shared with `src/data/projects.js`. The page uses confirmed portfolio information; no graduation date, GPA, or additional employment history has been assumed. A legacy `/resume.pdf` request served by Vite links to the new page.

## Flexible case studies

The prosthetic homepage tile uses `public/images/prosthetic/second-chance-device.png`, sourced from [Second Chance Innovations](https://secchance.com/public/SCIModel1.png). Its caption identifies it as a later device concept, separate from Jack's earlier prototype contributions.

The in-progress MEA project uses manufacturer reference images saved at `public/images/mea/3brain-chip.jpg` and `3brain-example-data.png`. Sources: [3Brain HD-MEA chips](https://www.3brain.com/products/single-well/hd-mea) and [neuronal-culture examples](https://www.3brain.com/applications/neuronal-stem-cell-cultures). Captions distinguish these from project data. The prosthetic page links to [Second Chance Innovations](https://secchance.com/) as the later continuation and states that Jack is no longer involved.

Each project's `sections` array renders in order. Omit any block that is not useful for that project. Supported examples:

```js
sections: [
  { type: 'text', title: 'Signal acquisition', content: ['First paragraph.', 'Second paragraph.'] },
  { type: 'image', src: '/images/emg/signal.png', alt: 'Description of signal plot', caption: 'Figure caption.' },
  { type: 'full-width-image', src: '/images/emg/pipeline.png', alt: 'Pipeline diagram', caption: 'Full article-width figure.' },
  { type: 'two-column-images', images: [
    { src: '/images/example/first.png', alt: 'First figure', caption: 'First caption.' },
    { src: '/images/example/second.png', alt: 'Second figure', caption: 'Second caption.' },
  ] },
  { type: 'gif', src: '/images/example/demo.gif', alt: 'Describe the demonstration', caption: 'Demo.' },
  { type: 'video', src: '/videos/demo.mp4', poster: '/images/example/poster.jpg', captionsSrc: '/videos/demo.en.vtt', caption: 'Demo video.' },
  { type: 'stats', title: 'Results', items: [{ value: '0.291', label: 'Pearson r' }], caption: 'Evaluation context.' },
  { type: 'external-links', title: 'More', links: [{ label: 'GitHub', href: 'https://github.com/jack-dohrn' }] },
]
```

Text accepts a string or array of paragraphs. Hero images and hero captions are optional. Video uses native controls with no autoplay; provide captions for spoken content. Only report documented measurements. The project content distinguishes ongoing work and planned modeling from achieved results.

Results tables use `{ type: 'table', title, caption, columns: ['Model', 'MSE'], rows: [['EEGNet + MLP', '0.740']] }`. Tables scroll horizontally on small screens and retain row/column headers.

OpenInteraction uses the interface screenshot hosted by Devpost and embeds its Vimeo demonstration. No local image is required for this project. Embedded video blocks use `{ type: 'video-embed', title, src, watchUrl, caption }`, where `src` is the provider's embed URL. The player is responsive, loads lazily, and includes a direct viewing link. Playback depends on the provider's availability and embedding permissions.

## Design

A white background, charcoal typography, #004f90 accents, 1320px content width, and a centered project carousel. Navigation arrows sit beside the project on desktop and below it on mobile. Article text stays narrow, with wider figures and generous spacing. No additional dependencies.
