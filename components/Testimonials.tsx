import { TESTIMONIALS } from "@/lib/data";

// Data lib/data.ts ke TESTIMONIALS se aata hai (khali ho to Sections.tsx isko render hi nahi karta).
export default function Testimonials() {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {TESTIMONIALS.map((t) => (
        <li key={t.name + t.city} data-card className="rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent2/40 hover:bg-surface2">
          <p className="text-lg leading-relaxed text-white">“{t.quote}”</p>
          <p className="mt-5 text-sm font-semibold text-accent2">{t.name}</p>
          <p className="text-sm text-mute">{t.role ? `${t.role} · ` : ""}{t.city}</p>
        </li>
      ))}
    </ul>
  );
}
