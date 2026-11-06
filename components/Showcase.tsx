import { CLIENT_WORK, MORE_DEMOS, NICHES, waLink } from "@/lib/data";

// WORK section: pehle asli client (Dr. Sapna) bada, phir niche demos rows me. Cards nahi, sirf rules + bada text.
export default function Showcase() {
  return (
    <div>
      <ul>
        {CLIENT_WORK.map((c) => (
          <li key={c.href} data-cursor="VISIT" className="group border-t border-line pb-14 pt-8 md:pb-20">
            <p className="text-sm font-medium text-accent2">Live client site · {c.city}</p>
            <a href={c.href} target="_blank" rel="noreferrer" className="mt-4 block font-display text-[11vw] font-extrabold uppercase leading-[0.85] tracking-[-0.05em] transition-colors group-hover:text-accent2 md:text-[8vw]">
              {c.name}
            </a>
            <p className="mt-5 max-w-xl text-lg text-ink/80">{c.note}</p>
            {c.result && <p className="mt-2 max-w-xl text-ink">{c.result}</p>}
          </li>
        ))}
      </ul>

      <h3 className="border-t border-line pt-8 font-display text-3xl font-extrabold uppercase tracking-[-0.03em] md:text-5xl">Demo sites by trade</h3>
      <ul className="mt-8 border-t border-line">
        {NICHES.map((n) => {
          const href = n.demo ?? waLink(`Hi Shiva, I run a ${n.name.toLowerCase()} business. I'd like a free demo website.`);
          return (
            <li key={n.id} className="border-b border-line">
              <a href={href} target="_blank" rel="noreferrer" data-cursor={n.demo ? "DEMO" : "ASK"} className="group grid items-baseline gap-2 py-6 md:grid-cols-[1fr_1.2fr_auto] md:gap-8 md:py-7">
                <span className="font-display text-4xl font-extrabold uppercase leading-none tracking-[-0.04em] transition-colors group-hover:text-accent2 md:text-5xl">{n.name}</span>
                <span className="text-mute">{n.pitch}</span>
                <span className="flex items-center gap-3 text-sm font-semibold text-accent2">
                  <span className="flex gap-1.5" aria-hidden>{n.palette.map((c) => <span key={c} className="h-3.5 w-3.5 rounded-full border border-line2" style={{ background: c }} />)}</span>
                  {n.demo ? "Live demo ↗" : "Ask for a demo ↗"}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <a href={MORE_DEMOS} target="_blank" rel="noreferrer" className="mt-8 inline-block text-lg font-semibold text-ink underline underline-offset-8 transition-colors hover:text-accent2">More demo websites ↗</a>
    </div>
  );
}
