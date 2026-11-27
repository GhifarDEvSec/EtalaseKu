import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { appConfig } from '../../config'
import { useFavorites } from '../../hooks/useFavorites'

type NavItem = {
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

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-brand" onClick={() => setIsOpen(false)}>
          {appConfig.appName}
        </NavLink>
        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={isOpen}
          aria-label="Buka menu"
          onClick={() => setIsOpen((previous) => !previous)}
        >
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
        </button>
        <nav className={`navbar-menu${isOpen ? ' is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `navbar-link${isActive ? ' is-active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
              {item.to === '/favorit' ? <span className="navbar-count">{count}</span> : null}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
