import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'

export default function Home() {
  const [slide, setSlide] = useState({ index: 0, previous: null, direction: 1, sequence: 0 })
  const activeIndex = slide.index
  const changeProject = (direction) => setSlide(current => ({
    index: (current.index + direction + projects.length) % projects.length,
    previous: current.index,
    direction,
    sequence: current.sequence + 1,
  }))
  useEffect(() => {
    if (slide.previous === null) return
    const timer = setTimeout(() => setSlide(current => ({ ...current, previous: null })), 420)
    return () => clearTimeout(timer)
  }, [slide.sequence, slide.previous])
  return <>
    <Navbar />
    <main id="main-content" className="shell">
      <section className="projects-section" id="projects" aria-labelledby="projects-title">
        <div className="section-header"><h2 className="eyebrow" id="projects-title">Selected projects</h2><span className="eyebrow muted">{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span></div>
        <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects" onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            changeProject(event.key === 'ArrowLeft' ? -1 : 1)
          }
        }}>
          <button className="carousel-arrow carousel-previous" type="button" aria-label="Previous project" onClick={() => changeProject(-1)}>←</button>
          <div className="carousel-slide" id="active-project" style={{ '--slide-direction': slide.direction }}>
            {slide.previous !== null && <div key={`out-${slide.sequence}`} className="carousel-outgoing" aria-hidden="true" inert>
              <ProjectCard project={projects[slide.previous]} index={slide.previous} />
            </div>}
            <div key={`in-${slide.sequence}`} className={slide.previous !== null ? 'carousel-incoming' : undefined} aria-live="polite" aria-atomic="true">
              <ProjectCard project={projects[activeIndex]} index={activeIndex} />
            </div>
          </div>
          <button className="carousel-arrow carousel-next" type="button" aria-label="Next project" onClick={() => changeProject(1)}>→</button>
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
    </main>
    <Footer />
  </>
}
