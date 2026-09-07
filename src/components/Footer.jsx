export default function Footer() {
  return <footer className="footer shell">
    <p>© {new Date().getFullYear()} Jack Dohrn</p>
    <div className="footer-links">
      <a href="https://github.com/jack-dohrn" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      <a href="https://www.linkedin.com/in/jack-dohrn-36a359290/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      <a href="mailto:jcdohrn2@illinois.edu">Email ↗</a>
    </div>
  </footer>
}
