import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function OtherInterests() {
  return <>
    <Navbar />
    <main id="main-content" className="project-page shell">
      <Link to="/#about" className="back-link">← Back to about</Link>
      <header className="project-page-header">
        <h1>Other Interests</h1>
        <p className="project-lead">A space for side projects and interests outside engineering.</p>
      </header>
      <div className="case-sections">
        <section className="case-text" aria-labelledby="romeblox-title">
          <p className="eyebrow">Game development · In progress</p>
          <h2 id="romeblox-title">Romeblox</h2>
          <p>I’m developing Romeblox, a political simulation and strategy game on Roblox. The game centers on a fully simulated economy and political system, with players shaping its direction through their decisions and interactions.</p>
          <p>To support development, I built custom Model Context Protocol (MCP) tools that represent the codebase as a graph. This gives coding agents a structured way to navigate the code and follow relationships between its parts.</p>
        </section>
        <section className="case-text" aria-labelledby="chi-psi-title">
          <h2 id="chi-psi-title">Chi Psi — Alpha Zeta Delta</h2>
          <p>I’m a member of Chi Psi, where I’ve served as Mental Health Chair, Historian, and Traditions Keeper (#5).</p>
        </section>
      </div>
    </main>
    <Footer />
  </>
}
