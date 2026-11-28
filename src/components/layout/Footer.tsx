import { Link } from 'react-router-dom'
import { appConfig } from '../../config'
import ApiStatusBadge from '../api/ApiStatusBadge'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container footer-grid">
        <div className="footer-col">
          <p className="footer-brand">{appConfig.appName}</p>
          <p className="footer-text">Katalog produk dengan desain modern untuk menemukan favorit Anda.</p>
        </div>
        <nav className="footer-col" aria-label="Tautan cepat">
          <p className="footer-heading">Tautan Cepat</p>
          <ul className="footer-links">
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/produk">Produk</Link>
            </li>
            <li>
              <Link to="/favorit">Favorit</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-col">
          <p className="footer-heading">Sumber Data</p>
          <p className="footer-meta">
            Data produk dari{' '}
            <a className="footer-link" href="https://dummyjson.com" target="_blank" rel="noreferrer">
              DummyJSON
            </a>
            .
          </p>
          <ApiStatusBadge />
          {appConfig.studentName ? (
            <p className="footer-meta footer-credit">Dibuat oleh {appConfig.studentName}</p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
