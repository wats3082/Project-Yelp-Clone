import './App.css'

const links = [
  { id: 'game', label: 'Open game', href: './castle-of-the-damned.html' },
  { id: 'repo', label: 'Source repo', href: 'https://github.com/wats3082/Game_CastleoftheDamned' },
  { id: 'pages', label: 'GitHub Pages', href: 'https://wats3082.github.io/Game_CastleoftheDamned/' },
]

function App() {
  return (
    <div className="app-shell">
      <main className="hero panel">
        <div className="hero-badge">Castle of the Damned</div>
        <h1>3 levels + boss</h1>
        <p className="hero-copy">
          The playable build is in <code>castle-of-the-damned.html</code>. Use the links below to open it or publish the
          repo to GitHub Pages.
        </p>
        <div className="view-nav">
          {links.map((l) => (
            <a key={l.id} className="view-btn" href={l.href} target={l.id === 'repo' ? '_blank' : '_self'} rel={l.id === 'repo' ? 'noreferrer' : undefined}>
              {l.label}
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
