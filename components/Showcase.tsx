"use client";

import { useState } from "react";
import AsciiShape from "./AsciiShape";
import { CLIENT_WORK, MORE_DEMOS, NICHES, waLink } from "@/lib/data";

// Niche demos: hover (desktop) ya tap (mobile) pe 3D ASCII shape tez ghoomta hai aur us niche ka palette dikhta hai. Boxed card nahi, sirf rule + text.
function NicheCard({ n }: { n: (typeof NICHES)[number] }) {
  const [on, setOn] = useState(false);
  const href = n.demo ?? waLink(`Hi Shiva, I run a ${n.name.toLowerCase()} business. I'd like a free demo website.`);
  return (
    <article
      onPointerEnter={(e) => e.pointerType === "mouse" && setOn(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOn(false)}
      onClick={() => setOn((v) => !v)}
      className="border-t border-line pt-5"
    >
      <div className="h-44 w-full"><AsciiShape shape={n.shape} palette={n.palette} active={on} /></div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-3xl text-white">{n.name}</h3>
        <span className="flex gap-1.5" aria-hidden>
          {n.palette.map((c) => <span key={c} className="h-3.5 w-3.5 rounded-full border border-white/20" style={{ background: c }} />)}
        </span>
      </div>
      <p className="mt-2 text-sm text-mute">{n.pitch}</p>
      <a href={href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="mt-4 inline-block text-sm font-medium text-accent2 underline-offset-4 hover:underline">
        {n.demo ? "View live demo ↗" : "Ask for a free demo ↗"}
      </a>
    </article>
  );
}

export default function Showcase() {
  return (
    <div>
      <p className="max-w-xl text-lg text-ink">Every trade gets its own look. Hover a shape to see its palette, open a live demo, or ask for one made for your business.</p>
      <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {NICHES.map((n) => <li key={n.id}><NicheCard n={n} /></li>)}
      </ul>

      <div className="mt-24 grid gap-8 border-t border-line pt-10 md:grid-cols-[1fr_2fr]">
        <h3 className="font-display text-4xl text-white">Live for a <em className="text-accent2">client</em></h3>
        <ul className="space-y-10">
          {CLIENT_WORK.map((c) => (
            <li key={c.href}>
              <p className="font-display text-3xl text-white md:text-4xl">{c.name}</p>
              <p className="mt-2 text-mute">{c.city} · {c.note}</p>
              {c.result && <p className="mt-2 text-ink">{c.result}</p>}
              <a href={c.href} target="_blank" rel="noreferrer" className="mt-4 inline-block font-medium text-accent2 underline-offset-4 hover:underline">Visit live site ↗</a>
            </li>
          ))}
          <li>
            <a href={MORE_DEMOS} target="_blank" rel="noreferrer" className="text-lg text-white underline underline-offset-8 transition-colors hover:text-accent2">More demo websites ↗</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
