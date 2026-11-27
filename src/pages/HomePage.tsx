import { appConfig } from '../config'

export default function HomePage() {
  return (
    <section className="page">
      <h1 className="page-title">Beranda</h1>
      <p className="page-text">
        Selamat datang di {appConfig.appName}. Temukan produk pilihan dengan mudah dan cepat.
      </p>
    </section>
  )
}
