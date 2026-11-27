import { Link } from 'react-router-dom'
import { appConfig } from '../config'

export default function HomePage() {
  return (
    <section className="home-hero">
      <p className="home-eyebrow">Selamat datang</p>
      <h1 className="home-title">{appConfig.appName}</h1>
      <p className="home-text">
        Ringkasan aplikasi katalog produk: temukan produk pilihan, lihat detail lengkap, dan simpan
        favorit Anda di satu tempat.
      </p>
      <Link className="btn btn-primary" to="/produk">
        Lihat Produk
      </Link>
    </section>
  )
}
