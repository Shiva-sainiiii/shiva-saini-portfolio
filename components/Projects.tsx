import type { Project } from "@/lib/content";

// Pehle 4 projects bade (screenshot + description, left/right alternate), baaki compact list me.
// Data Supabase `projects` table se (title, description, tech, image, live_url, code_url) — schema nahi badla.
const FEATURED = 4;

const Links = ({ p }: { p: Project }) => (
  <div className="flex gap-6 text-sm">
    {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="font-medium text-accent2 underline-offset-4 hover:underline">Live site ↗</a>}
    {p.code_url && <a href={p.code_url} target="_blank" rel="noreferrer" className="text-mute underline-offset-4 hover:text-white hover:underline">Source ↗</a>}
  </div>
);

export default function Projects({ items }: { items: Project[] }) {
  const feat = items.slice(0, FEATURED), rest = items.slice(FEATURED);
  const tech = (p: Project) => p.tech.split(",").map((t) => t.trim()).filter(Boolean).join(" / ");
  return (
    <div>
      <ul className="space-y-20 md:space-y-28">
        {feat.map((p, i) => (
          <li key={p.id} className={`grid gap-6 md:items-center md:gap-12 ${p.image ? "md:grid-cols-[1.35fr_1fr]" : ""}`}>
            {p.image && (
              <a href={p.live_url || undefined} target="_blank" rel="noreferrer" aria-label={`${p.title} live site`} className={`block overflow-hidden border border-line ${i % 2 ? "md:order-2" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="aspect-video w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </a>
            )}
            <div>
              <h3 className="font-display text-4xl text-white md:text-5xl">{p.title}</h3>
              <p className="mt-4 text-ink">{p.description}</p>
              {p.tech && <p className="mt-4 text-sm text-mute">{tech(p)}</p>}
              <div className="mt-6"><Links p={p} /></div>
            </div>
          </li>
        ))}
      </ul>

      {rest.length > 0 && (
        <>
          <p className="mt-24 font-display text-3xl text-white">More <em className="text-accent2">projects</em></p>
          <ul className="mt-6 border-t border-line">
            {rest.map((p) => (
              <li key={p.id} className="flex flex-col gap-2 border-b border-line py-5 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <h3 className="font-display text-2xl text-white md:text-3xl">{p.title}</h3>
                <p className="hidden flex-1 truncate text-sm text-mute md:block">{tech(p)}</p>
                <Links p={p} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
