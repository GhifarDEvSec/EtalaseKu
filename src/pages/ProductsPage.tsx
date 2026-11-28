import { useCallback, useMemo, useRef } from 'react'
import CategoryChips from '../components/products/CategoryChips'
import Pagination from '../components/products/Pagination'
import ProductCardSkeleton from '../components/products/ProductCardSkeleton'
import ProductGrid from '../components/products/ProductGrid'
import SearchBar from '../components/products/SearchBar'
import SortSelect from '../components/products/SortSelect'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import ErrorMessage from '../components/ui/ErrorMessage'
import { useFetch } from '../hooks/useFetch'
import { usePageTitle } from '../hooks/usePageTitle'
import { useProductQuery } from '../hooks/useProductQuery'
import { useProducts } from '../hooks/useProducts'
import { useToast } from '../hooks/useToast'
import { fetchCategories } from '../services/productService'
import { PAGE_SIZE, filterProducts, paginateProducts, sortProducts } from '../utils/productQuery'

export default function ProductsPage() {
  usePageTitle('Produk')

  const { query, setSearch, setCategory, setSort, setPage, reset } = useProductQuery()
  const { data, loading, error, reload } = useProducts()
  const { showToast } = useToast()

  const categoriesFetcher = useCallback(() => fetchCategories(), [])
  const { data: categories } = useFetch<string[]>(categoriesFetcher)

  const listTopRef = useRef<HTMLDivElement>(null)

  const products = useMemo(() => data ?? [], [data])

  const filteredProducts = useMemo(
    () => filterProducts(products, query.q, query.category),
    [products, query.q, query.category],
  )

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, query.sort),
    [filteredProducts, query.sort],
  )

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE))
  const currentPage = Math.min(query.page, totalPages)

  const visibleProducts = useMemo(
    () => paginateProducts(sortedProducts, currentPage, PAGE_SIZE),
    [sortedProducts, currentPage],
  )

  const hasActiveFilter = query.q !== '' || query.category !== '' || query.sort !== 'default'

  const handleReset = () => {
    reset()
    showToast('Filter produk berhasil direset.', 'info')
  }

  return (
    <section className="page page-wide">
      <header className="page-header">
        <h1 className="page-title">Produk</h1>
        <p className="page-text">
          {loading ? 'Memuat produk...' : `${sortedProducts.length} produk ditemukan`}
        </p>
      </header>

      <div className="product-controls">
        <div className="product-controls-row">
          <SearchBar value={query.q} onSearch={setSearch} />
          <SortSelect value={query.sort} onChange={setSort} />
        </div>
        <div className="product-controls-chips">
          <CategoryChips categories={categories ?? []} value={query.category} onChange={setCategory} />
          {hasActiveFilter ? (
            <Button variant="neutral" onClick={handleReset}>
              Reset
            </Button>
          ) : null}
        </div>
      </div>

      <div ref={listTopRef} className="product-list-anchor" />

      {loading ? (
        <div className="product-grid">
          {Array.from({ length: 8 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={reload} /> : null}
      {!loading && !error ? (
        sortedProducts.length === 0 ? (
          <EmptyState
            message="Produk tidak ditemukan"
            description="Coba ubah kata kunci atau kategori pencarian Anda."
          />
        ) : (
          <>
            <ProductGrid products={visibleProducts} />
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onChange={setPage}
              scrollTargetRef={listTopRef}
            />
          </>
        )
      ) : null}
    </section>
  )
}
