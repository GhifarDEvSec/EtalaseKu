import { appConfig } from '../config'

const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export function usdToIdr(amount: number): number {
  const converted = amount * appConfig.usdToIdr
  return Math.round(converted / 100) * 100
}

export function formatRupiah(amount: number): string {
  return rupiahFormatter.format(amount)
}

export function originalPriceIdr(price: number, discountPercentage: number): number | null {
  if (discountPercentage <= 0) {
    return null
  }

  const discounted = usdToIdr(price)
  const original = discounted / (1 - discountPercentage / 100)
  return Math.round(original / 100) * 100
}
