import { useEffect, useMemo, useState } from 'react'
import { fetchProducts, fetchCategories } from '../api/fakestore'
import type { Product } from '../lib/types'
import ProductCard from '../components/ProductCard'
import SearchBox from '../components/SearchBox'
import Filters from '../components/Filters'
import SortMenu, { type SortKey } from '../components/SortMenu'
import { useDebounce } from '../hooks/debounce'

export default function ProductList() {
  const [all, setAll] = useState<Product[]>([])
  const [cats, setCats] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [q, setQ] = useState('')
  const dq = useDebounce(q, 300)

  const [category, setCategory] = useState('')
  const [range, setRange] = useState<[number, number]>([0, 0])
  const [sort, setSort] = useState<SortKey>('price-asc')

  useEffect(() => {
    let on = true
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([products, categories]) => {
        if (!on) return
        setAll(products)
        setCats(categories)
        const prices = products.map(p => p.price)
        const min = Math.floor(Math.min(...prices))
        const max = Math.ceil(Math.max(...prices))
        setRange([min, max])
      })
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false))
    return () => { on = false }
  }, [])

  const filtered = useMemo(() => {
    const term = dq.trim().toLowerCase()
    let list = all
    if (category) list = list.filter(p => p.category === category)
    list = list.filter(p => p.price >= range[0] && p.price <= range[1])
    if (term) list = list.filter(p =>
      p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    )
    list = [...list].sort((a, b) =>
      sort === 'price-asc' ? a.price - b.price : b.price - a.price
    )
    return list
  }, [all, category, range, dq, sort])

  if (loading) return <p role="status">Loading products…</p>
  if (error) return <p role="alert">Error: {error}</p>

  const priceMin = all.length ? Math.floor(Math.min(...all.map(p => p.price))) : 0
  const priceMax = all.length ? Math.ceil(Math.max(...all.map(p => p.price))) : 0

  return (
    <section className="container" style={{ display: 'grid', gap: '1rem' }}>
      <div className="toolbar" style={{ display: 'grid', gap: '.75rem', gridTemplateColumns: '1fr', alignItems: 'end' }}>
        <SearchBox value={q} onChange={setQ} />
        <Filters
          categories={cats}
          category={category}
          setCategory={setCategory}
          priceMin={priceMin}
          priceMax={priceMax}
          range={range}
          setRange={setRange}
        />
        <SortMenu value={sort} onChange={setSort} />
      </div>

      {filtered.length === 0 ? (
        <p role="status">No products match your filters.</p>
      ) : (
        <ul className="grid" role="list">
          {filtered.map(p => (
            <li key={p.id}><ProductCard p={p} /></li>
          ))}
        </ul>
      )}
    </section>
  )
}
