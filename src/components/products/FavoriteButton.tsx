import { useFavorites } from '../../hooks/useFavorites'

interface FavoriteButtonProps {
  productId: number
  productName: string
}

export default function FavoriteButton({ productId, productName }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(productId)

  const label = favorite
    ? `Hapus ${productName} dari favorit`
    : `Tambah ${productName} ke favorit`

  return (
    <button
      type="button"
      className={`favorite-button${favorite ? ' is-active' : ''}`}
      aria-pressed={favorite}
      aria-label={label}
      onClick={() => toggleFavorite(productId)}
    >
      <span aria-hidden="true">{favorite ? '♥' : '♡'}</span>
    </button>
  )
}
