import { appConfig } from '../config'

export async function getJson<T>(path: string): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${appConfig.apiBaseUrl}${path}`)
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.')
  }

  if (!response.ok) {
    const message =
      response.status === 404
        ? 'Data yang diminta tidak ditemukan.'
        : `Gagal memuat data (kode ${response.status}). Silakan coba lagi.`
    throw new Error(message)
  }

  return (await response.json()) as T
}
