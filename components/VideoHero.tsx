"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/data";
import Fx from "./Fx";

// HERO: full-screen logo-reveal video (public/media/hero-logo-reveal.mp4, 10s, ek baar chalti hai, phir aakhri frame (logo) ruki rehti hai).
// Video ka background near-black hai, isliye mix-blend-lighten: site ke Ink (#0A0A0A) me seamless mil jaata hai.
// Preloader "preloader-exit" event bhejta hai => video tab shuru hoti hai (event miss ho to FALLBACK_MS baad).
// Reduced-motion / autoplay block / video error => poster (aakhri frame) dikhta hai, site waise hi chalti hai.
// Video muted autoplay hoti hai (browser sound ke saath autoplay nahi karne deta); neeche-right button se sound on hoti hai.
const FALLBACK_MS = 4500;

export default function VideoHero() {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setStill(true); return; }
    let started = false;
    const start = () => {
      if (started) return; started = true;
      v.currentTime = 0;
      v.play().catch(() => setStill(true)); // autoplay block => poster
    };
    window.addEventListener("preloader-exit", start);
    const fb = window.setTimeout(start, FALLBACK_MS);
    return () => { window.removeEventListener("preloader-exit", start); clearTimeout(fb); };
  }, []);

  const toggleSound = () => {
    const v = ref.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
    if (!v.muted && v.ended) { v.currentTime = 0; v.play().catch(() => {}); } // sound on karne par replay
  };

  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] overflow-hidden">
      <video
        ref={ref}
        muted playsInline preload="auto"
        poster="/media/hero-poster.jpg"
        onError={() => setStill(true)}
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover mix-blend-lighten ${still ? "hidden" : ""}`}
      >
        <source src="/media/hero-logo-reveal.mp4" type="video/mp4" />
      </video>
      {/* still mode: sirf poster (aakhri frame) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {still && <img src="/media/hero-poster.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover mix-blend-lighten" />}

      {/* neeche ka text padhne layak rahe, isliye halka ink fade */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ground via-ground/70 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-5 pb-8 md:px-10 md:pb-12">
        <div>
          <h1 className="font-display text-[14vw] font-extrabold uppercase leading-[0.82] tracking-[-0.05em] md:text-[6.2vw]">
            <span className="block">Your shop,</span>
            <span className="block text-accent2">online.</span>
            <span className="sr-only"> — websites for local businesses in Haryana by {SITE.name}</span>
          </h1>
          <p className="mt-5 hidden max-w-md text-lg leading-snug text-ink/80 md:block">
            Websites for clinics, gyms, cafés and shops in Haryana. Fast, on Google, with WhatsApp bookings.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="rounded-full bg-accent2 px-7 py-3.5 text-sm font-bold text-black transition hover:brightness-110">
              <Fx tone="text-black">Get a free demo</Fx>
            </a>
            <a href="#work" className="rounded-full border border-line2 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent2 hover:text-accent2">
              <Fx>See live work</Fx>
            </a>
          </div>
        </div>
        {!still && (
          <button
            type="button" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line2 text-ink transition-colors hover:border-accent2 hover:text-accent2"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H3v6h3l5 4V5z" />
              {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
