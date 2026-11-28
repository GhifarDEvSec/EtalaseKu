import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  label?: string
  children: ReactNode
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Modal({ open, onClose, label, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) {
      return
    }

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    const initialElement = focusableElements[0] ?? dialog
    initialElement.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))

      if (items.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]

      if (!dialog.contains(document.activeElement)) {
        event.preventDefault()
        first.focus()
        return
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      restoreFocusRef.current?.focus()
    }
  }, [open])

  if (!open) {
    return null
  }

  return createPortal(
    <div className="modal-backdrop" onClick={() => onCloseRef.current()}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
