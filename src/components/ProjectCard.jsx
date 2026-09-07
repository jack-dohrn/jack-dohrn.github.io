import { Link } from 'react-router-dom'
import ProjectImage from './ProjectImage'
import ProjectStatus from './ProjectStatus'

export default function ProjectCard({ project, index }) {
  const showImage = Boolean(project.image) && project.showListImage !== false
  return <article className={`project-tile ${project.featured ? 'project-tile-wide' : ''} ${!showImage ? 'project-without-image' : ''}`}>
    <div className="project-list-meta">
      <p>{project.year}</p><p>{project.type}</p>
      <ProjectStatus project={project} />
    </div>
    <div className="project-list-body">
      <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
      <p>{project.description}</p>
      <p className="project-stack">{project.tags.join(' · ')}</p>
      <Link className="text-link" to={`/projects/${project.slug}`}>View project <span aria-hidden="true">↗</span><span className="sr-only">: {project.title}</span></Link>
    </div>
    {showImage && <Link to={`/projects/${project.slug}`} className="project-list-image" tabIndex={-1} aria-hidden="true">
      <ProjectImage src={project.image} alt="" label={project.shortTitle} tone={project.tone} fit="contain" frameRatio={1.6} crop={project.tileImageCrop || project.imageCrop} eager={index === 0} />
      <div>
        {project.imageCredit && <p className="project-meta">{project.imageCredit}</p>}
      </div>
    </Link>}
  </article>
}
