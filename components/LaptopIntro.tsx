"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/data";
import { createHackBg } from "@/lib/hackBg";
import { createLaptopScene } from "@/lib/laptopScene";
import { createTerminal } from "@/lib/terminalScreen";
import AsciiHero from "./AsciiHero";

// HERO INTRO (paper plane ki jagah):
//   1) 3D laptop dikhta hai. Piche + dono side ASCII "hacking" background (code rain + logs), screen par info auto-type loop me chalti hai.
//   2) Scroll karne par camera laptop ki screen ke andar zoom karti hai (page tab tak pinned rehta hai).
//   3) Screen poori viewport bhar le to ASCII "SHIVA SAINI" hero uspar aa jaata hai, phir normal scroll.
// Scroll progress p (0..1) ke phase: zoom 0.03→0.80 | hacking bg fade 0.35→0.85 | ACCESS GRANTED 0.60→0.85 | hero fade-in 0.80→0.91 | hold 0.91→1.
// Scroll length badalna ho to SCROLL_VH (page kitni der pinned rahe). Reduced-motion / WebGL na ho / GLB load fail => seedha purana ASCII hero.
const SCROLL_VH = 400;
const HERO_FROM = 0.8, HERO_TO = 0.91;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a: number, b: number, v: number) => { const k = clamp((v - a) / (b - a)); return k * k * (3 - 2 * k); };

export default function LaptopIntro() {
  const [plain, setPlain] = useState(false);
  const secRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLButtonElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  // Plain mode: seedha hero dikhao (laptop nahi)
  useEffect(() => {
    if (!plain) return;
    window.dispatchEvent(new CustomEvent("hero-visible", { detail: true }));
  }, [plain]);

  useEffect(() => {
    if (plain) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setPlain(true); return; }

    const sec = secRef.current!, intro = introRef.current!, bgCv = bgRef.current!, host = hostRef.current!, hero = heroRef.current!, hint = hintRef.current!, hud = hudRef.current!;
    const bg = createHackBg(bgCv);
    const term = createTerminal();
    let disposed = false, heroOn = false, lastBg = 0, active = true;

    const scene = createLaptopScene({
      host,
      screen: term.canvas,
      draw: term.draw,
      onFail: () => { if (!disposed) setPlain(true); },
      onFrame: (p, now) => {
        // Hacking background: laptop ke saath fade + halka "andar ghusne" wala scale
        const bgA = 1 - smooth(0.35, 0.85, p);
        bgCv.style.opacity = String(bgA);
        bgCv.style.transform = `scale(${1 + 0.45 * smooth(0, 0.85, p)})`;
        if (bgA > 0.01 && now - lastBg > 33) { lastBg = now; bg.draw(now, 1); }
        // Hero overlay (laptop screen ke "andar" ka page)
        const ho = smooth(HERO_FROM, HERO_TO, p);
        hero.style.opacity = String(ho);
        hero.style.visibility = ho > 0.001 ? "visible" : "hidden";
        hero.style.pointerEvents = ho > 0.9 ? "auto" : "none";
        const on = p >= HERO_FROM - 0.01;
        if (on !== heroOn) { heroOn = on; window.dispatchEvent(new CustomEvent("hero-visible", { detail: on })); }
        // HUD + scroll hint
        const ha = 1 - smooth(0.0, 0.1, p);
        hint.style.opacity = String(ha); hint.style.visibility = ha > 0.01 ? "visible" : "hidden";
        hud.style.opacity = String(1 - smooth(0.25, 0.6, p));
      },
    });
    if (!scene) { setPlain(true); return; }

    // ---- scroll -> progress
    const update = () => {
      const total = sec.offsetHeight - window.innerHeight;
      const top = sec.getBoundingClientRect().top;
      scene.setTarget(total > 0 ? clamp(-top / total) : 0);
    };
    update();
    const onResize = () => { bg.resize(); scene.resize(); update(); };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      scene.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    // ---- sirf jab section screen pe ho tab render karo
    const io = new IntersectionObserver(([en]) => {
      active = en.isIntersecting;
      if (active) scene.start(); else scene.stop();
    }, { threshold: 0 });
    io.observe(sec);
    scene.start();

    // ---- loader ke baad screen "on" ho (typing tabhi shuru ho)
    let began = false;
    const begin = () => { if (began || disposed) return; began = true; intro.style.opacity = "1"; scene.begin(); };
    let ready = false;
    try { ready = sessionStorage.getItem("ascii-loader-done") === "1"; } catch { ready = true; }
    const t1 = window.setTimeout(begin, ready ? 150 : 4800);
    const onExit = () => { window.clearTimeout(t1); window.setTimeout(begin, 500); };
    window.addEventListener("ascii-loader-exit", onExit);

    return () => {
      disposed = true;
      window.clearTimeout(t1);
      window.removeEventListener("ascii-loader-exit", onExit);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      io.disconnect();
      scene.dispose();
    };
  }, [plain]);

  const skip = () => {
    const sec = secRef.current;
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (sec.offsetHeight - window.innerHeight) * 0.97, behavior: "smooth" });
  };

  return (
    <section
      ref={secRef}
      id="top"
      aria-label={`${SITE.name} — ${SITE.role}`}
      className="relative w-full"
      style={plain ? undefined : { height: `${SCROLL_VH}svh` }}
    >
      <h1 className="sr-only">{SITE.name} — {SITE.role}</h1>
      <div className={plain ? "relative" : "sticky top-0 h-svh min-h-[560px] w-full overflow-hidden bg-black"}>
        {!plain && (
          <>
            {/* opacity 0 tab tak jab tak loader khatam na ho (screen on hone se pehle kuch na dikhe) */}
            <div ref={introRef} aria-hidden="true" className="absolute inset-0 opacity-0 transition-opacity duration-1000">
              <canvas ref={bgRef} className="absolute inset-0 h-full w-full will-change-transform" />
              <div ref={hostRef} className="absolute inset-0" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.65)_100%)]" />
            </div>

            <div ref={hudRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-20 flex justify-between px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-mute md:top-24 md:px-12 md:text-xs">
              <span className="flex items-center gap-2"><span className="inline-block h-2 w-2 animate-pulse bg-accent3" />SYS://SHIVA-SAINI</span>
              <span className="hidden sm:block">SESSION · 0x7F3A · SECURE</span>
            </div>

            <button
              ref={hintRef}
              type="button"
              onClick={skip}
              aria-label="Scroll to enter the portfolio"
              className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mute transition-colors hover:text-white md:bottom-12 md:text-xs"
            >
              <span>Scroll to enter</span>
              <span aria-hidden className="block h-8 w-px animate-pulse bg-gradient-to-b from-accent2 to-transparent" />
            </button>
          </>
        )}

        {/* Hero: laptop ki screen ke "andar" ka page. Intro me ye overlay hai (opacity scroll se), plain mode me normal flow */}
        <div ref={heroRef} className={plain ? "relative" : "absolute inset-0 bg-black"} style={plain ? undefined : { opacity: 0, visibility: "hidden", pointerEvents: "none" }}>
          <AsciiHero gated />
        </div>
      </div>
    </section>
  );
}
