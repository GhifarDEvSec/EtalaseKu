import type { ToastJenis } from '../../context/ToastContext'

interface ToastProps {
  id: string
  message: string
  jenis: ToastJenis
  leaving: boolean
  onDismiss: (id: string) => void
}

export default function Toast({ id, message, jenis, leaving, onDismiss }: ToastProps) {
  return (
    <div className={`toast toast-${jenis}${leaving ? ' is-leaving' : ''}`} role="status">
      <span className="toast-icon" aria-hidden="true">
        {jenis === 'sukses' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 13 4 4L19 7" />
          </svg>
        ) : jenis === 'bahaya' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 7v6M12 17h.01" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 11v6M12 7h.01" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        )}
      </span>
      <p className="toast-message">{message}</p>
      <button
        type="button"
        className="toast-close"
        aria-label="Tutup notifikasi"
        onClick={() => onDismiss(id)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  )
}
