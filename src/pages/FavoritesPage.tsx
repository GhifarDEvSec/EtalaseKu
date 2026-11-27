import { Link } from 'react-router-dom'
import ProductGrid from '../components/products/ProductGrid'
import EmptyState from '../components/ui/EmptyState'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import { useFavorites } from '../hooks/useFavorites'
import { useProducts } from '../hooks/useProducts'

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites()
  const { data, loading, error, reload } = useProducts()

  const favoriteProducts = (data ?? []).filter((product) => favoriteIds.includes(product.id))

  return (
    <section className="page page-wide">
      <header className="page-header">
        <h1 className="page-title">Favorit</h1>
        <p className="page-text">Produk yang Anda tandai sebagai favorit.</p>
      </header>
      {loading ? <Loader /> : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={reload} /> : null}
      {!loading && !error ? (
        favoriteProducts.length === 0 ? (
          <div className="favorites-empty">
            <EmptyState
              message="Belum ada produk favorit"
              description="Tandai produk favorit dari daftar produk untuk melihatnya di sini."
            />
            <Link className="btn btn-primary" to="/produk">
              Jelajahi Produk
            </Link>
          </div>
        ) : (
          <ProductGrid products={favoriteProducts} />
        )
      ) : null}
    </section>
  )
}
