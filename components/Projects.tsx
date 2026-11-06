"use client";

import { useRef, useState } from "react";
import type { Project } from "@/lib/content";

// Projects: bade rows (card grid nahi). Desktop pe row par hover => screenshot cursor ke saath chalta hai (cursor "VIEW" ban jaata hai).
// Mobile pe screenshot row ke andar chhota thumbnail. Data Supabase `projects` table se — schema nahi badla.
const Links = ({ p }: { p: Project }) => (
  <span className="flex gap-5 text-sm">
    {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="font-semibold text-accent2 underline-offset-4 hover:underline">Live ↗</a>}
    {p.code_url && <a href={p.code_url} target="_blank" rel="noreferrer" className="text-mute underline-offset-4 hover:text-ink hover:underline">Source ↗</a>}
  </span>
);

export default function Projects({ items }: { items: Project[] }) {
  const [hover, setHover] = useState<Project | null>(null);
  const tip = useRef<HTMLDivElement>(null);
  const tech = (p: Project) => p.tech.split(",").map((t) => t.trim()).filter(Boolean).join(" / ");
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !tip.current) return;
    tip.current.style.transform = `translate3d(${e.clientX + 28}px,${e.clientY - 110}px,0)`;
  };

  return (
    <div onPointerMove={move}>
      <ul className="border-t border-line">
        {items.map((p) => (
          <li
            key={p.id}
            data-cursor={p.live_url ? "VIEW" : undefined}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHover(p)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
            className="group border-b border-line py-6 md:py-8"
          >
            <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_auto] md:items-baseline md:gap-8">
              <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.04em] transition-colors group-hover:text-accent2 md:text-6xl">
                {p.live_url ? <a href={p.live_url} target="_blank" rel="noreferrer">{p.title}</a> : p.title}
              </h3>
              <p className="text-sm text-mute md:text-base">{tech(p) || p.description}</p>
              <Links p={p} />
            </div>
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="mt-4 aspect-video w-40 object-cover md:hidden" />
            )}
          </li>
        ))}
      </ul>

      {/* Desktop hover preview (pointer-events none, cursor ke saath chalta hai) */}
      <div ref={tip} aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block" style={{ opacity: hover?.image ? 1 : 0, transition: "opacity .2s" }}>
        {hover?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hover.image} alt="" className="aspect-video w-[340px] border border-line2 object-cover" />
        )}
      </div>
    </div>
  );
}
