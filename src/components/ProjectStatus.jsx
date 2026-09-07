export default function ProjectStatus({ project }) {
  return project.status === 'active' ? <span className="project-status"><span aria-hidden="true" />Active</span> : null
}
