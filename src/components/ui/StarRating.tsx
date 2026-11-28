interface StarRatingProps {
  value: number
}

const starPoints = '12,2 14.48,8.61 21.51,8.91 16,13.29 17.88,20.11 12,16.2 6.12,20.11 8,13.29 2.49,8.91 9.52,8.61'

export default function StarRating({ value }: StarRatingProps) {
  const rounded = Math.round(value)
  const stars = [1, 2, 3, 4, 5].map((star) => {
    const filled = star <= rounded

    return (
      <svg
        key={star}
        className={`star${filled ? ' is-filled' : ''}`}
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points={starPoints} />
      </svg>
    )
  })

  return (
    <span className="star-rating">
      {stars}
      <span className="star-rating-value">{value.toFixed(1)}</span>
    </span>
  )
}
