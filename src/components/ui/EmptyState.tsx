interface EmptyStateProps {
  message: string
  description?: string
}

export default function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <svg className="empty-state-icon" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <rect
          x="24"
          y="34"
          width="72"
          height="58"
          rx="12"
          fill="var(--color-accent-soft)"
          stroke="var(--color-accent)"
          strokeWidth="3"
        />
        <path d="M24 54h72" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="46" cy="74" r="5" fill="var(--color-accent)" />
        <circle cx="74" cy="74" r="5" fill="var(--color-accent)" />
        <path d="M46 86h28" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="empty-state-message">{message}</p>
      {description ? <p className="empty-state-description">{description}</p> : null}
    </div>
  )
}
