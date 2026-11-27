import { Link } from 'react-router-dom'
import { appConfig } from '../config'
import { usePageTitle } from '../hooks/usePageTitle'

export default function HomePage() {
  usePageTitle('Beranda')

  return (
    <section className="home-hero">
      <p className="home-eyebrow">Selamat datang</p>
      <h1 className="home-title">{appConfig.appName}</h1>
      <p className="home-text">
        Ringkasan aplikasi katalog produk: temukan produk pilihan, lihat detail lengkap, dan simpan
        favorit Anda di satu tempat.
      </p>
      <dl className="home-identity">
        <div className="home-identity-item">
          <dt>Nama</dt>
          <dd>{appConfig.studentName}</dd>
        </div>
        <div className="home-identity-item">
          <dt>NIM</dt>
          <dd>{appConfig.studentNim}</dd>
        </div>
      </dl>
      <Link className="btn btn-primary" to="/produk">
        Lihat Produk
      </Link>
    </section>
  )
}
