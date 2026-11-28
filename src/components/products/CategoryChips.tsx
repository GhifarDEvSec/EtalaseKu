interface CategoryChipsProps {
  categories: string[]
  value: string
  onChange: (value: string) => void
}

function formatCategory(category: string): string {
  const label = category.replace(/-/g, ' ')
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export default function CategoryChips({ categories, value, onChange }: CategoryChipsProps) {
  const chips: Array<{ value: string; label: string }> = [
    { value: '', label: 'Semua kategori' },
    ...categories.map((category) => ({ value: category, label: formatCategory(category) })),
  ]

  return (
    <div className="chip-row" role="group" aria-label="Kategori produk">
      {chips.map((chip) => (
        <button
          key={chip.value}
          type="button"
          className={`chip${value === chip.value ? ' is-active' : ''}`}
          aria-pressed={value === chip.value}
          onClick={() => onChange(chip.value)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}
