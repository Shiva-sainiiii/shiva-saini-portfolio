"use client";
import { useEffect, useRef, useState } from "react";

// Accent colours: naya add karna ho to yahan ek line aur globals.css me [data-accent] block jodo
const ACCENTS = [["yellow", "#FFD21F"], ["cyan", "#22D3EE"], ["lime", "#A3E635"], ["pink", "#F472B6"]];

export default function ThemeToggle() {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState("yellow");
  const box = useRef(null);

  useEffect(() => {
    try { const a = localStorage.getItem("accent"); if (a && ACCENTS.some(([n]) => n === a)) setCur(a); } catch {}
    const close = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const pick = (n) => {
    setCur(n);
    document.documentElement.dataset.accent = n;
    try { localStorage.setItem("accent", n); } catch {}
    setOpen(false);
  };

  return (
    <div className={`theme ${open ? "open" : ""}`} ref={box}>
      <div className="theme-pop" role="menu" aria-hidden={!open}>
        {ACCENTS.map(([n, c]) => (
          <button key={n} role="menuitem" aria-label={n} tabIndex={open ? 0 : -1} className={`swatch ${cur === n ? "on" : ""}`} style={{ background: c }} onClick={() => pick(n)} />
        ))}
      </div>
      <button className="theme-btn" aria-label="Change theme colour" aria-expanded={open} onClick={() => setOpen(!open)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="1" /><circle cx="17.5" cy="10.5" r="1" /><circle cx="8.5" cy="7.5" r="1" /><circle cx="6.5" cy="12.5" r="1" /><path d="M12 22a10 10 0 1 1 10-10c0 2.8-2.2 3.5-4 3.5h-2a2 2 0 0 0-1.4 3.4c.6.7.4 1.5.1 2-.5.8-1.4 1.1-2.7 1.1Z" /></svg>
      </button>
    </div>
  );
}
