import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct } from '../api/fakestore'
import type { Product } from '../lib/types'

export default function ProductDetail() {
  const { id } = useParams()
  const [p, setP] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let on = true
    fetchProduct(id)
      .then(prod => on && setP(prod))
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false))
    return () => { on = false }
  }, [id])

  if (loading) return <p role="status">Loading…</p>
  if (error || !p) return <p role="alert">Not found.</p>

  return (
    <article className="detail" style={{ maxWidth: 900, margin: '0 auto', padding: '1rem' }}>
      <Link to="/">← Back to products</Link>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr' }}>
        <img src={p.image} alt={p.title} loading="lazy" style={{ maxHeight: 400, objectFit: 'contain' }} />
        <div>
          <h1>{p.title}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${p.price.toFixed(2)}</p>
          <p aria-label={`Rating ${p.rating.rate} out of 5`}>
            ⭐ {p.rating.rate.toFixed(1)} ({p.rating.count})
          </p>
          <p>{p.description}</p>
        </div>
      </div>
    </article>
  )
}
