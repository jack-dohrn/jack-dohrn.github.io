import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'

export default function Home() {
  return <>
    <Navbar />
    <main id="main-content" className="shell">
      <section className="projects-section" id="projects" aria-labelledby="projects-title">
        <div className="section-header"><h2 className="eyebrow" id="projects-title">Selected projects</h2><span className="eyebrow muted">{projects.length} projects</span></div>
        <div className="project-list">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
      </section>
      <section className="about-section" id="about" aria-labelledby="about-title">
        <div><p className="eyebrow">About</p><h2 id="about-title">Connecting neuroscience<br />and engineering.</h2></div>
        <div className="about-text">
          <p>I’m pursuing a B.S. in Neural Engineering with a minor in Computer Science at the University of Illinois Urbana-Champaign.</p>
          <p>I enjoy working across the full pipeline: biological signal acquisition and experiments, signal processing, machine learning, and real-time interfaces. My interests connect computational neuroscience with the practical development of neural interfaces and assistive technology.</p>
          <a className="text-link" href="mailto:jcdohrn2@illinois.edu">Get in touch ↗</a>
        </div>
      </section>
      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">Get in touch</h2>
        <p>I'm interested in neural interfaces, biological signals, and assistive technology. Email is the best way to reach me.</p>
        <div className="project-links">
          <a className="text-link" href="mailto:jcdohrn2@illinois.edu">jcdohrn2@illinois.edu ↗</a>
          <a className="text-link" href="https://github.com/jack-dohrn" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a className="text-link" href="https://www.linkedin.com/in/jack-dohrn-36a359290/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </section>
    </main>
    <Footer />
  </>
}
