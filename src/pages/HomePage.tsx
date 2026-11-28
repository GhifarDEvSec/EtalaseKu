import { useCallback, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ApiInfoPanel from '../components/api/ApiInfoPanel'
import ProductCardSkeleton from '../components/products/ProductCardSkeleton'
import ProductGrid from '../components/products/ProductGrid'
import Button from '../components/ui/Button'
import { appConfig } from '../config'
import { useFetch } from '../hooks/useFetch'
import { usePageTitle } from '../hooks/usePageTitle'
import { useProducts } from '../hooks/useProducts'
import { fetchCategories } from '../services/productService'
import { formatCategoryLabel } from '../utils/productQuery'

export default function HomePage() {
  usePageTitle('Beranda')
  const navigate = useNavigate()
  const [term, setTerm] = useState('')
  const categoriesFetcher = useCallback(() => fetchCategories(), [])
  const { data: categories, loading: categoriesLoading } = useFetch<string[]>(categoriesFetcher)
  const { data: products, loading: productsLoading } = useProducts()

  const featuredProducts = useMemo(() => {
    return [...(products ?? [])].sort((first, second) => second.rating - first.rating).slice(0, 4)
  }, [products])

  const popularCategories = useMemo(() => categories?.slice(0, 8) ?? [], [categories])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = term.trim()
    navigate(query === '' ? '/produk' : `/produk?q=${encodeURIComponent(query)}`)
  }

  const handleCategorySelect = (category: string) => {
    navigate(`/produk?kategori=${encodeURIComponent(category)}`)
  }

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">Selamat datang di {appConfig.appName}</p>
          <h1 className="home-title">Temukan produk pilihan dengan mudah dan cepat.</h1>
          <p className="home-text">
            Jelajahi katalog, bandingkan harga dalam Rupiah, dan simpan produk favorit Anda di satu
            tempat.
          </p>
          <form className="home-search" onSubmit={handleSearch}>
            <label className="control-label" htmlFor="home-search-input">
              Cari produk
            </label>
            <div className="home-search-row">
              <input
                id="home-search-input"
                className="search-input"
                type="search"
                value={term}
                placeholder="Cari produk, kategori, atau merek"
                onChange={(event) => setTerm(event.target.value)}
              />
              <Button type="submit">Cari</Button>
            </div>
          </form>
          <div className="home-actions">
            <Link className="btn btn-primary" to="/produk">
              Lihat Produk
            </Link>
            <Link className="btn btn-neutral" to="/favorit">
              Favorit Saya
            </Link>
          </div>
        </div>
        <div className="home-decoration" aria-hidden="true">
          <span className="home-shape home-shape-one" />
          <span className="home-shape home-shape-two" />
          <span className="home-shape home-shape-three" />
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-title">Kategori Populer</h2>
        {categoriesLoading ? <p className="home-section-text">Memuat kategori...</p> : null}
        {!categoriesLoading && popularCategories.length > 0 ? (
          <div className="chip-row">
            {popularCategories.map((category) => (
              <button
                key={category}
                type="button"
                className="chip"
                onClick={() => handleCategorySelect(category)}
              >
                {formatCategoryLabel(category)}
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section className="home-section">
        <h2 className="section-title">Produk Pilihan</h2>
        {productsLoading ? (
          <div className="product-grid">
            {Array.from({ length: 4 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <ProductGrid products={featuredProducts} />
        )}
      </section>

      <section className="home-section">
        <ApiInfoPanel />
      </section>
    </>
  )
}
