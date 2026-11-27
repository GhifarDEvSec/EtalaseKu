import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import Badge from '../ui/Badge'

interface ProductCardProps {
  product: Product
}

const priceFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'USD',
})

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link className="product-card" to={`/produk/${product.id}`}>
      <div className="product-card-media">
        <img
          className="product-card-image"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </div>
      <div className="product-card-body">
        <Badge tone="accent">{product.category}</Badge>
        <h2 className="product-card-title">{product.title}</h2>
        <div className="product-card-meta">
          <span className="product-card-price">{priceFormatter.format(product.price)}</span>
          <span className="product-card-rating" aria-label={`Rating ${product.rating} dari 5`}>
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  )
}
