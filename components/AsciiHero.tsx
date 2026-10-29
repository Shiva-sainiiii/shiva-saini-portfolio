"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/lib/data";
import { CH, MONO, hs, mix, readAccent } from "@/lib/ascii";

// Character-terrain showcase: logo letter characters se decode hota hai, beech me glow orb, dono side terrain.
// Rang --accent2 se aate hain (ThemeSwitcher ke saath badalte hain). Cyan sirf actions ke liye hai, yahan use nahi hua.
const LOGO = "S";                      // mobile: sirf "S" (chhoti screen pe poora naam padhne layak nahi banta)
const LOGO_DESK = ["SHIVA", "SAINI"];  // desktop / laptop (>=768px): poora naam, do line me
const DESK_MIN = 768;
// Desktop pe orb (light source) kitna dim rahe: 1 = pehle jaisa, 0 = bilkul band. Zyada dim chahiye to isse kam karo.
const ORB_DESKTOP = 0.3;

// Intro timing (FIX C): hero jab ~35% screen pe aaye tab hi start. Pehle scene (orb, terrain, bg chars) soft fade-in hota hai,
// phir "S" andar se bahar ki taraf assemble hota hai. Har cell ke liye alpha ramp hai, hard on/off nahi.
const SCENE_MS = 1500;   // orb + terrain + bg fade-in
const LOGO_DELAY = 350;  // scene ke baad S shuru
const LOGO_MS = 3200;    // S ke assemble ka total time
const RAMP = 0.22;       // har cell kitni der "scramble" rehta hai (0..1 of progress)
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function AsciiHero() {
  const wrapRef = useRef<HTMLElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!, cv = cvRef.current!;
    const ctx = cv.getContext("2d")!;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, cs = 14, cw = 8, cols = 0, rows = 0, baseY = 0, oy = 0;
    let mask = new Uint8Array(0), rv = new Float32Array(0);
    let ox = 0, tox = 0, px = -999, py = -999, orbK = 1, orbS = 1;
    let raf = 0, visible = false, started = false, tStart = 0, frameN = 0, ready = false, ratio = 0;
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
      const desk = W >= DESK_MIN;
      orbK = desk ? ORB_DESKTOP : 1;      // orb ki intensity
      orbS = desk ? 0.8 : 1;              // orb ka size
      const m = document.createElement("canvas");
      m.width = W; m.height = H;
      const mc = m.getContext("2d", { willReadFrequently: true })!;
      mc.fillStyle = "#fff"; mc.textAlign = "center"; mc.textBaseline = "alphabetic";
      const FONT = (px: number) => `900 ${px}px "Arial Black",Arial,Helvetica,sans-serif`;
      let lcx = W / 2, lcy: number, lr: number;
      if (desk) {
        // Poora naam, do line me, screen ke visual centre pe (navbar ke neeche aur terrain ke upar)
        mc.font = FONT(100);
        const wide = Math.max(...LOGO_DESK.map((t) => mc.measureText(t).width)) / 100;
        const asc = mc.measureText("H").actualBoundingBoxAscent / 100 || 0.716;
        const fs = Math.min(H * 0.24, (W * 0.52) / wide);
        mc.font = FONT(fs);
        const capH = asc * fs, gap = fs * 0.16;
        const blockH = LOGO_DESK.length * capH + (LOGO_DESK.length - 1) * gap;
        lcy = H * 0.47;
        const top = lcy - blockH / 2;
        LOGO_DESK.forEach((t, n) => mc.fillText(t, W / 2, top + capH * (n + 1) + gap * n));
        lr = Math.max(1, Math.hypot((wide * fs) / 2, blockH / 2));
      } else {
        const ls = Math.min(H * 0.42, W * 0.7);
        mc.font = FONT(ls);
        lcy = H * 0.34;
        const capH = (mc.measureText("S").actualBoundingBoxAscent || ls * 0.72);
        mc.fillText(LOGO, W / 2, lcy + capH / 2);
        lr = Math.max(1, ls * 0.6);
      }
      const d = mc.getImageData(0, 0, W, H).data;
      mask = new Uint8Array(cols * rows);
      rv = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const x = Math.min(W - 1, Math.floor(i * cw + cw / 2));
        const y = Math.min(H - 1, Math.floor(j * cs + cs / 2));
        const idx = j * cols + i;
        mask[idx] = d[(y * W + x) * 4 + 3] > 128 ? 1 : 0;
        // Reveal order: 60% random + 40% logo ke centre se doori => andar se bahar assemble hota hai, par dotted/organic
        const rnd = (hs(i, j, 3) % 1000) / 1000;
        const rad = clamp01(Math.hypot(x - lcx, y - lcy) / lr);
        rv[idx] = rnd * 0.6 + rad * 0.4;
      }
    };

    const ridge = (x: number, t: number) => {
      const e = Math.pow(Math.min(Math.abs(x - ox) / (W * 0.5), 1.4), 1.35);
      const n = Math.sin(x * 0.012 + t * 0.35) * 0.5 + Math.sin(x * 0.031 - t * 0.5 + 1.7) * 0.3 + Math.sin(x * 0.07 + t * 0.9) * 0.12 + 0.5;
      return baseY - e * H * 0.11 * (0.35 + n * 0.8);
    };

    const draw = (now: number) => {
      if (!(frameN++ % 40)) readTheme();
      // started se pehle (hero abhi poora screen pe nahi aaya) sirf black dikhta hai: sc = 0, p = 0
      const el = started ? now - tStart : 0;
      const T = RM ? 5 : el / 1000;
      const sc = RM ? 1 : started ? smooth(clamp01(el / SCENE_MS)) : 0;           // scene fade-in
      const p = RM ? 1 : started ? smooth(clamp01((el - LOGO_DELAY) / LOGO_MS)) : 0; // S assemble progress
      ox += (tox - ox) * 0.06;
      ctx.globalAlpha = 1; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
      const R = Math.min(W, H) * 0.28 * orbS;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, R);
      g.addColorStop(0, `rgba(${mix(acc, 255, 0.55).slice(4, -1)},${0.95 * orbK})`);
      g.addColorStop(0.18, `rgba(${cOrb},${0.55 * orbK})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = sc; // orb dheere se jagta hai
      ctx.fillStyle = g; ctx.fillRect(ox - R, oy - R, R * 2, R * 2);
      ctx.textBaseline = "top"; ctx.textAlign = "left";
      ctx.font = `${cs * 0.95}px ${MONO}`;

      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const h = hs(i, j, 7);
        let k = Math.floor(T * 1.1 + ((h % 97) / 97) * 5);
        const x = i * cw, y = j * cs;
        if (mask[j * cols + i]) {
          // a: 0 -> 1 ramp. 0 = chhupa, 0..1 = accent colour me scramble + fade-in, 1 = settled white
          const a = clamp01((p * (1 + RAMP) - rv[j * cols + i]) / RAMP);
          if (a <= 0) continue;
          if (a >= 1) { ctx.fillStyle = "#fff"; ctx.globalAlpha = 0.8 + 0.2 * Math.sin(T * 2 + j * 0.35 + i * 0.2); }
          else { ctx.fillStyle = cNear; ctx.globalAlpha = 0.15 + 0.75 * a; k = Math.floor(T * 14) + i; }
          ctx.fillText(CH[hs(i, j, k) % 36], x, y); continue;
        }
        if (sc <= 0) continue;
        if (h % 100 >= 14) continue;
        let a = 0.07 + ((h >> 8) % 18) / 100;
        const d = Math.hypot(x - px, y - py);
        if (d < 130) { a += (1 - d / 130) * 0.6; k = Math.floor(T * 10) + i; }
        ctx.fillStyle = cBg; ctx.globalAlpha = Math.min(a * 1.6, 0.9) * sc;
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
          ctx.globalAlpha = Math.pow(1 - df, 1.2) * 0.95 * sc;
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

    // FIX: intro tab start hota hai jab hero ~35% dikh raha ho (pehle first pixel pe start ho jaata tha, isliye jab tak
    // user tak scroll karke pahunchta, S ban chuka hota tha aur "ekdum" dikhta tha).
    // Loader ke exit ke baad hi S assemble hota hai (loader dobara na dikhe to turant). 4.5s fallback.
    const tryStart = () => { if (ready && visible && !started && ratio >= 0.35) { started = true; tStart = performance.now(); } };
    const onExit = () => { ready = true; tryStart(); if (visible && !raf) raf = requestAnimationFrame(loop); };
    try { ready = sessionStorage.getItem("ascii-loader-done") === "1"; } catch { ready = true; }
    window.addEventListener("ascii-loader-exit", onExit);
    const fb = window.setTimeout(onExit, 4500);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting; ratio = en.intersectionRatio;
      tryStart();
      if (visible && !raf) raf = requestAnimationFrame(loop);
      if (visible && RM) { started = true; draw(performance.now()); }
    }, { threshold: [0, 0.35] });

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
      window.removeEventListener("ascii-loader-exit", onExit); clearTimeout(fb);
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      wrap.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={wrapRef} aria-label={`${SITE.name} — ${SITE.role}`} className="relative h-svh min-h-[560px] w-full overflow-hidden bg-black">
      <canvas ref={cvRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-6 pb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-mute md:px-12 md:pb-12 md:text-sm">
        <span className="flex items-center gap-3"><span className="inline-block h-2.5 w-2.5 bg-accent2" />{SITE.tagline}</span>
        <span className="hidden sm:block">{SITE.motto}</span>
      </div>
    </section>
  );
}
