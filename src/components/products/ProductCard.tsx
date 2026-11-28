import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Product } from '../../types/product'
import { formatRupiah, originalPriceIdr, usdToIdr } from '../../utils/currency'
import { formatCategoryLabel } from '../../utils/productQuery'
import StarRating from '../ui/StarRating'
import FavoriteButton from './FavoriteButton'
import QuickView from './QuickView'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { search } = useLocation()
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const detailPath = `/produk/${product.id}${search}`
  const price = formatRupiah(usdToIdr(product.price))
  const original = originalPriceIdr(product.price, product.discountPercentage)
  const discount = Math.round(product.discountPercentage)
  const cardStyle = index === undefined ? undefined : { animationDelay: `${Math.min(index * 60, 300)}ms` }

  return (
    <article className="product-card" style={cardStyle}>
      <div className="product-card-media">
        <img className="product-card-image" src={product.thumbnail} alt={product.title} loading="lazy" />
        {discount > 0 ? <span className="product-card-discount">-{discount}%</span> : null}
        <div className="product-card-actions">
          <FavoriteButton productId={product.id} productName={product.title} />
          <button
            type="button"
            className="quick-view-button"
            aria-label={`Pratinjau ${product.title}`}
            onClick={() => setQuickViewOpen(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>
      <div className="product-card-body">
        <p className="product-card-category">{formatCategoryLabel(product.category)}</p>
        <h3 className="product-card-title">
          <Link to={detailPath}>{product.title}</Link>
        </h3>
        <StarRating value={product.rating} />
        <p className="product-card-stock" aria-hidden={product.stock >= 10 || undefined}>
          {product.stock < 10 ? `Stok menipis: ${product.stock}` : ''}
        </p>
        <div className="product-card-price-row">
          <span className="product-card-price">{price}</span>
          {original !== null ? <span className="product-card-original">{formatRupiah(original)}</span> : null}
        </div>
      </div>
      {quickViewOpen ? <QuickView product={product} onClose={() => setQuickViewOpen(false)} /> : null}
    </article>
  )
}
