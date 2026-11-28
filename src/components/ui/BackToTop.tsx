import { useScrollPosition } from '../../hooks/useScrollPosition'

export default function BackToTop() {
  const scrollPosition = useScrollPosition()

  if (scrollPosition <= 400) {
    return null
  }

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  return (
    <button type="button" className="back-to-top" aria-label="Kembali ke atas" onClick={handleClick}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
