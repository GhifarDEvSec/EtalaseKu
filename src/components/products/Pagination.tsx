import type { RefObject } from 'react'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
  scrollTargetRef?: RefObject<HTMLElement | null>
}

function getPageItems(current: number, total: number): Array<number | 'ellipsis'> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const items: Array<number | 'ellipsis'> = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) {
    items.push('ellipsis')
  }

  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    items.push(pageNumber)
  }

  if (end < total - 1) {
    items.push('ellipsis')
  }

  items.push(total)

  return items
}

export default function Pagination({ page, totalPages, onChange, scrollTargetRef }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const pageItems = getPageItems(page, totalPages)

  const handleChange = (nextPage: number) => {
    if (nextPage === page || nextPage < 1 || nextPage > totalPages) {
      return
    }

    onChange(nextPage)

    if (scrollTargetRef?.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      scrollTargetRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <nav className="pagination" aria-label="Navigasi halaman">
      <button
        type="button"
        className="pagination-button"
        onClick={() => handleChange(page - 1)}
        disabled={page <= 1}
      >
        Sebelumnya
      </button>
      <ul className="pagination-pages">
        {pageItems.map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`} className="pagination-ellipsis" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={`pagination-page${item === page ? ' is-active' : ''}`}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => handleChange(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>
      <button
        type="button"
        className="pagination-button"
        onClick={() => handleChange(page + 1)}
        disabled={page >= totalPages}
      >
        Berikutnya
      </button>
    </nav>
  )
}
