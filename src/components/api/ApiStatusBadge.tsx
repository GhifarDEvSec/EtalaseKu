import { useApiStats } from '../../hooks/useApiStats'

interface ApiStatusBadgeProps {
  className?: string
}

export default function ApiStatusBadge({ className }: ApiStatusBadgeProps) {
  const { lastStatus } = useApiStats()
  const active = lastStatus === 'aktif'
  const classes = ['api-status-badge', active ? 'is-active' : 'is-error', className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} role="status">
      <span className="api-status-dot" aria-hidden="true" />
      {active ? 'API aktif' : 'API bermasalah'}
    </span>
  )
}
