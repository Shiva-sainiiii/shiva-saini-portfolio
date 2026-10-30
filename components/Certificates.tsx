"use client";
import { useEffect, useState } from "react";
import type { Cert } from "@/lib/content";

export default function Certificates({ items }: { items: Cert[] }) {
  const [open, setOpen] = useState<Cert | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((c) => (
          <li key={c.id}>
            <button onClick={() => c.image && setOpen(c)} className="group block w-full text-left">
              {c.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image} alt={c.title} loading="lazy" className="aspect-[4/3] w-full rounded-xl border border-line object-cover transition-[transform,border-color] duration-500 group-hover:scale-[1.02] group-hover:border-accent2/60" />
              )}
              <p className="mt-3 font-medium text-white transition-colors group-hover:text-accent2">{c.title}</p>
              <p className="text-sm text-mute">{c.issuer}</p>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)} className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open.image} alt={open.title} className="max-h-full max-w-full rounded-lg object-contain" />
          <button type="button" aria-label="Close" autoFocus onClick={() => setOpen(null)} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/60 text-xl text-white">×</button>
        </div>
      )}
    </>
  );
}
