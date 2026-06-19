import { createContext, useContext, useState } from 'react';

const LightboxContext = createContext({
  open: () => {},
  close: () => {},
  src: null,
  alt: '',
  isOpen: false,
});

export function LightboxProvider({ children }) {
  const [src, setSrc] = useState(null);
  const [alt, setAlt] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const open = (src_, alt_ = '') => {
    setSrc(src_);
    setAlt(alt_);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <LightboxContext.Provider value={{ open, close, src, alt, isOpen }}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  return useContext(LightboxContext);
}
