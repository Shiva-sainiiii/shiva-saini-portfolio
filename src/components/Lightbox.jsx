import { useCallback } from 'react';
import { useLightbox } from '../hooks/useLightbox.jsx';

export default function Lightbox() {
  const { src, alt, isOpen, close } = useLightbox();

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') close();
  }, [close]);

  return (
    <div
      id="lightbox"
      className={`lightbox ${isOpen ? 'active' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Certificate viewer"
      onClick={close}
      onKeyDown={handleKeyDown}
      tabIndex={isOpen ? 0 : -1}
    >
      <button className="lightbox-close" aria-label="Close lightbox" onClick={close}>
        ✕
      </button>
      <img src={src || ''} alt={alt || 'Enlarged view'} />
    </div>
  );
}
