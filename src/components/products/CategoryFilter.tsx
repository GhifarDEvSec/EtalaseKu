interface CategoryFilterProps {
  categories: string[]
  value: string
  onChange: (value: string) => void
}

function formatCategory(category: string): string {
  const label = category.replace(/-/g, ' ')
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export default function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <div className="control">
      <label className="control-label" htmlFor="filter-kategori">
        Kategori
      </label>
      <select
        id="filter-kategori"
        className="control-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Semua kategori</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {formatCategory(category)}
          </option>
        ))}
      </select>
    </div>
  )
}
