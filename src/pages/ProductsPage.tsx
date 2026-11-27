import { useCallback, useMemo, useRef } from 'react'
import CategoryFilter from '../components/products/CategoryFilter'
import Pagination from '../components/products/Pagination'
import ProductGrid from '../components/products/ProductGrid'
import SearchBar from '../components/products/SearchBar'
import SortSelect from '../components/products/SortSelect'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import { useFetch } from '../hooks/useFetch'
import { useProductQuery } from '../hooks/useProductQuery'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import { fetchCategories } from '../services/productService'
import { PAGE_SIZE, filterProducts, paginateProducts, sortProducts } from '../utils/productQuery'

export default function ProductsPage() {
  usePageTitle('Produk')

  const { query, setSearch, setCategory, setSort, setPage, reset } = useProductQuery()
  const { data, loading, error, reload } = useProducts()

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

  return (
    <section className="page page-wide">
      <header className="page-header">
        <h1 className="page-title">Produk</h1>
        <p className="page-text">Jelajahi seluruh produk yang tersedia.</p>
      </header>

      <div className="product-controls">
        <SearchBar value={query.q} onSearch={setSearch} />
        <CategoryFilter categories={categories ?? []} value={query.category} onChange={setCategory} />
        <SortSelect value={query.sort} onChange={setSort} />
      </div>

      {loading ? <Loader /> : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={reload} /> : null}
      {!loading && !error ? (
        <>
          <div className="product-results-bar" ref={listTopRef}>
            <p className="product-results-count">{sortedProducts.length} produk ditemukan</p>
            {hasActiveFilter ? (
              <Button variant="neutral" onClick={reset}>
                Reset
              </Button>
            ) : null}
          </div>
          {sortedProducts.length === 0 ? (
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
          )}
        </>
      ) : null}
    </section>
  )
}
