"use client";

import { useEffect, useRef, useState } from "react";
import { COARSE_COUNT, getFramesLoaded } from "@/lib/frames";
import { CH, MONO, hs, mix, readAccent } from "@/lib/ascii";

// Chhota ASCII loader. Ye hero ke frames ko BLOCK nahi karta: jaise hi scroll-ready frames (har 4th, ~37) aa jaate hain ya
// 3.5s ho jaate hain, EXIT shuru hota hai. Same tab/session me dobara nahi dikhta. Reduced-motion walon ko dikhta hi nahi.
//
// FIX (C): pehle sirf 500ms ka opacity fade tha, isliye "S" achanak gayab lagta tha. Ab exit ~1.1s ka dissolve hai:
// S ke characters random order me accent colour me badalte hain, upar ud kar ghul jaate hain, aur aakhir me poora layer fade hota hai.
// Exit shuru hote hi scroll unlock ho jaata hai (user ko wait nahi karna padta).
const MIN_MS = 1100;
const MAX_MS = 3500;
const EXIT_MS = 1100;
const KEY = "ascii-loader-done";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function AsciiLoader() {
  const [gone, setGone] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let skip = false;
    try { skip = sessionStorage.getItem(KEY) === "1" || matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { /* storage band ho to loader dikha do */ }
    if (skip) { setGone(true); return; }

    const wrap = wrapRef.current!, cv = cvRef.current!, pct = pctRef.current!;
    const ctx = cv.getContext("2d")!;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden"; // loader ke dauran scroll lock

    const acc = readAccent();
    const cNear = mix(acc, 255, 0.8), cDim = mix(acc, 0, 0.35), cAcc = mix(acc, 255, 0.2);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth, H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cs = W < 600 ? 11 : 13, cw = cs * 0.62;
    const cols = Math.ceil(W / cw), rows = Math.ceil(H / cs);

    const m = document.createElement("canvas");
    m.width = W; m.height = H;
    const mc = m.getContext("2d", { willReadFrequently: true })!;
    mc.fillStyle = "#fff"; mc.textAlign = "center"; mc.textBaseline = "middle";
    mc.font = `900 ${Math.min(H * 0.4, W * 0.6)}px "Arial Black",Arial,Helvetica,sans-serif`;
    mc.fillText("S", W / 2, H * 0.45);
    const d = mc.getImageData(0, 0, W, H).data;
    const mask = new Uint8Array(cols * rows);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const x = Math.min(W - 1, Math.floor(i * cw + cw / 2)), y = Math.min(H - 1, Math.floor(j * cs + cs / 2));
      mask[j * cols + i] = d[(y * W + x) * 4 + 3] > 128 ? 1 : 0;
    }

    let shown = 0, raf = 0, exitT0 = 0, done = false;
    const t0 = performance.now();

    const loop = (now: number) => {
      const el = now - t0;
      shown += (Math.min(1, getFramesLoaded() / COARSE_COUNT) - shown) * 0.12;
      if (el > MAX_MS) shown = 1;

      // Exit trigger: frames ready (ya timeout) + minimum time
      if (!exitT0 && shown > 0.995 && el >= MIN_MS) {
        exitT0 = now;
        try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
        html.style.overflow = prevOverflow; // exit ke dauran hi scroll chalu
        wrap.style.pointerEvents = "none";
      }
      const ex = exitT0 ? clamp((now - exitT0) / EXIT_MS) : 0;
      const e = smooth(ex);

      ctx.globalAlpha = 1; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
      ctx.textBaseline = "top"; ctx.textAlign = "left"; ctx.font = `${cs * 0.95}px ${MONO}`;
      const T = el / 1000;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const h = hs(i, j, 7);
        let k = Math.floor(T * 1.1 + ((h % 97) / 97) * 5);
        const x = i * cw;
        let y = j * cs;
        if (mask[j * cols + i]) {
          const r = (hs(i, j, 3) % 1000) / 1000;
          let alpha: number;
          if (shown >= r) { ctx.fillStyle = "#fff"; alpha = 0.85; }
          else if (shown + 0.1 > r) { ctx.fillStyle = cNear; alpha = 0.9; k = Math.floor(T * 14) + i; }
          else continue;
          if (e > 0) {
            // Dissolve: har cell ka apna random time. Pehle accent colour + scramble, phir upar udte hue gayab.
            const dl = ((hs(i, j, 5) % 1000) / 1000) * 0.65;
            const local = clamp((e - dl) / 0.35);
            if (local >= 1) continue;
            if (local > 0) {
              ctx.fillStyle = local < 0.4 ? cNear : cAcc;
              k = Math.floor(T * 16) + i + j;
              alpha *= 1 - local;
              y -= local * local * cs * 7;
            }
          }
          ctx.globalAlpha = alpha;
          ctx.fillText(CH[hs(i, j, k) % 36], x, y); continue;
        }
        if (h % 100 >= 9) continue;
        ctx.fillStyle = cDim; ctx.globalAlpha = (0.1 + ((h >> 8) % 14) / 100) * (1 - e);
        ctx.fillText(CH[hs(i, j, k) % 36], x, y);
      }
      pct.textContent = `${Math.round(shown * 100)}%`;
      pct.style.opacity = String(1 - clamp(ex * 3));
      // Aakhri hisse me poora layer soft fade (jab characters lagbhag ud chuke hon)
      wrap.style.opacity = String(1 - smooth(clamp((ex - 0.55) / 0.45)));

      if (ex >= 1) { done = true; setGone(true); return; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); if (!done) html.style.overflow = prevOverflow; };
  }, []);

  if (gone) return null;
  return (
    <div ref={wrapRef} id="ascii-loader" role="status" className="fixed inset-0 z-[100] bg-black motion-reduce:hidden">
      <noscript><style>{"#ascii-loader{display:none}"}</style></noscript>
      <span className="sr-only">Loading portfolio</span>
      <canvas ref={cvRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <div ref={pctRef} className="absolute inset-x-0 bottom-10 text-center font-mono text-xs uppercase tracking-[0.3em] text-mute md:bottom-14">0%</div>
    </div>
  );
}
