"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/lib/data";
import { CH, MONO, hs, mix, readAccent } from "@/lib/ascii";

// Character-terrain showcase: logo letter characters se decode hota hai, beech me glow orb, dono side terrain.
// Rang --accent2 se aate hain (ThemeSwitcher ke saath badalte hain). Cyan sirf actions ke liye hai, yahan use nahi hua.
const LOGO = "S";

export default function AsciiHero() {
  const wrapRef = useRef<HTMLElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!, cv = cvRef.current!;
    const ctx = cv.getContext("2d")!;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, cs = 14, cw = 8, cols = 0, rows = 0, baseY = 0, oy = 0;
    let mask = new Uint8Array(0);
    let ox = 0, tox = 0, px = -999, py = -999;
    let raf = 0, visible = false, started = false, tStart = 0, frameN = 0;
    let acc = [167, 139, 250];
    let cFar = "", cMid = "", cNear = "", cBg = "", cOrb = "";

    const readTheme = () => {
      acc = readAccent();
      cFar = mix(acc, 0, 0.1);
      cMid = mix(acc, 255, 0.35);
      cNear = mix(acc, 255, 0.8);
      cBg = mix(acc, 0, 0.35);
      cOrb = acc.join(",");
    };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth; H = wrap.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cs = W < 600 ? 11 : 14; cw = cs * 0.62;
      cols = Math.ceil(W / cw); rows = Math.ceil(H / cs);
      baseY = H * 0.7; oy = baseY + H * 0.02; ox = tox = W / 2;
      const m = document.createElement("canvas");
      m.width = W; m.height = H;
      const mc = m.getContext("2d", { willReadFrequently: true })!;
      const ls = Math.min(H * 0.42, W * 0.7);
      mc.fillStyle = "#fff"; mc.textAlign = "center"; mc.textBaseline = "middle";
      mc.font = `900 ${ls}px "Arial Black",Arial,Helvetica,sans-serif`;
      mc.fillText(LOGO, W / 2, H * 0.34);
      const d = mc.getImageData(0, 0, W, H).data;
      mask = new Uint8Array(cols * rows);
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const x = Math.min(W - 1, Math.floor(i * cw + cw / 2));
        const y = Math.min(H - 1, Math.floor(j * cs + cs / 2));
        mask[j * cols + i] = d[(y * W + x) * 4 + 3] > 128 ? 1 : 0;
      }
    };

    const ridge = (x: number, t: number) => {
      const e = Math.pow(Math.min(Math.abs(x - ox) / (W * 0.5), 1.4), 1.35);
      const n = Math.sin(x * 0.012 + t * 0.35) * 0.5 + Math.sin(x * 0.031 - t * 0.5 + 1.7) * 0.3 + Math.sin(x * 0.07 + t * 0.9) * 0.12 + 0.5;
      return baseY - e * H * 0.11 * (0.35 + n * 0.8);
    };

    const draw = (now: number) => {
      if (!(frameN++ % 40)) readTheme();
      const T = RM ? 5 : (now - tStart) / 1000;
      const p = RM ? 1 : Math.min(1, (now - tStart) / 2600);
      ox += (tox - ox) * 0.06;
      ctx.globalAlpha = 1; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
      const R = Math.min(W, H) * 0.28;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, R);
      g.addColorStop(0, `rgba(${mix(acc, 255, 0.55).slice(4, -1)},.95)`);
      g.addColorStop(0.18, `rgba(${cOrb},.55)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(ox - R, oy - R, R * 2, R * 2);
      ctx.textBaseline = "top"; ctx.textAlign = "left";
      ctx.font = `${cs * 0.95}px ${MONO}`;

      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const h = hs(i, j, 7);
        let k = Math.floor(T * 1.1 + ((h % 97) / 97) * 5);
        const x = i * cw, y = j * cs;
        if (mask[j * cols + i]) {
          const r = (hs(i, j, 3) % 1000) / 1000;
          if (p >= r) { ctx.fillStyle = "#fff"; ctx.globalAlpha = 0.8 + 0.2 * Math.sin(T * 2 + j * 0.35 + i * 0.2); }
          else if (p + 0.12 > r) { ctx.fillStyle = cNear; ctx.globalAlpha = 0.9; k = Math.floor(T * 14) + i; }
          else continue;
          ctx.fillText(CH[hs(i, j, k) % 36], x, y); continue;
        }
        if (h % 100 >= 14) continue;
        let a = 0.07 + ((h >> 8) % 18) / 100;
        const d = Math.hypot(x - px, y - py);
        if (d < 130) { a += (1 - d / 130) * 0.6; k = Math.floor(T * 10) + i; }
        ctx.fillStyle = cBg; ctx.globalAlpha = Math.min(a * 1.6, 0.9);
        ctx.fillText(CH[hs(i, j, k) % 36], x, y);
      }

      const tcs = cs * 0.6, tw = tcs * 0.62, depth = H * 0.1;
      let last = "", lf = 0;
      for (let xx = 0; xx < W; xx += tw) {
        const yR = ridge(xx, T);
        const e = Math.min(Math.abs(xx - ox) / (W * 0.5), 1);
        const fs = Math.round(tcs * (0.8 + 0.55 * e) * 2) / 2;
        if (fs !== lf) { ctx.font = `${fs}px ${MONO}`; lf = fs; }
        const ci = Math.floor(xx / tw);
        for (let yy = yR; yy < yR + depth; yy += tcs) {
          const df = (yy - yR) / depth, rj = Math.floor(yy / tcs);
          const hh = hs(ci, rj, 11);
          if (hh % 100 < df * 55) continue;
          const dist = Math.hypot(xx - ox, yy - oy) / R;
          const c = dist < 0.3 ? cNear : dist < 0.8 ? cMid : cFar;
          if (c !== last) { ctx.fillStyle = c; last = c; }
          ctx.globalAlpha = Math.pow(1 - df, 1.2) * 0.95;
          ctx.fillText(CH[hs(ci, rj, Math.floor(T * 1.6 + (hh % 50) / 10)) % 36], xx, yy);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (!visible) { raf = 0; return; }
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !started && en.intersectionRatio > 0.3) { started = true; tStart = performance.now(); }
      if (visible && !started) { started = true; tStart = performance.now(); }
      if (visible && !raf) raf = requestAnimationFrame(loop);
      if (visible && RM) draw(performance.now());
    }, { threshold: [0, 0.3] });

    const ro = new ResizeObserver(() => { setup(); if (RM && visible) draw(performance.now()); });
    const move = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      px = e.clientX - r.left; py = e.clientY - r.top;
      tox = W / 2 + (px - W / 2) * 0.25;
    };
    const leave = () => { px = py = -999; tox = W / 2; };

    readTheme(); setup();
    io.observe(wrap); ro.observe(wrap);
    wrap.addEventListener("pointermove", move);
    wrap.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      wrap.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={wrapRef} aria-label={`${SITE.name} — ${SITE.role}`} className="relative h-[88svh] min-h-[520px] w-full overflow-hidden bg-black md:h-svh">
      <canvas ref={cvRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-6 pb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-mute md:px-12 md:pb-12 md:text-sm">
        <span className="flex items-center gap-3"><span className="inline-block h-2.5 w-2.5 bg-accent2" />Full-stack developer</span>
        <span className="hidden sm:block">{SITE.motto}</span>
      </div>
    </section>
  );
}
