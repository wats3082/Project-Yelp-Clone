import './App.css'

const movies = [
  { title: 'Zero-Day Protocol', score: 4.8, reviews: 1390 },
  { title: 'Cloudwatch Nights', score: 4.4, reviews: 820 },
  { title: 'Incident Response', score: 4.7, reviews: 1142 },
]

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">React demo</p>
        <h1>Movie Review Database</h1>
        <p>Dummy review catalog with summary metrics and an AWS-ready architecture path.</p>
        <p className="standard-note">Project standard UI shell</p>
      </header>

      <section className="panel">
        <h2>Top rated this week</h2>
        <div className="grid">
          {movies.map((movie) => (
            <article key={movie.title} className="card">
              <h3>{movie.title}</h3>
              <p>Score: {movie.score}/5</p>
              <p>{movie.reviews.toLocaleString()} reviews</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel split">
        <article>
          <h3>Dummy data sources</h3>
          <ul>
            <li>movie_metadata.json</li>
            <li>review_events.csv</li>
            <li>genre_heatmap_snapshot.parquet</li>
          </ul>
        </article>
        <article>
          <h3>AWS backend roadmap</h3>
          <ul>
            <li>API Gateway + Lambda review service</li>
            <li>DynamoDB for movies/reviews</li>
            <li>SQS/EventBridge for async moderation</li>
          </ul>
        </article>
      </section>
    </div>
  )
}

export default App