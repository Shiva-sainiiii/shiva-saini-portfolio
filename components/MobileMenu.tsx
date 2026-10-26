"use client";

import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

// Mobile hamburger: full-screen menu. Desktop (md+) pe hide, wahan normal links dikhte hain.
// Panel navbar ke <nav> ke NEECHE paint hota hai (nav = relative z-10), isliye logo / theme / Free demo menu ke upar dikhte rahte hain.
export default function MobileMenu({ links, resume, demo }: { links: NavLink[]; resume: string; demo: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
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
        className="relative grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-colors hover:border-accent2"
      >
        <span aria-hidden className="relative block h-3 w-4">
          <span className={`absolute left-0 h-0.5 w-4 bg-white transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-white transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute left-0 h-0.5 w-4 bg-white transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
        </span>
      </button>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" className="fixed inset-0 overflow-y-auto bg-black/95 px-6 pb-10 pt-24 backdrop-blur-sm">
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
            <a href={demo} target="_blank" rel="noreferrer" onClick={close} className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-black">Free demo website</a>
            <a href={resume} target="_blank" rel="noreferrer" onClick={close} className="rounded-full border border-line2 px-6 py-3 text-sm font-medium text-white">Resume</a>
          </div>
        </div>
      )}
    </div>
  );
}
