import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ProductQuery, SortOption } from '../types/product'

export interface UseProductQueryResult {
  query: ProductQuery
  setSearch: (value: string) => void
  setCategory: (value: string) => void
  setSort: (value: SortOption) => void
  setPage: (value: number) => void
  reset: () => void
}

function parseSort(value: string | null): SortOption {
  if (
    value === 'harga-asc' ||
    value === 'harga-desc' ||
    value === 'nama-asc' ||
    value === 'rating-desc'
  ) {
    return value
  }

  return 'default'
}

function parsePage(value: string | null): number {
  if (!value) {
    return 1
  }

  const parsed = Number.parseInt(value, 10)

  if (Number.isNaN(parsed) || parsed < 1) {
    return 1
  }

  return parsed
}

function readQuery(params: URLSearchParams): ProductQuery {
  return {
    q: params.get('q') ?? '',
    category: params.get('kategori') ?? '',
    sort: parseSort(params.get('urut')),
    page: parsePage(params.get('halaman')),
  }
}

function writeQuery(query: ProductQuery): URLSearchParams {
  const params = new URLSearchParams()

  if (query.q) {
    params.set('q', query.q)
  }

  if (query.category) {
    params.set('kategori', query.category)
  }

  if (query.sort !== 'default') {
    params.set('urut', query.sort)
  }

  if (query.page > 1) {
    params.set('halaman', String(query.page))
  }

  return params
}

export function useProductQuery(): UseProductQueryResult {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = readQuery(searchParams)

  const setSearch = useCallback(
    (value: string) => {
      setSearchParams((previous) => writeQuery({ ...readQuery(previous), q: value, page: 1 }))
    },
    [setSearchParams],
  )

  const setCategory = useCallback(
    (value: string) => {
      setSearchParams((previous) =>
        writeQuery({ ...readQuery(previous), category: value, page: 1 }),
      )
    },
    [setSearchParams],
  )

  const setSort = useCallback(
    (value: SortOption) => {
      setSearchParams((previous) => writeQuery({ ...readQuery(previous), sort: value, page: 1 }))
    },
    [setSearchParams],
  )

  const setPage = useCallback(
    (value: number) => {
      setSearchParams((previous) => writeQuery({ ...readQuery(previous), page: value }))
    },
    [setSearchParams],
  )

  const reset = useCallback(() => {
    setSearchParams(new URLSearchParams())
  }, [setSearchParams])

  return { query, setSearch, setCategory, setSort, setPage, reset }
}
