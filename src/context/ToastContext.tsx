import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Toast from '../components/ui/Toast'

export type ToastJenis = 'sukses' | 'info' | 'bahaya'

export interface ToastItem {
  id: string
  message: string
  jenis: ToastJenis
  leaving: boolean
}

export interface ToastContextValue {
  toasts: ToastItem[]
  showToast: (message: string, jenis?: ToastJenis) => void
  dismissToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

const MAX_TOASTS = 3
const TOAST_DURATION = 3000
const EXIT_DURATION = 180

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const autoTimersRef = useRef<Map<string, number>>(new Map())
  const exitTimersRef = useRef<Map<string, number>>(new Map())

  const removeToast = useCallback((id: string) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id))
    exitTimersRef.current.delete(id)
  }, [])

  const dismissToast = useCallback(
    (id: string) => {
      const autoTimer = autoTimersRef.current.get(id)

      if (autoTimer !== undefined) {
        window.clearTimeout(autoTimer)
        autoTimersRef.current.delete(id)
      }

      setToasts((previous) =>
        previous.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast)),
      )

      if (!exitTimersRef.current.has(id)) {
        const exitTimer = window.setTimeout(() => {
          removeToast(id)
        }, EXIT_DURATION)
        exitTimersRef.current.set(id, exitTimer)
      }
    },
    [removeToast],
  )

  const showToast = useCallback(
    (message: string, jenis: ToastJenis = 'info') => {
      const id = crypto.randomUUID()

      setToasts((previous) => {
        const next = [...previous, { id, message, jenis, leaving: false }]

        if (next.length <= MAX_TOASTS) {
          return next
        }

        const overflow = next.length - MAX_TOASTS
        const dropped = next.slice(0, overflow)

        dropped.forEach((toast) => {
          const autoTimer = autoTimersRef.current.get(toast.id)

          if (autoTimer !== undefined) {
            window.clearTimeout(autoTimer)
            autoTimersRef.current.delete(toast.id)
          }

          const exitTimer = exitTimersRef.current.get(toast.id)

          if (exitTimer !== undefined) {
            window.clearTimeout(exitTimer)
            exitTimersRef.current.delete(toast.id)
          }
        })

        return next.slice(overflow)
      })

      const autoTimer = window.setTimeout(() => {
        dismissToast(id)
      }, TOAST_DURATION)
      autoTimersRef.current.set(id, autoTimer)
    },
    [dismissToast],
  )

  useEffect(() => {
    const autoTimers = autoTimersRef.current
    const exitTimers = exitTimersRef.current

    return () => {
      autoTimers.forEach((timer) => {
        window.clearTimeout(timer)
      })
      exitTimers.forEach((timer) => {
        window.clearTimeout(timer)
      })
      autoTimers.clear()
      exitTimers.clear()
    }
  }, [])

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-region" aria-live="polite">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            jenis={toast.jenis}
            leaving={toast.leaving}
            onDismiss={dismissToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
