import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="page">
      <h1 className="page-title">Halaman Tidak Ditemukan</h1>
      <p className="page-text">Halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
      <Link className="button-link" to="/">
        Kembali ke Beranda
      </Link>
    </section>
  )
}
