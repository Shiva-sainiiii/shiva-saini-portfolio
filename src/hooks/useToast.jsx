import { createContext, useContext, useState } from 'react';

const ToastContext = createContext({
  show: () => {},
  hide: () => {},
  message: '',
  visible: false,
});

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState(null);

  const show = (msg) => {
    setMessage(msg);
    setVisible(true);
    if (timer) clearTimeout(timer);
    const t = setTimeout(() => setVisible(false), 3200);
    setTimer(t);
  };

  const hide = () => {
    setVisible(false);
    if (timer) clearTimeout(timer);
  };

  return (
    <ToastContext.Provider value={{ show, hide, message, visible }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
