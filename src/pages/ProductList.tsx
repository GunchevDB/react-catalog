import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/fakestore'
import type { Product } from '../lib/types'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let on = true
    fetchProducts()
      .then(data => { if (on) setProducts(data) })
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false))
    return () => { on = false }
  }, [])

  if (loading) return <p role="status">Loading products…</p>
  if (error) return <p role="alert">Error: {error}</p>

  return (
    <section className="container">
      <h1 className="sr-only">Products</h1>
      <ul className="grid" role="list">
        {products.map(p => (
          <li key={p.id}><ProductCard p={p} /></li>
        ))}
      </ul>
    </section>
  )
}
