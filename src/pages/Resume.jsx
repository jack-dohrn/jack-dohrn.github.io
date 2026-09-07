import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import resume from '../data/resume'

export default function Resume() {
  return <>
    <Navbar />
    <main id="main-content" className="resume-page shell">
      <header className="resume-header">
        <p className="eyebrow">Jack Dohrn</p>
        <h1>Resume</h1>
        <p>{resume.headline}</p>
        <p>{resume.location}</p>
        <div className="project-links">
          <a className="text-link" href="tel:+16184986176">{resume.phone}</a>
          <a className="text-link" href="mailto:jcdohrn2@illinois.edu">Email ↗</a>
          <a className="text-link" href="https://github.com/jack-dohrn" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a className="text-link" href="https://www.linkedin.com/in/jack-dohrn-36a359290/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </header>
      <section className="resume-section" aria-labelledby="resume-education">
        <h2 id="resume-education">Education</h2>
        <div>
          <h3>{resume.education.school}</h3>
          <p>{resume.education.degree}<br />{resume.education.detail}</p>
          <p>{resume.education.honors.join(' · ')}</p>
          <p><strong>Relevant coursework:</strong> {resume.education.coursework}</p>
        </div>
      </section>
      <section className="resume-section" aria-labelledby="resume-skills">
        <h2 id="resume-skills">Technical skills</h2>
        <div>{resume.skills.map(skill => <div className="resume-entry" key={skill.title}><h3>{skill.title}</h3><p>{skill.detail}</p></div>)}</div>
      </section>
      <section className="resume-section" aria-labelledby="resume-projects">
        <h2 id="resume-projects">Research & projects</h2>
        <div>{resume.projects.map(entry => {
          return <article className="resume-entry" key={entry.title}>
            <p className="eyebrow muted">{entry.date}</p>
            <h3>{entry.slug ? <Link to={`/projects/${entry.slug}`}>{entry.title} <span aria-hidden="true">↗</span></Link> : entry.title}</h3>
            <p>{entry.organization}</p>
            <ul>{entry.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
            <p className="resume-tags">{entry.tags.join(' · ')}</p>
          </article>
        })}</div>
      </section>
      <section className="resume-section" aria-labelledby="resume-experience">
        <h2 id="resume-experience">Work experience</h2>
        <div>{resume.experience.map(entry => <article className="resume-entry" key={entry.title}>
          <p className="eyebrow muted">{entry.date}</p>
          <h3>{entry.title}</h3>
          <p>{entry.location}</p>
          <p>{entry.description}</p>
        </article>)}</div>
      </section>
      <p className="resume-updated muted">Last updated {resume.updated}</p>
    </main>
    <Footer />
  </>
}
