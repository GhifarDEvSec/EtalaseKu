import { useParams } from 'react-router-dom'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <section className="page">
      <h1 className="page-title">Detail Produk</h1>
      <p className="page-text">Menampilkan detail untuk produk dengan ID {id}.</p>
    </section>
  )
}
