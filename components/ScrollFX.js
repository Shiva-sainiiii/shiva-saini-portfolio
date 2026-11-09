"use client";
import { useEffect } from "react";

const SEL = ".sec > .d, .sec > .between, .bill, .browser, .rate, .svc-row, .ticket, .k-row, .note, .vcard, .exp-row, .frame, .phone, .slip, .mapbox, .open-sign, .stickers";

export default function ScrollFX() {
  useEffect(() => {
    // scroll progress bar (nav ke neeche)
    const root = document.documentElement;
    const onScroll = () => {
      const h = root.scrollHeight - innerHeight;
      root.style.setProperty("--p", h > 0 ? Math.min(1, scrollY / h).toFixed(4) : 0);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });

    // reveal on scroll
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io;
    if (!reduce && "IntersectionObserver" in window) {
      root.classList.add("js");
      const els = [...document.querySelectorAll(SEL)];
      els.forEach((el) => {
        const sibs = [...el.parentElement.children].filter((c) => c.matches(SEL));
        el.style.setProperty("--i", Math.min(sibs.indexOf(el), 5));
        el.classList.add("rv");
      });
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      els.forEach((el) => io.observe(el));
    }
    return () => { removeEventListener("scroll", onScroll); io && io.disconnect(); };
  }, []);
  return null;
}
