import { Link, useLocation } from 'react-router-dom'
import { formatRupiah, originalPriceIdr, usdToIdr } from '../../utils/currency'
import { formatCategoryLabel } from '../../utils/productQuery'
import type { Product } from '../../types/product'
import StarRating from '../ui/StarRating'
import Modal from '../ui/Modal'
import FavoriteButton from './FavoriteButton'

interface QuickViewProps {
  product: Product
  onClose: () => void
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { search } = useLocation()
  const detailPath = `/produk/${product.id}${search}`
  const price = formatRupiah(usdToIdr(product.price))
  const original = originalPriceIdr(product.price, product.discountPercentage)
  const discount = Math.round(product.discountPercentage)
  const images = product.images.length > 0 ? product.images : [product.thumbnail]

  return (
    <Modal open onClose={onClose} label={`Pratinjau ${product.title}`}>
      <div className="quickview">
        <button type="button" className="quickview-close" aria-label="Tutup pratinjau" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <div className="quickview-media">
          <img className="quickview-image" src={images[0]} alt={product.title} />
        </div>
        <div className="quickview-body">
          <p className="quickview-category">{formatCategoryLabel(product.category)}</p>
          <h2 className="quickview-title">{product.title}</h2>
          <div className="quickview-rating">
            <StarRating value={product.rating} />
            <span className="quickview-rating-text">{product.rating.toFixed(1)} dari 5</span>
          </div>
          <div className="quickview-price-row">
            <span className="quickview-price">{price}</span>
            {original !== null ? <span className="quickview-original">{formatRupiah(original)}</span> : null}
            {discount > 0 ? <span className="badge badge-accent">-{discount}%</span> : null}
          </div>
          <p className="quickview-description">{product.description}</p>
          <div className="quickview-actions">
            <FavoriteButton productId={product.id} productName={product.title} withLabel />
            <Link className="btn btn-primary" to={detailPath}>
              Lihat Halaman Detail
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  )
}
