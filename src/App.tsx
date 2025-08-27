import { Link, Route, Routes } from 'react-router-dom'
import ProductList from './pages/ProductList'

function ProductDetail() {
  return <h1>Product detail</h1> 
}

export default function App() {
  return (
    <>
      <header style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ fontWeight: 700 }}>react-catalog</Link>
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
