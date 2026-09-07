import { useState } from 'react'
import Figure from './ProjectFigure'

function Video({ section }) {
  const [failed, setFailed] = useState(false)
  return <figure>{section.src && !failed ?
    <video controls playsInline preload="metadata" poster={section.poster} onError={() => setFailed(true)} aria-label={section.title || section.caption || 'Project video'}>
      <source src={section.src} onError={() => setFailed(true)} />{section.captionsSrc && <track kind="captions" src={section.captionsSrc} srcLang="en" label="English" default />}
    </video> : <p className="media-unavailable">Video forthcoming.</p>}
    {section.caption && <figcaption>{section.caption}</figcaption>}
  </figure>
}

export default function CaseStudySection({ section, project }) {
  const imageProps = { label: project.shortTitle, tone: project.tone, ...section }
  switch (section.type) {
    case 'text':
      return <section className="case-text">{section.title && <h2>{section.title}</h2>}{(Array.isArray(section.content) ? section.content : [section.content]).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</section>
    case 'image':
    case 'gif':
      return <div className="case-image"><Figure {...imageProps} /></div>
    case 'full-width-image':
      return <div className="case-full-image"><Figure {...imageProps} /></div>
    case 'two-column-images':
      return <div className="case-image-pair">{section.images.map((item, i) => <Figure key={i} label={project.shortTitle} tone={project.tone} {...item} />)}</div>
    case 'video':
      return <div className="case-image"><Video section={section} /></div>
    case 'video-embed':
      return <figure className="case-image">
        <iframe className="video-embed" src={section.src} title={section.title || 'Project demonstration'} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        <figcaption>{section.caption}{section.watchUrl && <> <a className="text-link" href={section.watchUrl} target="_blank" rel="noopener noreferrer">Watch on Vimeo ↗</a></>}</figcaption>
      </figure>
    case 'stats':
      return <section className="case-stats">{section.title && <h2>{section.title}</h2>}<dl>{section.items.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>{section.caption && <p className="stats-caption">{section.caption}</p>}</section>
    case 'table':
      return <section className="case-table"><h2>{section.title}</h2><div className="table-scroll" role="region" aria-label={section.title} tabIndex={0}><table><caption>{section.caption}</caption><thead><tr>{section.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{section.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div></section>
    case 'external-links':
      return <section className="case-text">{section.title && <h2>{section.title}</h2>}<div className="project-links">{section.links.map(link => <a className="text-link" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div></section>
    default:
      return null
  }
}
