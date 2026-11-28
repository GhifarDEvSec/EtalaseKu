import { useEffect, useRef, useState } from 'react'

interface JsonViewerProps {
  data: unknown
}

export default function JsonViewer({ data }: JsonViewerProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | null>(null)
  const text = JSON.stringify(data, null, 2) ?? ''

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)

      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }

      timerRef.current = window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="json-viewer">
      <div className="json-viewer-header">
        <span className="json-viewer-label">JSON</span>
        <button type="button" className="btn btn-neutral json-viewer-copy" onClick={handleCopy}>
          {copied ? 'Tersalin' : 'Salin'}
        </button>
      </div>
      <pre className="json-viewer-pre">
        <code>{text}</code>
      </pre>
    </div>
  )
}
