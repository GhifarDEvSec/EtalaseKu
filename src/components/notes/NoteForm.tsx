import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNotes } from '../../hooks/useNotes'

interface NoteFormProps {
  productId: number
}

const MIN_LENGTH = 5
const MAX_LENGTH = 200

function validate(text: string): string {
  const trimmed = text.trim()

  if (trimmed === '') {
    return 'Catatan wajib diisi.'
  }

  if (trimmed.length < MIN_LENGTH) {
    return `Catatan minimal ${MIN_LENGTH} karakter.`
  }

  if (text.length > MAX_LENGTH) {
    return `Catatan maksimal ${MAX_LENGTH} karakter.`
  }

  return ''
}

export default function NoteForm({ productId }: NoteFormProps) {
  const { addNote } = useNotes()
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (value: string) => {
    setText(value)
    setSuccess(false)
    setError(validate(value))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validation = validate(text)

    if (validation !== '') {
      setError(validation)
      return
    }

    addNote(productId, text)
    setText('')
    setError('')
    setSuccess(true)
  }

  return (
    <form className="note-form" onSubmit={handleSubmit} noValidate>
      <label className="control-label" htmlFor="note-text">
        Tulis catatan
      </label>
      <textarea
        id="note-text"
        className="note-textarea"
        value={text}
        placeholder="Tulis catatan untuk produk ini"
        rows={4}
        aria-invalid={error !== ''}
        aria-describedby={error !== '' ? 'note-error' : undefined}
        onChange={(event) => handleChange(event.target.value)}
      />
      <div className="note-form-meta">
        <span className={`note-counter${text.length > MAX_LENGTH ? ' is-over' : ''}`}>
          {text.length} / {MAX_LENGTH}
        </span>
      </div>
      {error !== '' ? (
        <p className="note-error" id="note-error" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="note-success" role="status">
          Catatan berhasil ditambahkan.
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary">
        Tambah Catatan
      </button>
    </form>
  )
}
