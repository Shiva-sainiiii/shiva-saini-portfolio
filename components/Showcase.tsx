"use client";

import { useState } from "react";
import AsciiShape from "./AsciiShape";
import { CLIENT_WORK, MORE_DEMOS, NICHES, waLink } from "@/lib/data";
import Fx from "./Fx";

// Niche cards: hover (desktop) ya tap (mobile) pe 3D ASCII shape tez ghoomta hai aur us niche ka palette dikhta hai.
function NicheCard({ n }: { n: (typeof NICHES)[number] }) {
  const [on, setOn] = useState(false);
  const href = n.demo ?? waLink(`Hi Shiva, I run a ${n.name.toLowerCase()} business. I'd like a free demo website.`);
  return (
    <article
      onPointerEnter={(e) => e.pointerType === "mouse" && setOn(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOn(false)}
      onClick={() => setOn((v) => !v)}
      className="group rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent2/50 hover:bg-surface2"
    >
      <div className="h-44 w-full"><AsciiShape shape={n.shape} palette={n.palette} active={on} /></div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-accent2"><Fx>{n.name}</Fx></h3>
        <span className="flex gap-1.5" aria-hidden>
          {n.palette.map((c) => <span key={c} className="h-3.5 w-3.5 rounded-full border border-white/20" style={{ background: c }} />)}
        </span>
      </div>
      <p className="mt-2 text-sm text-mute">{n.pitch}</p>
      <a href={href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="mt-4 inline-block text-sm font-medium text-accent2 underline-offset-4 hover:underline">
        <Fx>{n.demo ? "View live demo →" : "Ask for free demo →"}</Fx>
      </a>
    </article>
  );
}

export default function Showcase() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <p className="text-3xl font-light leading-snug text-white md:text-5xl">
        Every business gets its own <span className="text-accent2">look</span>.
      </p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NICHES.map((n) => <li key={n.id}><NicheCard n={n} /></li>)}
      </ul>

      <h3 className="mt-16 text-xs font-semibold uppercase tracking-[0.2em] text-accent2">Delivered client work</h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {CLIENT_WORK.map((c) => (
          <li key={c.href} className="rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent2/50 hover:bg-surface2">
            <p className="text-xl font-semibold text-white"><Fx>{c.name}</Fx></p>
            <p className="mt-1 text-sm text-mute">{c.city} · {c.note}</p>
            <a href={c.href} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium text-accent2 underline-offset-4 hover:underline"><Fx>Visit live site →</Fx></a>
          </li>
        ))}
        <li className="group flex items-center rounded-2xl border border-dashed border-line2 p-6 transition-colors hover:border-accent2/60">
          <a href={MORE_DEMOS} target="_blank" rel="noreferrer" className="text-lg font-medium text-white transition-colors hover:text-accent2"><Fx>More demo websites</Fx> <span className="inline-block text-accent3 transition-transform duration-200 group-hover:translate-x-1">→</span></a>
        </li>
      </ul>
    </div>
  );
}
