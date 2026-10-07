import type { Skill } from "@/lib/content";

// Do rows, ulti direction me chalti marquee. Edges pe fade mask.
// Row 1 = ink, row 2 = accent2 (decoration, theme ke saath badalta hai).
export default function Skills({ items }: { items: Skill[] }) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)].filter((r) => r.length);
  return (
    <div className="space-y-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      {rows.map((row, r) => (
        <div key={r} className="marquee flex w-max gap-14 text-4xl font-light md:text-6xl" style={{ animationDirection: r ? "reverse" : "normal" }}>
          {Array.from({ length: 8 }).flatMap(() => row).map((s, i) => (
            <span key={i} className={`whitespace-nowrap ${r ? "text-accent2/70" : "text-ink/80"}`}>{s.name}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
