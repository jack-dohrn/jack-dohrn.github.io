export default function ProjectTeam({ project }) {
  if (!project.teamSize) return null
  return <span className="project-team">{project.teamLabel || (project.teamSize === 1 ? 'Solo project' : `${project.teamSize}-person team`)}</span>
}
