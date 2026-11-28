import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'terang' | 'gelap'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialTheme(): Theme {
  try {
    const stored = window.localStorage.getItem('katalog:theme')

    if (stored === 'gelap' || stored === 'terang') {
      return stored
    }
  } catch {
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'gelap' : 'terang'
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    try {
      window.localStorage.setItem('katalog:theme', theme)
    } catch {
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((previous) => (previous === 'gelap' ? 'terang' : 'gelap'))
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
