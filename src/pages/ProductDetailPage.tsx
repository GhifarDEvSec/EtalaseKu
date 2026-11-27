import { Link, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import { useProduct } from '../hooks/useProduct'

const priceFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'USD',
})

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, loading, error, reload } = useProduct(id)

  return (
    <section className="page page-wide">
      <Link className="back-link" to="/produk">
        ← Kembali ke daftar produk
      </Link>
      {loading ? <Loader /> : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={reload} /> : null}
      {!loading && !error && product ? (
        <article className="product-detail">
          <div className="product-detail-gallery">
            <img
              className="product-detail-image"
              src={product.images[0] ?? product.thumbnail}
              alt={product.title}
            />
            {product.images.length > 1 ? (
              <div className="product-detail-thumbs">
                {product.images.map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    className="product-detail-thumb"
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>
            ) : null}
          </div>
          <div className="product-detail-info">
            <Badge tone="accent">{product.category}</Badge>
            <h1 className="product-detail-title">{product.title}</h1>
            <p className="product-detail-description">{product.description}</p>
            <div className="product-detail-price-row">
              <span className="product-detail-price">{priceFormatter.format(product.price)}</span>
              {product.discountPercentage > 0 ? (
                <Badge tone="success">Diskon {product.discountPercentage.toFixed(1)}%</Badge>
              ) : null}
            </div>
            <dl className="product-detail-stats">
              <div className="product-detail-stat">
                <dt>Rating</dt>
                <dd>{product.rating.toFixed(1)} / 5</dd>
              </div>
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
          </div>
        </article>
      ) : null}
    </section>
  )
}
