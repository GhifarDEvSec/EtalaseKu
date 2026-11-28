import { useEffect, useRef, useState } from 'react'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'

interface SearchBarProps {
  value: string
  onSearch: (value: string) => void
}

export default function SearchBar({ value, onSearch }: SearchBarProps) {
  const [term, setTerm] = useState(value)
  const debouncedTerm = useDebouncedValue(term, 300)
  const lastValueRef = useRef(value)

  useEffect(() => {
    if (debouncedTerm === lastValueRef.current) {
      return
    }

    lastValueRef.current = debouncedTerm
    onSearch(debouncedTerm)
  }, [debouncedTerm, onSearch])

  useEffect(() => {
    if (value !== lastValueRef.current) {
      lastValueRef.current = value
      setTerm(value)
    }
  }, [value])

  const handleClear = () => {
    setTerm('')
    lastValueRef.current = ''
    onSearch('')
  }

  return (
    <div className="control">
      <label className="control-label" htmlFor="search-produk">
        Cari produk
      </label>
      <span className="search-field">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id="search-produk"
          type="text"
          className="search-input"
          value={term}
          placeholder="Cari nama, deskripsi, atau merek"
          onChange={(event) => setTerm(event.target.value)}
        />
        {term ? (
          <button
            type="button"
            className="search-clear"
            aria-label="Hapus pencarian"
            onClick={handleClear}
          >
            ×
          </button>
        ) : null}
      </span>
    </div>
  )
}
