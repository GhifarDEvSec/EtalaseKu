import { createContext, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export interface FavoritesContextValue {
  favoriteIds: number[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (id: number) => void
  count: number
}

interface FavoritesProviderProps {
  children: ReactNode
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export default function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>('katalog:favorites', [])

  const isFavorite = useCallback((id: number) => favoriteIds.includes(id), [favoriteIds])

  const toggleFavorite = useCallback(
    (id: number) => {
      setFavoriteIds((previous) =>
        previous.includes(id)
          ? previous.filter((favoriteId) => favoriteId !== id)
          : [...previous, id],
      )
    },
    [setFavoriteIds],
  )

  const value = useMemo<FavoritesContextValue>(
    () => ({ favoriteIds, isFavorite, toggleFavorite, count: favoriteIds.length }),
    [favoriteIds, isFavorite, toggleFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
