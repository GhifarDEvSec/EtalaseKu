import { usdToIdr } from './currency'
import type { Product, SortOption } from '../types/product'

export const PAGE_SIZE = 12

export function formatCategoryLabel(category: string): string {
  const label = category.replace(/-/g, ' ')
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function filterProducts(products: Product[], search: string, category: string): Product[] {
  const term = search.trim().toLowerCase()

  return products.filter((product) => {
    if (category !== '' && product.category !== category) {
      return false
    }

    if (term === '') {
      return true
    }

    const haystack = `${product.title} ${product.description} ${product.brand ?? ''}`.toLowerCase()
    return haystack.includes(term)
  })
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products]

  switch (sort) {
    case 'harga-asc':
      return copy.sort((first, second) => usdToIdr(first.price) - usdToIdr(second.price))
    case 'harga-desc':
      return copy.sort((first, second) => usdToIdr(second.price) - usdToIdr(first.price))
    case 'nama-asc':
      return copy.sort((first, second) => first.title.localeCompare(second.title, 'id'))
    case 'rating-desc':
      return copy.sort((first, second) => second.rating - first.rating)
    default:
      return copy
  }
}

export function paginateProducts<T>(items: T[], page: number, pageSize: number = PAGE_SIZE): T[] {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}
