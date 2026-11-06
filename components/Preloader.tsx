"use client";

import { useEffect, useRef, useState } from "react";

// Preloader: 0 se 100 counter, phir poora panel upar slide hoke hat jaata hai. Slide shuru hote hi "preloader-exit" event
// jaata hai (GlassesHero ke glasses tab girte hain). Reduced-motion me bahut chhota. Scroll tab tak locked.
const MS = 1500;
const EXIT_MS = 800;

export default function Preloader() {
  const [gone, setGone] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 200 : MS;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t0 = performance.now();
    let raf = 0, timer = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 2.2);
      if (num.current) num.current.textContent = String(Math.round(eased * 100));
      if (k < 1) { raf = requestAnimationFrame(tick); return; }
      document.body.style.overflow = prev;
      window.dispatchEvent(new Event("preloader-exit"));
      if (wrap.current) wrap.current.style.transform = "translateY(-100%)";
      timer = window.setTimeout(() => setGone(true), reduce ? 0 : EXIT_MS);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); document.body.style.overflow = prev; };
  }, []);

  if (gone) return null;
  return (
    <div
      ref={wrap}
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ground p-5 text-ink md:p-10"
      style={{ transition: `transform ${EXIT_MS}ms cubic-bezier(.76,0,.24,1)` }}
    >
      <p className="font-display text-xl font-bold tracking-tight">Shiva Saini</p>
      <p className="font-display text-[34vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-accent2 md:text-[24vw]">
        <span ref={num}>0</span>
      </p>
    </div>
  );
}
