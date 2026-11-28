import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    setTheme(theme === 'gelap' ? 'terang' : 'gelap')
  }

  const label = theme === 'gelap' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'

  return (
    <button type="button" className="theme-toggle" aria-label={label} onClick={handleToggle}>
      {theme === 'gelap' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  )
}
