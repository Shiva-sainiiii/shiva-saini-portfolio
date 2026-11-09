"use client";
import { useEffect, useState } from "react";

// Hero eyebrow (mobile): ek time par ek hi word dikhta hai, fir gayab hoke agla aata hai.
export default function Rotator({ items, ms = 2200 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), ms);
    return () => clearInterval(t);
  }, [items.length, ms]);
  return (
    <span className="rot" aria-hidden="true">
      <span key={i} className="rot-w" style={{ animationDuration: `${ms}ms` }}>{items[i]}</span>
    </span>
  );
}
