import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'neutral' | 'danger'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, className].filter(Boolean).join(' ')

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
