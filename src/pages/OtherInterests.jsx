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
        <p className="muted">More to come.</p>
      </header>
    </main>
    <Footer />
  </>
}
