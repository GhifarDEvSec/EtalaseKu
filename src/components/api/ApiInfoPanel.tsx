import { appConfig } from '../../config'
import { useApiStats } from '../../hooks/useApiStats'
import ApiStatusBadge from './ApiStatusBadge'

interface ApiEndpointInfo {
  path: string
  description: string
}

const endpoints: ApiEndpointInfo[] = [
  { path: '/products?limit=0', description: 'Mengambil seluruh daftar produk untuk katalog.' },
  { path: '/products/{id}', description: 'Mengambil detail satu produk berdasarkan ID.' },
  { path: '/products/category-list', description: 'Mengambil daftar kategori yang tersedia.' },
]

function resolveEndpoint(path: string): string {
  return path.replace('{id}', '1')
}

export default function ApiInfoPanel() {
  const { total, last } = useApiStats()
  const lastDuration = last ? `${last.durationMs} ms` : 'Belum ada'
  const lastStatus = last ? (last.status === 0 ? 'Gagal terhubung' : String(last.status)) : 'Belum ada'

  return (
    <section className="api-panel card" aria-labelledby="api-panel-title">
      <div className="api-panel-header">
        <div>
          <h2 className="section-title" id="api-panel-title">
            Data dari API
          </h2>
          <p className="api-panel-text">DummyJSON · {appConfig.apiBaseUrl}</p>
        </div>
        <ApiStatusBadge />
      </div>
      <ul className="api-endpoints">
        {endpoints.map((endpoint) => (
          <li key={endpoint.path} className="api-endpoint">
            <div className="api-endpoint-info">
              <code className="api-endpoint-code">{endpoint.path}</code>
              <p className="api-endpoint-desc">{endpoint.description}</p>
            </div>
            <a
              className="api-link"
              href={`${appConfig.apiBaseUrl}${resolveEndpoint(endpoint.path)}`}
              target="_blank"
              rel="noreferrer"
            >
              Buka di tab baru
            </a>
          </li>
        ))}
      </ul>
      <dl className="api-stats">
        <div className="api-stat">
          <dt>Jumlah permintaan</dt>
          <dd>{total}</dd>
        </div>
        <div className="api-stat">
          <dt>Waktu respons terakhir</dt>
          <dd>{lastDuration}</dd>
        </div>
        <div className="api-stat">
          <dt>Status terakhir</dt>
          <dd>{lastStatus}</dd>
        </div>
      </dl>
    </section>
  )
}
