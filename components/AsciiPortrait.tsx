"use client";

import { useEffect, useRef, useState } from "react";
import { MONO, hs, mix, readAccent } from "@/lib/ascii";

// Photo ka ASCII version (brightness -> character). Hover / touch pe cursor ke aas-paas asli photo reveal hoti hai,
// tap karne par poori photo toggle hoti hai. Asli <img> hamesha DOM me hai (alt text ke saath, SEO / screen reader ke liye).
const SRC = "/assets/profile-full.jpg";
const RAMP = " .,:;i1tfLCG08@";

export default function AsciiPortrait({ alt = "Shiva Saini" }: { alt?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const box = boxRef.current!, cv = cvRef.current!;
    const ctx = cv.getContext("2d")!;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lum: Float32Array | null = null, cols = 0, rows = 0, cs = 7, cw = 4.2, W = 0;
    let colors: string[] = [], raf = 0, visible = false, last = 0;
    const img = new Image();

    const sample = () => {
      if (!img.complete || !img.naturalWidth || !W) return;
      cols = Math.floor(W / cw); rows = Math.floor(W / cs);
      const o = document.createElement("canvas");
      o.width = cols; o.height = rows;
      const oc = o.getContext("2d", { willReadFrequently: true })!;
      oc.drawImage(img, 0, 0, cols, rows);
      const d = oc.getImageData(0, 0, cols, rows).data;
      lum = new Float32Array(cols * rows);
      for (let n = 0; n < lum.length; n++) {
        const v = (0.2126 * d[n * 4] + 0.7152 * d[n * 4 + 1] + 0.0722 * d[n * 4 + 2]) / 255;
        lum[n] = Math.min(1, Math.max(0, (v - 0.12) * 1.5)); // dark background dabao, chehra ubharo
      }
    };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = box.clientWidth;
      cv.width = W * dpr; cv.height = W * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cs = W < 240 ? 6 : 7; cw = cs * 0.6;
      const acc = readAccent();
      colors = [0.25, 0.4, 0.6, 0.8, 1].map((m) => mix(acc, 255, m * 0.85));
      sample();
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, W);
      if (!lum) return;
      const T = RM ? 0 : now / 1000;
      ctx.textBaseline = "top"; ctx.font = `${cs}px ${MONO}`;
      let lastB = -1;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const l = lum[j * cols + i];
        if (l < 0.1) continue;
        let idx = Math.min(RAMP.length - 1, Math.floor(l * RAMP.length));
        const h = hs(i, j, Math.floor(T * 2));
        if (h % 10 < 3) idx = Math.max(1, Math.min(RAMP.length - 1, idx + (h % 3) - 1)); // halka shimmer
        const b = Math.min(4, Math.floor(l * 5));
        if (b !== lastB) { ctx.fillStyle = colors[b]; lastB = b; }
        ctx.fillText(RAMP[idx], i * cw, j * cs);
      }
    };

    const loop = (now: number) => {
      if (!visible) { raf = 0; return; }
      if (now - last > 120) { draw(now); last = now; } // ~8fps kaafi hai, CPU bachta hai
      raf = requestAnimationFrame(loop);
    };

    img.onload = () => { sample(); draw(performance.now()); };
    img.onerror = () => setFailed(true);
    img.src = SRC;
    size();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !RM) raf = requestAnimationFrame(loop);
      if (visible && RM) draw(0);
    });
    const ro = new ResizeObserver(() => { size(); draw(performance.now()); });
    io.observe(box); ro.observe(box);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, []);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`);
    setActive(true);
  };

  if (failed) return null;
  return (
    <figure className="mx-auto w-full max-w-[320px] lg:mx-0">
      <div
        ref={boxRef}
        onPointerMove={move}
        onPointerDown={move}
        onPointerLeave={() => setActive(false)}
        onPointerUp={(e) => { if (e.pointerType !== "mouse") setActive(false); }}
        onClick={() => setPinned((p) => !p)}
        className="relative aspect-square w-full cursor-pointer select-none overflow-hidden rounded-2xl border border-line bg-black"
        style={{ "--mx": "50%", "--my": "40%" } as React.CSSProperties}
      >
        <canvas ref={cvRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SRC}
          alt={alt}
          width={800}
          height={800}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${pinned ? "opacity-100" : active ? "opacity-100" : "opacity-0"}`}
          style={pinned ? undefined : { WebkitMaskImage: "radial-gradient(circle 80px at var(--mx) var(--my), #000 55%, transparent 100%)", maskImage: "radial-gradient(circle 80px at var(--mx) var(--my), #000 55%, transparent 100%)" }}
        />
      </div>
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
        Hover or touch to reveal · tap to toggle
      </figcaption>
    </figure>
  );
}
