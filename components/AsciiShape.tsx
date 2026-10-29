"use client";

import { useEffect, useRef } from "react";
import { MONO, readAccent } from "@/lib/ascii";
import { getShape, type ShapeId } from "@/lib/shapes";

// 3D shape ko ASCII characters me render karta hai (z-buffer + Lambert shading). Koi 3D library nahi, isliye bundle halka.
// idle  = theme ke accent colour me, dheere ghoomta hai
// active = (hover / tap) tez ghoomta hai aur niche ka palette dikhata hai (dark -> light gradient)
const RAMP = " .:-=+*#%@";
const L = (() => { const x = 0.4, y = 0.7, z = 0.6, n = Math.hypot(x, y, z); return [x / n, y / n, z / n]; })();

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lerp = (a: number[], b: number[], t: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;

type Props = { shape: ShapeId; palette: [string, string]; active: boolean; className?: string };

export default function AsciiShape({ shape, palette, active, className }: Props) {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;
  const palRef = useRef(palette);
  palRef.current = palette;

  useEffect(() => {
    const cv = cvRef.current!, ctx = cv.getContext("2d")!;
    const pts = getShape(shape);
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, cs = 10, cw = 6.2, cols = 0, rows = 0;
    let zb = new Float32Array(0), lum = new Float32Array(0);
    let raf = 0, visible = false, ang = 0.6, speed = 0.25, mix = 0, last = 0, acc = [167, 139, 250];

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cs = W < 260 ? 9 : 11; cw = cs * 0.62;
      cols = Math.ceil(W / cw); rows = Math.ceil(H / cs);
      zb = new Float32Array(cols * rows); lum = new Float32Array(cols * rows);
    };

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
      const act = activeRef.current;
      speed += ((act ? 1.4 : 0.25) - speed) * 0.08;
      mix += ((act ? 1 : 0) - mix) * 0.08;
      if (!RM) ang += speed * dt;
      zb.fill(-1e9); lum.fill(-1);
      const ca = Math.cos(ang), sa = Math.sin(ang), tilt = 0.28, ct = Math.cos(tilt), st = Math.sin(tilt);
      const S = Math.min(W, H) * 0.36, cx = W / 2, cy = H / 2, D = 3.6;
      for (let n = 0; n < pts.length; n++) {
        const p = pts[n];
        // Y-axis rotate, phir X tilt
        let x = p[0] * ca + p[2] * sa, z = -p[0] * sa + p[2] * ca, y = p[1];
        let nx = p[3] * ca + p[5] * sa, nz = -p[3] * sa + p[5] * ca, ny = p[4];
        const y2 = y * ct - z * st, z2 = y * st + z * ct; y = y2; z = z2;
        const ny2 = ny * ct - nz * st, nz2 = ny * st + nz * ct; ny = ny2; nz = nz2;
        const f = D / (D - z);
        const sx = cx + x * S * f, sy = cy - y * S * f;
        const i = Math.floor(sx / cw), j = Math.floor(sy / cs);
        if (i < 0 || j < 0 || i >= cols || j >= rows) continue;
        const k = j * cols + i;
        if (z <= zb[k]) continue;
        zb[k] = z;
        lum[k] = Math.max(0.06, nx * L[0] + ny * L[1] + nz * L[2]) * 0.85 + 0.15;
      }
      ctx.clearRect(0, 0, W, H);
      ctx.textBaseline = "top"; ctx.textAlign = "left"; ctx.font = `${cs * 0.98}px ${MONO}`;
      const dark = hex(palRef.current[0]), light = hex(palRef.current[1]);
      const cDark = acc.map((v) => v * 0.45), cLight = acc.map((v) => v + (255 - v) * 0.7);
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const v = lum[j * cols + i];
        if (v < 0) continue;
        const t = Math.min(1, v);
        // idle: accent gradient, active: niche palette gradient (smooth mix)
        const a = cDark.map((c, q) => c + (cLight[q] - c) * t), b = dark.map((c, q) => c + (light[q] - c) * t);
        ctx.fillStyle = lerp(a, b, mix);
        ctx.fillText(RAMP[Math.min(RAMP.length - 1, Math.floor(t * RAMP.length))], i * cw, j * cs);
      }
    };

    let fn = 0;
    const loop = (now: number) => {
      if (!visible) { raf = 0; return; }
      if (!(fn++ % 60)) acc = readAccent();
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    }, { threshold: 0.05 });
    const ro = new ResizeObserver(() => { setup(); if (RM) draw(performance.now()); });
    acc = readAccent(); setup(); io.observe(cv); ro.observe(cv);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, [shape]);

  return <canvas ref={cvRef} role="img" aria-label={`${shape} 3D ASCII preview`} className={className ?? "h-full w-full"} />;
}
