import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import projects from '../data/projects'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { pathname } = useLocation()
  const [projectsOpen, setProjectsOpen] = useState(false)
  const dropdown = useRef(null)
  const toggle = useRef(null)
  useEffect(() => {
    if (!projectsOpen) return
    const closeOutside = event => {
      if (!dropdown.current?.contains(event.target)) setProjectsOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [projectsOpen])
  const Name = pathname === '/' ? 'h1' : 'p'
  return <header className="navbar shell">
    <Name className="site-name"><Link to="/" className="logo">Jack Dohrn</Link></Name>
    <p className="site-tagline">Neural engineering · Neurotechnology · Machine learning </p>
    <nav className="nav-links" aria-label="Main navigation">
      <div className="projects-dropdown" ref={dropdown} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setProjectsOpen(false)
      }} onKeyDown={event => {
        if (event.key === 'Escape') { setProjectsOpen(false); toggle.current?.focus() }
      }}>
        <button className="projects-toggle" type="button" ref={toggle} aria-expanded={projectsOpen} aria-controls="project-navigation" onClick={() => setProjectsOpen(open => !open)}>Projects <svg className="dropdown-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        <ul className="project-dropdown-list" id="project-navigation" hidden={!projectsOpen}>
          {projects.map(project => <li key={project.slug}><Link to={`/projects/${project.slug}`} aria-current={pathname === `/projects/${project.slug}` ? 'page' : undefined} onClick={() => setProjectsOpen(false)}>{project.title}</Link></li>)}
        </ul>
      </div>
      <Link to="/#about">About</Link>
      <Link to="/#contact">Contact</Link>
      <Link to="/resume" aria-current={pathname === '/resume' ? 'page' : undefined}>Resume</Link>
      <a href="https://www.linkedin.com/in/jack-dohrn-36a359290/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      <a href="https://github.com/jack-dohrn" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      <ThemeToggle />
    </nav>
  </header>
}
