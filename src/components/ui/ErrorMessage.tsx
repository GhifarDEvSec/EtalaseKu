import Button from './Button'

interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <p className="error-message-text">{message}</p>
      <Button variant="neutral" onClick={onRetry}>
        Coba Lagi
      </Button>
    </div>
  )
}
