import { useContext } from 'react'
import { NotesContext } from '../context/NotesContext'
import type { NotesContextValue } from '../context/NotesContext'

export function useNotes(): NotesContextValue {
  const context = useContext(NotesContext)

  if (!context) {
    throw new Error('useNotes harus dipakai di dalam NotesProvider.')
  }

  return context
}
