import { useState } from 'react'
import type { KeyboardEvent } from 'react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0)
  const currentIndex = images.length > 0 ? Math.min(selected, images.length - 1) : 0
  const currentImage = images[currentIndex]

  const goTo = (index: number) => {
    setSelected(Math.max(0, Math.min(index, images.length - 1)))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(currentIndex - 1)
      return
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(currentIndex + 1)
    }
  }

  if (images.length === 0) {
    return null
  }

  return (
    <div className="image-gallery">
      <div
        className="image-gallery-main"
        role="group"
        aria-label="Galeri gambar produk"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <img key={currentImage} className="image-gallery-image" src={currentImage} alt={title} />
        {images.length > 1 ? (
          <>
            <button
              type="button"
              className="image-gallery-arrow image-gallery-arrow-prev"
              aria-label="Gambar sebelumnya"
              onClick={() => goTo(currentIndex - 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="image-gallery-arrow image-gallery-arrow-next"
              aria-label="Gambar berikutnya"
              onClick={() => goTo(currentIndex + 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="image-gallery-thumbs">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`image-gallery-thumb${index === currentIndex ? ' is-active' : ''}`}
              aria-label={`Gambar ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
              onClick={() => goTo(index)}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
