import { useMemo, useState } from 'react'
import './App.css'

const seedListings = [
  {
    id: 'rest_1',
    name: 'Copper Spoon Grill',
    category: 'restaurants',
    rating: 4.7,
    reviews: 1238,
    location: 'Phoenix, AZ',
    price: '$$',
    tags: ['Steakhouse', 'Family Friendly'],
  },
  {
    id: 'rest_2',
    name: 'Lotus Noodle Bar',
    category: 'restaurants',
    rating: 4.5,
    reviews: 872,
    location: 'Tempe, AZ',
    price: '$',
    tags: ['Thai', 'Late Night'],
  },
  {
    id: 'mov_1',
    name: 'Sunset Cinema Complex',
    category: 'movies',
    rating: 4.6,
    reviews: 1044,
    location: 'Scottsdale, AZ',
    price: '$$',
    tags: ['IMAX', 'Recliner Seating'],
  },
  {
    id: 'mov_2',
    name: 'Indie House Theater',
    category: 'movies',
    rating: 4.4,
    reviews: 519,
    location: 'Mesa, AZ',
    price: '$',
    tags: ['Arthouse', 'Film Festivals'],
  },
  {
    id: 'shop_1',
    name: 'Desert Tech Market',
    category: 'shops',
    rating: 4.3,
    reviews: 768,
    location: 'Gilbert, AZ',
    price: '$$$',
    tags: ['Electronics', 'Repair Desk'],
  },
  {
    id: 'shop_2',
    name: 'Heritage Book Loft',
    category: 'shops',
    rating: 4.8,
    reviews: 634,
    location: 'Chandler, AZ',
    price: '$$',
    tags: ['Books', 'Community Events'],
  },
  {
    id: 'school_1',
    name: 'North Valley STEM Academy',
    category: 'schools',
    rating: 4.6,
    reviews: 448,
    location: 'Glendale, AZ',
    price: 'Public',
    tags: ['STEM', 'College Prep'],
  },
  {
    id: 'school_2',
    name: 'Summit Preparatory School',
    category: 'schools',
    rating: 4.5,
    reviews: 391,
    location: 'Peoria, AZ',
    price: 'Private',
    tags: ['AP Curriculum', 'Sports'],
  },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'movies', label: 'Movies' },
  { id: 'shops', label: 'Shops' },
  { id: 'schools', label: 'Schools' },
]

function App() {
  const [listings, setListings] = useState(seedListings)
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [activeView, setActiveView] = useState('listings')
  const [saveMessage, setSaveMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    category: 'restaurants',
    location: '',
    rating: '',
    review: '',
    tags: '',
  })

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory
      const searchValue = search.trim().toLowerCase()
      const searchMatch =
        !searchValue ||
        item.name.toLowerCase().includes(searchValue) ||
        item.location.toLowerCase().includes(searchValue) ||
        item.tags.join(' ').toLowerCase().includes(searchValue)

      return categoryMatch && searchMatch
    })
  }, [activeCategory, search])

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleOpenAddView = () => {
    setActiveView('add-new')
    setSaveMessage('')
    setErrorMessage('')
  }

  const handleOpenListings = () => {
    setActiveView('listings')
    setErrorMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const name = formData.name.trim()
    const category = formData.category
    const location = formData.location.trim()
    const review = formData.review.trim()
    const ratingValue = Number(formData.rating)

    if (!name || !category || !location || !review || Number.isNaN(ratingValue)) {
      setErrorMessage('Please complete all required fields before saving.')
      setSaveMessage('')
      return
    }

    if (ratingValue < 1 || ratingValue > 5) {
      setErrorMessage('Rating must be a value from 1.0 to 5.0.')
      setSaveMessage('')
      return
    }

    const normalizedTags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const newEntry = {
      id: `user_${Date.now()}`,
      name,
      category,
      rating: Number(ratingValue.toFixed(1)),
      reviews: 1,
      location,
      price: '$$',
      tags: normalizedTags.length > 0 ? normalizedTags : ['Community Added'],
      review,
    }

    setListings((current) => [newEntry, ...current])
    setActiveCategory('all')
    setSearch('')
    setActiveView('listings')
    setSaveMessage(`Saved "${newEntry.name}" and added it to Listings.`)
    setErrorMessage('')
    setFormData({
      name: '',
      category: 'restaurants',
      location: '',
      rating: '',
      review: '',
      tags: '',
    })
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-badge">Yelp-style local discovery demo</div>
        <h1>Project Yelp Clone</h1>
        <p className="hero-copy">
          Browse dummy listings for restaurants, movies, shops, and schools. This React frontend is
          prepared for an eventual AWS backend.
        </p>
        <div className="hero-metrics" aria-label="Dataset highlights">
          <span>{listings.length} listings</span>
          <span>{categories.length - 1} categories</span>
          <span>Dummy local dataset</span>
        </div>
        <nav className="view-nav" aria-label="Primary views">
          <button
            type="button"
            className={`view-btn ${activeView === 'listings' ? 'active' : ''}`}
            onClick={handleOpenListings}
          >
            Listings
          </button>
          <button
            type="button"
            className={`view-btn ${activeView === 'add-new' ? 'active' : ''}`}
            onClick={handleOpenAddView}
          >
            Add New
          </button>
        </nav>
      </header>

      {activeView === 'listings' ? (
        <>
          <section className="panel controls-panel">
            <div className="search-wrap">
              <label htmlFor="listing-search">Search</label>
              <input
                id="listing-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, location, or tags"
              />
            </div>

            <div className="category-tabs" role="tablist" aria-label="Listing categories">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  className={`tab-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="results-head">
              <h2>Listings</h2>
              <span className="results-count">{filteredListings.length} results</span>
            </div>

            {saveMessage ? <p className="status-message">{saveMessage}</p> : null}

            <div className="grid">
              {filteredListings.map((item) => (
                <article key={item.id} className="card">
                  <p className="card-category">{item.category}</p>
                  <div className="card-top">
                    <h3>{item.name}</h3>
                    <span className="price">{item.price}</span>
                  </div>
                  <p className="meta meta-location">{item.location}</p>
                  <p className="meta meta-rating">
                    <strong>{item.rating}</strong> stars · {item.reviews.toLocaleString()} reviews
                  </p>
                  {item.review ? <p className="card-review">{item.review}</p> : null}
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="panel add-new-panel">
          <div className="results-head">
            <h2>Add New</h2>
            <span className="results-count">Create business/review entry</span>
          </div>

          <form className="add-form" onSubmit={handleSubmit} noValidate>
            <label className="form-field" htmlFor="add-name">
              Name *
              <input
                id="add-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Business name"
                required
              />
            </label>

            <label className="form-field" htmlFor="add-category">
              Category *
              <select
                id="add-category"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                required
              >
                {categories
                  .filter((category) => category.id !== 'all')
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
              </select>
            </label>

            <label className="form-field" htmlFor="add-location">
              Location *
              <input
                id="add-location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleFormChange}
                placeholder="City, ST"
                required
              />
            </label>

            <label className="form-field" htmlFor="add-rating">
              Rating (1.0 to 5.0) *
              <input
                id="add-rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleFormChange}
                placeholder="4.5"
                required
              />
            </label>

            <label className="form-field form-field-wide" htmlFor="add-review">
              Short review / description *
              <textarea
                id="add-review"
                name="review"
                value={formData.review}
                onChange={handleFormChange}
                placeholder="Share a short summary of the experience"
                rows={4}
                required
              />
            </label>

            <label className="form-field form-field-wide" htmlFor="add-tags">
              Tags (optional, comma separated)
              <input
                id="add-tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleFormChange}
                placeholder="Friendly service, Outdoor seating"
              />
            </label>

            {errorMessage ? <p className="status-message status-error">{errorMessage}</p> : null}

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Save Entry
              </button>
              <button type="button" className="tab-btn" onClick={handleOpenListings}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="panel split">
        <article className="detail-block">
          <h3>Dummy data sources</h3>
          <ul>
            <li>local_listings_seed.json</li>
            <li>review_activity_snapshot.csv</li>
            <li>category_rankings_demo.parquet</li>
          </ul>
        </article>
        <article className="detail-block">
          <h3>AWS backend roadmap</h3>
          <ul>
            <li>API Gateway + Lambda query endpoints</li>
            <li>DynamoDB for listings and review aggregates</li>
            <li>OpenSearch for text search and ranking</li>
            <li>S3 + EventBridge for data ingestion pipelines</li>
          </ul>
        </article>
      </section>
    </div>
  )
}

export default App