import type { SortOption } from '../../types/product'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Urutan bawaan' },
  { value: 'harga-asc', label: 'Harga terendah' },
  { value: 'harga-desc', label: 'Harga tertinggi' },
  { value: 'nama-asc', label: 'Nama A-Z' },
  { value: 'rating-desc', label: 'Rating tertinggi' },
]

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="control">
      <label className="control-label" htmlFor="urut-produk">
        Urutkan
      </label>
      <select
        id="urut-produk"
        className="control-input"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
