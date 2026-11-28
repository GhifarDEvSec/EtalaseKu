import { appConfig } from '../config'

export interface ApiRequestRecord {
  endpoint: string
  status: number
  ok: boolean
  durationMs: number
  timestamp: number
}

const MAX_RECORDS = 50
let records: ApiRequestRecord[] = []
const listeners = new Set<() => void>()

function notifyListeners(): void {
  listeners.forEach((listener) => listener())
}

function recordRequest(record: ApiRequestRecord): void {
  records = [...records.slice(-(MAX_RECORDS - 1)), record]
  notifyListeners()
}

export function subscribeApiStats(listener: () => void): () => void {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function getApiStatsSnapshot(): ApiRequestRecord[] {
  return records
}

export async function getJson<T>(path: string): Promise<T> {
  const startedAt = performance.now()
  let response: Response

  try {
    response = await fetch(`${appConfig.apiBaseUrl}${path}`)
  } catch {
    recordRequest({
      endpoint: path,
      status: 0,
      ok: false,
      durationMs: Math.round(performance.now() - startedAt),
      timestamp: Date.now(),
    })
    throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.')
  }

  recordRequest({
    endpoint: path,
    status: response.status,
    ok: response.ok,
    durationMs: Math.round(performance.now() - startedAt),
    timestamp: Date.now(),
  })

  if (!response.ok) {
    const message =
      response.status === 404
        ? 'Data yang diminta tidak ditemukan.'
        : `Gagal memuat data (kode ${response.status}). Silakan coba lagi.`
    throw new Error(message)
  }

  return (await response.json()) as T
}
