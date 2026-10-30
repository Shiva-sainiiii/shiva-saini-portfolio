"use client";

import { useEffect, useRef, useState } from "react";
import { CH } from "@/lib/ascii";

// ASCII-style hover: parent link/button/card par mouse aate hi text random A-Z/0-9 characters se "decode" hota hai
// (hero wale ASCII jaisa, accent2 colour me), phir asli text settle ho jaata hai.
// Layout shift nahi: asli text DOM me rehta hai (sirf opacity 0), scrambled text uske upar absolute overlay hai.
// Sirf SHORT, single-line labels pe lagao (nav links, buttons, card titles). Lambe paragraph / email (break-all) pe nahi.
// Touch pe nahi chalta (sirf mouse + keyboard focus). prefers-reduced-motion me band.
// Host = sabse paas ka a / button / li / article ya koi bhi element jisme data-fx-host ho.
const DUR = 520;      // total ms
const TICK = 45;      // scramble chars kitni der me badalte hain (ms)

// tone = scramble ke rang ki class. Default accent2; jahan hover pe background accent2 ho jaata hai wahan "text-black" do.
export default function Fx({ children, tone = "text-accent2" }: { children: string; tone?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState<string | null>(null);

  useEffect(() => {
    const host = root.current?.closest("a,button,li,article,[data-fx-host]") as HTMLElement | null;
    if (!host || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const text = children;
    const n = Math.max(1, text.length);
    let raf = 0, t0 = 0, last = -TICK;

    const step = (now: number) => {
      const p = (now - t0) / DUR;
      if (p >= 1) { raf = 0; setOut(null); return; }
      if (now - last >= TICK) {
        last = now;
        let s = "";
        for (let i = 0; i < n; i++) {
          const c = text[i];
          const settleAt = 0.15 + (i / n) * 0.6; // left se right settle hota hai
          s += /[A-Za-z0-9]/.test(c) && p < settleAt ? CH[Math.floor(Math.random() * CH.length)] : c;
        }
        setOut(s);
      }
      raf = requestAnimationFrame(step);
    };
    const go = () => { if (raf) return; t0 = performance.now(); last = -TICK; raf = requestAnimationFrame(step); };
    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") go(); };
    const focus = () => { try { if (host.matches(":focus-visible")) go(); } catch { /* purane browser */ } };

    host.addEventListener("pointerenter", enter);
    host.addEventListener("focusin", focus);
    return () => {
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("focusin", focus);
      cancelAnimationFrame(raf);
      setOut(null);
    };
  }, [children]);

  return (
    <span ref={root} className="relative">
      <span className={out === null ? undefined : "opacity-0"}>{children}</span>
      {out !== null && (
        <span aria-hidden className={`pointer-events-none absolute inset-0 whitespace-nowrap ${tone}`}>{out}</span>
      )}
    </span>
  );
}
