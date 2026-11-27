interface LoaderProps {
  label?: string
}

export default function Loader({ label = 'Memuat data...' }: LoaderProps) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader-spinner" aria-hidden="true" />
      <span className="loader-label">{label}</span>
    </div>
  )
}
