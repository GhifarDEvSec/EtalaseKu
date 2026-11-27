import { Link, useLocation } from 'react-router-dom'
import type { Product } from '../../types/product'
import Badge from '../ui/Badge'
import FavoriteButton from './FavoriteButton'

interface ProductCardProps {
  product: Product
}

const priceFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'USD',
})

export default function ProductCard({ product }: ProductCardProps) {
  const { search } = useLocation()
  const detailPath = `/produk/${product.id}${search}`

  return (
    <article className="product-card">
      <div className="product-card-media">
        <Link className="product-card-link" to={detailPath} aria-label={product.title}>
          <img
            className="product-card-image"
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
          />
        </Link>
        <FavoriteButton productId={product.id} productName={product.title} />
      </div>
      <div className="product-card-body">
        <Badge tone="accent">{product.category}</Badge>
        <h2 className="product-card-title">
          <Link to={detailPath}>{product.title}</Link>
        </h2>
        <div className="product-card-meta">
          <span className="product-card-price">{priceFormatter.format(product.price)}</span>
          <span className="product-card-rating" aria-label={`Rating ${product.rating} dari 5`}>
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  )
}
