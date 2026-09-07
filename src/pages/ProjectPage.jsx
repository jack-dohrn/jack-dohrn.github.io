import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectImage from '../components/ProjectImage'
import CaseStudySection from '../components/CaseStudySection'
import projects from '../data/projects'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find(item => item.slug === slug)
  const next = project && projects[(projects.indexOf(project) + 1) % projects.length]
  return <>
    <Navbar />
    <main id="main-content" className="project-page shell">
      <Link to="/#projects" className="back-link">← Back to projects</Link>
      {project ? <article>
        <header className="project-page-header">
          <p className="eyebrow">{project.type} / {project.year}</p>
          <h1>{project.title}</h1>
          <p className="project-lead">{project.description}</p>
        </header>
        {project.heroImage && <figure className="project-hero-image"><ProjectImage src={project.heroImage} alt={project.imageAlt} label={project.shortTitle} tone={project.tone} fit={project.imageFit} crop={project.imageCrop} eager />{project.heroCaption && <figcaption>{project.heroCaption}</figcaption>}</figure>}
        <div className="case-sections">{project.sections.map((section, index) => <CaseStudySection key={`${project.slug}-${index}`} section={section} project={project} />)}</div>
        {(project.github || project.demo) && <CaseStudySection project={project} section={{ type: 'external-links', title: 'Explore the project', links: [project.github && { label: 'GitHub', href: project.github }, project.demo && { label: 'View demo', href: project.demo }].filter(Boolean) }} />}
        <Link to={`/projects/${next.slug}`} className="next-project"><span className="eyebrow">Next project</span><span>{next.title} <span aria-hidden="true">↗</span></span></Link>
      </article> : <h1>Project not found</h1>}
    </main>
    <Footer />
  </>
}
