"use client";
import { useEffect, useRef, useState } from "react";

// Poora site ab ek hi theme colour (--accent2) follow karta hai: buttons, links, hover, glow, ASCII sab.
// Naya option chahiye? Bas yahan ek line add karo (aur app/layout.tsx ke head script wale map me bhi, taaki refresh pe flash na ho).
const THEMES = [
  { id: "violet", name: "Violet", rgb: "167 139 250" },
  { id: "pink", name: "Pink", rgb: "244 114 182" },
  { id: "amber", name: "Amber", rgb: "251 191 36" },
  { id: "coral", name: "Coral", rgb: "255 107 74" }, // lime hata diya: teesra colour volt (accent3) usse clash karta
];
const KEY = "accent-theme";
const EVT = "accent-theme-change"; // dono switcher (desktop popover + mobile menu) sync rahein

// variant "popover": desktop navbar ka button + dropdown. variant "inline": mobile menu ke andar seedhi swatch row.
export default function ThemeSwitcher({ variant = "popover" }: { variant?: "popover" | "inline" }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("violet");
  const box = useRef<HTMLDivElement>(null);

  // Saved choice padho (colour pehle hi head script laga chuka hota hai, yahan sirf selected tick ke liye)
  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s && THEMES.some((t) => t.id === s)) setTheme(s);
    } catch {}
    const sync = (e: Event) => setTheme((e as CustomEvent<string>).detail);
    window.addEventListener(EVT, sync);
    return () => window.removeEventListener(EVT, sync);
  }, []);

  // Bahar click ya Esc pe band (sirf popover)
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  const pick = (id: string) => {
    const t = THEMES.find((x) => x.id === id) ?? THEMES[0];
    document.documentElement.style.setProperty("--accent2", t.rgb);
    setTheme(t.id);
    try { localStorage.setItem(KEY, t.id); } catch {}
    window.dispatchEvent(new CustomEvent(EVT, { detail: t.id }));
  };

  if (variant === "inline") {
    return (
      <div>
        <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-mute">Theme colour</p>
        <div className="flex gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => pick(t.id)}
              aria-pressed={theme === t.id}
              aria-label={`${t.name} theme`}
              className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl border px-2 py-2 text-[11px] transition-colors ${theme === t.id ? "border-accent2 text-white" : "border-line2 text-mute active:border-accent2"}`}
            >
              <span className="h-4 w-4 rounded-full" style={{ background: `rgb(${t.rgb})` }} />
              {t.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change theme colour"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-colors hover:border-accent2"
      >
        <span className="h-4 w-4 rounded-full bg-accent2" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-44 rounded-2xl border border-white/10 bg-black/90 p-2 backdrop-blur-xl">
          <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Theme colour</p>
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => pick(t.id)}
              aria-pressed={theme === t.id}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span className="h-4 w-4 rounded-full" style={{ background: `rgb(${t.rgb})` }} />
              <span className="flex-1">{t.name}</span>
              {theme === t.id && <span className="text-accent2">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
