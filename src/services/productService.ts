import type { Product, ProductListResponse } from '../types/product'
import { getJson } from './apiClient'

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await getJson<ProductListResponse>('/products?limit=0')
  return data.products
}

export async function fetchProductById(id: string): Promise<Product> {
  return getJson<Product>(`/products/${id}`)
}
