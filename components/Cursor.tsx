"use client";

import { useEffect, useRef } from "react";

// Custom cursor (sirf mouse wale devices pe). Gold dot; jis element pe data-cursor="VIEW" ho, wahan bada hoke wahi text dikhata hai.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = dot.current!, lb = label.current!;
    document.documentElement.classList.add("has-cursor");
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0, shown = false;
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; el.style.transform = `translate3d(${cx}px,${cy}px,0)`; raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; cx = x; cy = y; el.style.opacity = "1"; }
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const text = t?.dataset.cursor || "";
      lb.textContent = text;
      el.dataset.big = text ? "1" : "0";
    };
    const leave = () => { el.style.opacity = "0"; shown = false; };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={dot} aria-hidden className="cursor-dot pointer-events-none fixed left-0 top-0 z-[90] opacity-0">
      <span ref={label} />
    </div>
  );
}
