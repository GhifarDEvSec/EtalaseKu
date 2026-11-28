import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Halaman Tidak Ditemukan')

  return (
    <section className="page">
      <h1 className="page-title">Halaman Tidak Ditemukan</h1>
      <p className="page-text">Halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
      <Link className="btn btn-primary" to="/">
        Kembali ke Beranda
      </Link>
    </section>
  )
}
