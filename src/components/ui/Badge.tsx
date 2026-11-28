import type { ReactNode } from 'react'

interface BadgeProps {
  tone?: 'accent' | 'neutral' | 'success' | 'warning'
  className?: string
  children: ReactNode
}

export default function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  const classes = ['badge', `badge-${tone}`, className].filter(Boolean).join(' ')

  return <span className={classes}>{children}</span>
}
