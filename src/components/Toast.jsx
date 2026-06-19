import { useEffect } from 'react';
import { useToast } from '../hooks/useToast.jsx';

export default function Toast() {
  const { message, visible } = useToast();

  useEffect(() => {
    const el = document.getElementById('toast');
    if (!el) return;
    if (visible) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  }, [visible]);

  return <div id="toast" role="alert" aria-live="polite">{message}</div>;
}
