import { useCallback } from 'react'
import { fetchAllProducts } from '../services/productService'
import type { Product } from '../types/product'
import { useFetch } from './useFetch'

export function useProducts() {
  const fetcher = useCallback(() => fetchAllProducts(), [])
  return useFetch<Product[]>(fetcher)
}
