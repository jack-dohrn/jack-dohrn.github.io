import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import Resume from './pages/Resume'
import './App.css'

function RouteScroll() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = hash && document.getElementById(hash.slice(1))
      if (target) target.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])
  return null
}

export default function App() {
  // Vite's HTML fallback can serve this app when the public PDF is missing.
  // Avoid mounting HashRouter on a file URL, where links retain /resume.pdf.
  if (window.location.pathname === `${import.meta.env.BASE_URL}resume.pdf`) {
    return <main className="project-page shell" id="main-content">
      <h1>Resume</h1>
      <p>The resume is now available as a page on this site.</p>
      <a className="back-link" href={`${import.meta.env.BASE_URL}#/resume`}>View resume →</a>
    </main>
  }

  return <HashRouter>
    <RouteScroll />
    <a className="skip-link" href="#main-content" onClick={(event) => {
      event.preventDefault()
      const main = document.getElementById('main-content')
      main?.setAttribute('tabindex', '-1')
      main?.focus()
      main?.scrollIntoView()
    }}>Skip to content</a>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  </HashRouter>
}
