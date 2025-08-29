import { Link, Route, Routes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  return (
    <>
      <header style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ fontWeight: 700 }}>React Catalog</Link>
      </header>
      <main style={{ padding: '12px' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </>
  )
}
