import { createContext, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Note } from '../types/note'

export interface NotesContextValue {
  notes: Note[]
  getNotesByProduct: (productId: number) => Note[]
  addNote: (productId: number, text: string) => void
  deleteNote: (id: string) => void
}

interface NotesProviderProps {
  children: ReactNode
}

export const NotesContext = createContext<NotesContextValue | null>(null)

export default function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useLocalStorage<Note[]>('katalog:notes', [])

  const getNotesByProduct = useCallback(
    (productId: number) => notes.filter((note) => note.productId === productId),
    [notes],
  )

  const addNote = useCallback(
    (productId: number, text: string) => {
      const note: Note = {
        id: crypto.randomUUID(),
        productId,
        text: text.trim(),
        createdAt: new Date().toISOString(),
      }

      setNotes((previous) => [note, ...previous])
    },
    [setNotes],
  )

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((previous) => previous.filter((note) => note.id !== id))
    },
    [setNotes],
  )

  const value = useMemo<NotesContextValue>(
    () => ({ notes, getNotesByProduct, addNote, deleteNote }),
    [notes, getNotesByProduct, addNote, deleteNote],
  )

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}
