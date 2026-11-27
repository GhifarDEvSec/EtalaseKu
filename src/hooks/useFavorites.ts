import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import type { FavoritesContextValue } from '../context/FavoritesContext'

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites harus dipakai di dalam FavoritesProvider.')
  }

  return context
}
