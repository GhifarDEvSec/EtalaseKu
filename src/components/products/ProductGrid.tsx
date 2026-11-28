import type { Product } from '../../types/product'
import EmptyState from '../ui/EmptyState'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        message="Produk tidak ditemukan"
        description="Belum ada produk yang dapat ditampilkan saat ini."
      />
    )
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}
