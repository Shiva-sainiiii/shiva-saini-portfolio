"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./Icons";

type NavLink = { label: string; href: string };

// Mobile hamburger: full-screen menu. Desktop (md+) pe hide, wahan normal links dikhte hain.
// FIX: pehle panel button ke UPAR paint hota tha (fixed + baad me DOM me), isliye close icon dikhta hi nahi tha.
// Ab panel `-z-10` hai (Navbar me ye wrapper apna stacking context banata hai), isliye button / theme / Free demo panel ke upar rehte hain.
export default function MobileMenu({ links, resume, demo }: { links: NavLink[]; resume: string; demo: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    // Desktop width pe resize ho jaye to menu band (md:hidden wrapper ke andar panel atka na rahe)
    const mq = matchMedia("(min-width: 768px)");
    const onMq = () => { if (mq.matches) setOpen(false); };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className={`relative grid h-10 w-10 place-items-center rounded-full border bg-white/10 text-white backdrop-blur-md transition-colors ${open ? "border-accent2" : "border-white/25 hover:border-accent2"}`}
      >
        {/* Do alag icons: hamburger <-> X (rotate + fade), taaki close icon saaf dikhe */}
        <MenuIcon className={`absolute h-5 w-5 transition-all duration-300 ${open ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
        <CloseIcon className={`absolute h-5 w-5 transition-all duration-300 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} />
      </button>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" className="fixed inset-0 -z-10 overflow-y-auto bg-black/95 px-6 pb-10 pt-24 backdrop-blur-sm">
          <ul className="space-y-1">
            {links.map((l, n) => (
              <li key={l.href}>
                <a href={l.href} onClick={close} className="flex items-baseline gap-4 border-b border-line py-4 text-3xl font-semibold text-white transition-colors active:text-accent2">
                  <span className="text-xs font-semibold tracking-widest text-accent2">{String(n + 1).padStart(2, "0")}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={demo} target="_blank" rel="noreferrer" onClick={close} className="rounded-full bg-accent2 px-6 py-3 text-sm font-semibold text-black">Free demo website</a>
            <a href={resume} target="_blank" rel="noreferrer" onClick={close} className="rounded-full border border-line2 px-6 py-3 text-sm font-medium text-white">Resume</a>
          </div>
          <button type="button" onClick={close} className="mt-10 inline-flex items-center gap-2 text-sm text-mute transition-colors active:text-white">
            <CloseIcon className="h-4 w-4" /> Close menu
          </button>
        </div>
      )}
    </div>
  );
}
