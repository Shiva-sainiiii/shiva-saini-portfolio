import type { Project } from "@/lib/content";
import Fx from "./Fx";

// Desktop: row hover/focus pe khulti hai (image + details). Mobile: hamesha khuli.
export default function Projects({ items }: { items: Project[] }) {
  return (
    <ul>
      {items.map((p) => (
        <li key={p.id} tabIndex={0} className="group border-b border-line py-8 outline-none first:pt-0 focus-visible:ring-1 focus-visible:ring-accent2/60">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-3xl font-semibold text-mute transition-colors group-hover:text-accent2 group-focus:text-accent2 md:text-5xl">
              <Fx>{p.title}</Fx>
            </h3>
            <span className="hidden text-3xl text-faint transition-all duration-500 group-hover:rotate-45 group-hover:text-accent3 group-focus:rotate-45 group-focus:text-accent3 md:block">+</span>
          </div>
          <div className="grid transition-[grid-template-rows] duration-500 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <div className={`grid gap-6 pt-6 ${p.image ? "md:grid-cols-[1.2fr_1fr]" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.image && <img src={p.image} alt={p.title} loading="lazy" className="aspect-video w-full rounded-xl border border-line object-cover" />}
                <div>
                  <p className="text-ink">{p.description}</p>
                  {p.tech && (
                    <ul className="mt-4 flex flex-wrap gap-2 text-xs text-ink">
                      {p.tech.split(",").map((t) => (
                        <li key={t} className="chip rounded-full border border-accent2/30 px-3 py-1">{t.trim()}</li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-5 flex gap-6 text-sm">
                    {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="font-medium text-accent2 underline-offset-4 hover:underline"><Fx>Live</Fx></a>}
                    {p.code_url && <a href={p.code_url} target="_blank" rel="noreferrer" className="text-mute underline-offset-4 hover:text-accent2 hover:underline"><Fx>Code</Fx></a>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
