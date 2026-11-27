import { useCallback } from 'react'
import { fetchProductById } from '../services/productService'
import type { Product } from '../types/product'
import { useFetch } from './useFetch'

export function useProduct(id: string | undefined) {
  const fetcher = useCallback(() => {
    if (!id) {
      return Promise.reject(new Error('ID produk tidak valid.'))
    }
    return fetchProductById(id)
  }, [id])

  return useFetch<Product>(fetcher)
}
