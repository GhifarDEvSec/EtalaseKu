import { Link, useLocation, useParams } from 'react-router-dom'
import JsonViewer from '../components/api/JsonViewer'
import NoteForm from '../components/notes/NoteForm'
import NoteList from '../components/notes/NoteList'
import FavoriteButton from '../components/products/FavoriteButton'
import ImageGallery from '../components/products/ImageGallery'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import StarRating from '../components/ui/StarRating'
import { usePageTitle } from '../hooks/usePageTitle'
import { useProduct } from '../hooks/useProduct'
import { formatRupiah, originalPriceIdr, usdToIdr } from '../utils/currency'
import { formatCategoryLabel } from '../utils/productQuery'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { search } = useLocation()
  const { data: product, loading, error, reload } = useProduct(id)

  usePageTitle(product ? product.title : 'Detail Produk')

  if (loading) {
    return (
      <section className="page page-wide">
        <Loader />
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="page page-wide">
        <ErrorMessage message={error ?? 'Produk tidak ditemukan.'} onRetry={reload} />
      </section>
    )
  }

  const images = product.images.length > 0 ? product.images : [product.thumbnail]
  const price = formatRupiah(usdToIdr(product.price))
  const original = originalPriceIdr(product.price, product.discountPercentage)
  const discount = Math.round(product.discountPercentage)

  return (
    <section className="page page-wide">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Beranda</Link>
        <span aria-hidden="true">/</span>
        <Link to="/produk">Produk</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.title}</span>
      </nav>
      <Link className="back-link" to={`/produk${search}`}>
        Kembali ke daftar produk
      </Link>
      <article className="product-detail">
        <ImageGallery images={images} title={product.title} />
        <div className="product-detail-info">
          <p className="product-detail-category">{formatCategoryLabel(product.category)}</p>
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-rating">
            <StarRating value={product.rating} />
            <span className="product-detail-rating-text">{product.rating.toFixed(1)} dari 5</span>
          </div>
          <div className="product-detail-price-row">
            <span className="product-detail-price">{price}</span>
            {original !== null ? (
              <span className="product-detail-original">{formatRupiah(original)}</span>
            ) : null}
            {discount > 0 ? <span className="badge badge-accent">-{discount}%</span> : null}
          </div>
          <dl className="product-detail-stats">
            <div className="product-detail-stat">
              <dt>Stok</dt>
              <dd>{product.stock} tersedia</dd>
            </div>
            {product.brand ? (
              <div className="product-detail-stat">
                <dt>Merek</dt>
                <dd>{product.brand}</dd>
              </div>
            ) : null}
          </dl>
          <p className="product-detail-description">{product.description}</p>
          <FavoriteButton
            productId={product.id}
            productName={product.title}
            withLabel
            className="product-detail-favorite"
          />
        </div>
      </article>
      <section className="product-notes">
        <h2 className="section-title">Catatan</h2>
        <div className="card note-card">
          <NoteForm productId={product.id} />
          <NoteList productId={product.id} />
        </div>
      </section>
      <details className="api-response">
        <summary className="api-response-summary">Respons API</summary>
        <div className="api-response-body">
          <p className="api-response-endpoint">
            Endpoint: <code>/products/{product.id}</code>
          </p>
          <JsonViewer data={product} />
        </div>
      </details>
    </section>
  )
}
