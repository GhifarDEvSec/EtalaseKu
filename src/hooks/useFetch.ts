import { useCallback, useEffect, useState } from 'react'

export interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  reload: () => void
}

export function useFetch<T>(fetcher: () => Promise<T>): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let isActive = true

    setLoading(true)
    setError(null)

    fetcher()
      .then((result) => {
        if (!isActive) {
          return
        }
        setData(result)
      })
      .catch((caught: unknown) => {
        if (!isActive) {
          return
        }
        setData(null)
        setError(caught instanceof Error ? caught.message : 'Terjadi kesalahan tak terduga.')
      })
      .finally(() => {
        if (!isActive) {
          return
        }
        setLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [fetcher, attempt])

  const reload = useCallback(() => {
    setAttempt((previous) => previous + 1)
  }, [])

  return { data, loading, error, reload }
}
