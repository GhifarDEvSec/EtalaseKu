import Skeleton from '../ui/Skeleton'

export default function ProductCardSkeleton() {
  return (
    <div className="product-card product-card-skeleton" aria-hidden="true">
      <div className="product-card-media">
        <Skeleton className="product-card-skeleton-image" />
      </div>
      <div className="product-card-body">
        <Skeleton className="product-card-skeleton-badge" />
        <Skeleton className="product-card-skeleton-title" />
        <div className="product-card-skeleton-row">
          <Skeleton className="product-card-skeleton-price" />
          <Skeleton className="product-card-skeleton-rating" />
        </div>
      </div>
    </div>
  )
}
