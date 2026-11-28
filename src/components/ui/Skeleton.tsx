interface SkeletonProps {
  className?: string
}

export default function Skeleton({ className }: SkeletonProps) {
  const classNames = ['skeleton', className].filter(Boolean).join(' ')

  return <div className={classNames} aria-hidden="true" />
}
