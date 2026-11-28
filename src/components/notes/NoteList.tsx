import { useNotes } from '../../hooks/useNotes'
import { useToast } from '../../hooks/useToast'
import Button from '../ui/Button'

interface NoteListProps {
  productId: number
}

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export default function NoteList({ productId }: NoteListProps) {
  const { getNotesByProduct, deleteNote } = useNotes()
  const { showToast } = useToast()
  const notes = getNotesByProduct(productId)

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus catatan ini?')) {
      deleteNote(id)
      showToast('Catatan berhasil dihapus.', 'info')
    }
  }

  if (notes.length === 0) {
    return <p className="note-empty">Belum ada catatan</p>
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id} className="note-item">
          <div className="note-item-body">
            <p className="note-item-text">{note.text}</p>
            <time className="note-item-date" dateTime={note.createdAt}>
              {dateFormatter.format(new Date(note.createdAt))}
            </time>
          </div>
          <Button type="button" variant="danger" className="note-delete" onClick={() => handleDelete(note.id)}>
            Hapus
          </Button>
        </li>
      ))}
    </ul>
  )
}
