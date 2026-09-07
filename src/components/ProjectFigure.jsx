import ProjectImage from './ProjectImage'

export default function ProjectFigure({ src, alt, caption, className, ...imageProps }) {
  if (!src) return null
  const href = src.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src
  return <figure className={className}>
    <a className="figure-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${alt || 'Project figure'} (new tab)`}>
      <ProjectImage src={src} alt={alt} {...imageProps} />
    </a>
    <figcaption>{caption && <>{caption} </>}<a className="text-link" href={href} target="_blank" rel="noopener noreferrer">View full-size image <span aria-hidden="true">↗</span><span className="sr-only"> (new tab)</span></a></figcaption>
  </figure>
}
