import ProductGrid from '../components/products/ProductGrid'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import { useProducts } from '../hooks/useProducts'

export default function ProductsPage() {
  const { data, loading, error, reload } = useProducts()

  return (
    <section className="page page-wide">
      <header className="page-header">
        <h1 className="page-title">Produk</h1>
        <p className="page-text">Jelajahi seluruh produk yang tersedia.</p>
      </header>
      {loading ? <Loader /> : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={reload} /> : null}
      {!loading && !error && data ? <ProductGrid products={data} /> : null}
    </section>
  )
}
