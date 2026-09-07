import { Link } from 'react-router-dom'
import ProjectImage from './ProjectImage'

export default function ProjectCard({ project, index }) {
  return <article className={`project-tile ${project.featured ? 'project-tile-wide' : ''}`}>
    <Link to={`/projects/${project.slug}`} className="project-tile-link">
      <ProjectImage src={project.image} alt={project.tileImageAlt || project.imageAlt} label={project.shortTitle} tone={project.tone} fit="contain" frameRatio={1.6} crop={project.tileImageCrop || project.imageCrop} eager={index === 0} />
      <div className="tile-caption">
        <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div><h3>{project.title}</h3><p className="project-meta">{project.type} / {project.year}</p>{project.imageCredit && <p className="project-meta">{project.imageCredit}</p>}</div>
        <span className="tile-arrow" aria-hidden="true">↗</span>
      </div>
    </Link>
  </article>
}
