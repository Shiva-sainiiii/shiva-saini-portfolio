"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/data";
import { createHeroScene, type HeroScene } from "@/lib/heroScene";
import Fx from "./Fx";

// HERO: giant headline, uske upar 3D "deal with it" glasses girte hain, chain jhoolti hai.
// Section SCROLL_VH tak pinned rehta hai; scroll progress se glasses ghoomte/bade hote hain, text upar khisakta hai.
// Preloader "preloader-exit" event bhejta hai => glasses tab girte hain. (Event miss ho to FALLBACK_MS baad girte hain.)
// WebGL na ho / reduced-motion / GLB fail => sirf text hero (pinned nahi), site phir bhi poori kaam karti hai.
const SCROLL_VH = 220;
const FALLBACK_MS = 4500;

export default function GlassesHero() {
  const [plain, setPlain] = useState(false);
  const secRef = useRef<HTMLElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setPlain(true); return; }
    const cv = cvRef.current!, sec = secRef.current!, text = textRef.current!;
    let loaded = false, exited = false, played = false;
    let scene: HeroScene | null = null;
    const tryPlay = () => { if (scene && loaded && exited && !played) { played = true; scene.play(); } };
    scene = createHeroScene(cv, { onReady: () => { loaded = true; tryPlay(); }, onFail: () => setPlain(true) });
    const sc = scene;
    const onExit = () => { exited = true; tryPlay(); };
    window.addEventListener("preloader-exit", onExit);
    const fb = window.setTimeout(onExit, FALLBACK_MS);

    const onScroll = () => {
      const r = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      sc.setProgress(p);
      text.style.transform = `translate3d(0,${-p * 14}vh,0)`;
      text.style.opacity = String(1 - p * 0.55);
    };
    const onMove = (e: PointerEvent) => sc.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    const io = new IntersectionObserver(([en]) => sc.setActive(en.isIntersecting), { threshold: 0 });
    io.observe(sec);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("preloader-exit", onExit);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      clearTimeout(fb); io.disconnect(); sc.dispose();
    };
  }, []);

  return (
    <section ref={secRef} id="top" style={{ height: plain ? "auto" : `${SCROLL_VH}svh` }} className="relative">
      <div className={`${plain ? "min-h-[100svh]" : "sticky top-0 h-[100svh]"} overflow-hidden`}>
        <div ref={textRef} className="absolute inset-0 flex flex-col justify-center px-5 will-change-transform md:px-10">
          <h1 className="font-display text-[17vw] font-extrabold uppercase leading-[0.8] tracking-[-0.055em] text-ink md:text-[13.5vw]">
            <span className="block">Your shop,</span>
            <span className="ml-[10vw] block text-accent2">online.</span>
            <span className="sr-only"> — websites for local businesses in Haryana by {SITE.name}</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-snug text-ink/80 md:ml-[10vw] md:text-lg">
            Websites for clinics, gyms, cafés and shops in Haryana. Fast, on Google, with WhatsApp bookings.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 md:ml-[10vw]">
            <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="rounded-full bg-accent2 px-7 py-3.5 text-sm font-bold text-black transition hover:brightness-110">
              <Fx tone="text-black">Get a free demo</Fx>
            </a>
            <a href="#work" className="rounded-full border border-line2 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent2 hover:text-accent2">
              <Fx>See live work</Fx>
            </a>
          </div>
        </div>
        {/* canvas text ke UPAR (glasses headline ko dhakte hain), pointer-events none */}
        <canvas ref={cvRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${plain ? "hidden" : ""}`} />
      </div>
    </section>
  );
}
