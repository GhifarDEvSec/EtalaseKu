import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { appConfig } from '../../config'
import { useFavorites } from '../../hooks/useFavorites'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import ThemeToggle from '../ui/ThemeToggle'

interface NavItem {
  to: string
  label: string
  end?: boolean
}

const navItems: NavItem[] = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/produk', label: 'Produk' },
  { to: '/favorit', label: 'Favorit' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { count } = useFavorites()
  const scrollPosition = useScrollPosition()
  const scrolled = scrollPosition > 8

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          <svg
            className="navbar-brand-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 7h12l1 13H5L6 7Z" />
            <path d="M9 7a3 3 0 1 1 6 0" />
          </svg>
          <span className="navbar-brand-name">{appConfig.appName}</span>
        </NavLink>
        <nav id="navbar-menu" className={`navbar-menu${isOpen ? ' is-open' : ''}`} aria-label="Navigasi utama">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `navbar-link${isActive ? ' is-active' : ''}`}
              onClick={closeMenu}
            >
              {item.label}
              {item.to === '/favorit' ? (
                <span className={`navbar-count${count > 0 ? ' is-pop' : ''}`}>{count}</span>
              ) : null}
            </NavLink>
          ))}
        </nav>
        <div className="navbar-actions">
          <ThemeToggle />
          <button
            type="button"
            className="navbar-toggle"
            aria-expanded={isOpen}
            aria-controls="navbar-menu"
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setIsOpen((previous) => !previous)}
          >
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
          </button>
        </div>
      </div>
      {isOpen ? <div className="navbar-backdrop" onClick={closeMenu} /> : null}
    </header>
  )
}
