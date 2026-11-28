import { useEffect, useRef, useState } from 'react'
import { useFavorites } from '../../hooks/useFavorites'
import { useToast } from '../../hooks/useToast'

interface FavoriteButtonProps {
  productId: number
  productName: string
  withLabel?: boolean
  className?: string
}

const PULSE_DURATION = 300

export default function FavoriteButton({
  productId,
  productName,
  withLabel = false,
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const favorite = isFavorite(productId)
  const [isPulsing, setIsPulsing] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleToggle = () => {
    const nextFavorite = !favorite
    toggleFavorite(productId)

    if (nextFavorite) {
      setIsPulsing(true)

      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }

      timerRef.current = window.setTimeout(() => {
        setIsPulsing(false)
      }, PULSE_DURATION)
      showToast('Produk ditambahkan ke favorit.', 'sukses')
      return
    }

    showToast('Produk dihapus dari favorit.', 'info')
  }

  const label = favorite
    ? `Hapus ${productName} dari favorit`
    : `Tambah ${productName} ke favorit`
  const classes = [
    'favorite-button',
    withLabel ? 'favorite-button-label' : '',
    favorite ? 'is-active' : '',
    isPulsing ? 'is-pulsing' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={favorite}
      aria-label={label}
      onClick={handleToggle}
    >
      <svg
        className="favorite-icon"
        viewBox="0 0 24 24"
        fill={favorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20.3 4.6 13a4.7 4.7 0 0 1 0-6.6 4.6 4.6 0 0 1 6.6 0l.8.8.8-.8a4.6 4.6 0 0 1 6.6 0 4.7 4.7 0 0 1 0 6.6Z" />
      </svg>
      {withLabel ? <span>{favorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}</span> : null}
    </button>
  )
}
