"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "./Icons";
import ThemeSwitcher from "./ThemeSwitcher";

type NavLink = { label: string; href: string };

// Mobile hamburger: chhota dropdown card (full-screen nahi). Desktop (md+) pe hide, wahan normal links dikhte hain.
// Close karne ka sirf EK button hai (upar wala hamburger <-> X). Bahar (dim area) tap karne ya Esc se bhi band hota hai.
// Theme colour option ab yahin hai (navbar se hata diya).
// Panel `-z-10` hai (Navbar me ye wrapper apna stacking context banata hai), isliye hamburger button panel ke upar rehta hai.
export default function MobileMenu({ links, resume, demo }: { links: NavLink[]; resume: string; demo: string }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a")?.focus(); // menu khulte hi focus andar
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
        {/* Do alag icons: hamburger <-> X (rotate + fade) */}
        <MenuIcon className={`absolute h-5 w-5 transition-all duration-300 ${open ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
        <CloseIcon className={`absolute h-5 w-5 transition-all duration-300 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} />
      </button>

      {open && (
        <div className="fixed inset-0 -z-10 bg-black/70 backdrop-blur-sm" onClick={close}>
          <div
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-3 top-[4.25rem] max-h-[calc(100svh-5.5rem)] overflow-y-auto rounded-2xl border border-line2 bg-black/95 p-3"
          >
            <ul>
              {links.map((l, n) => (
                <li key={l.href}>
                  <a href={l.href} onClick={close} className="flex items-baseline gap-3 rounded-lg px-2 py-2 text-base font-medium text-white transition-colors active:bg-white/10 active:text-accent2">
                    <span className="w-5 text-[10px] font-semibold tracking-widest text-accent2">{String(n + 1).padStart(2, "0")}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t border-line pt-3">
              <ThemeSwitcher variant="inline" />
            </div>
            <div className="mt-3 flex gap-2">
              <a href={demo} target="_blank" rel="noreferrer" onClick={close} className="flex-1 rounded-full bg-accent2 px-4 py-2.5 text-center text-sm font-semibold text-black">Free demo</a>
              <a href={resume} target="_blank" rel="noreferrer" onClick={close} className="flex-1 rounded-full border border-line2 px-4 py-2.5 text-center text-sm font-medium text-white active:border-accent2">Resume</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
