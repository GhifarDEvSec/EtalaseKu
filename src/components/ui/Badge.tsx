import type { ReactNode } from 'react'

interface BadgeProps {
  tone?: 'accent' | 'neutral' | 'success' | 'warning'
  children: ReactNode
}

export default function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}
