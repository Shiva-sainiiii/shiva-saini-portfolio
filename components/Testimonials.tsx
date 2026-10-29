import { TESTIMONIALS } from "@/lib/data";

// Data lib/data.ts ke TESTIMONIALS se aata hai (khali ho to Sections.tsx isko render hi nahi karta).
export default function Testimonials() {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {TESTIMONIALS.map((t) => (
        <li key={t.name + t.city} className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-lg leading-relaxed text-white">“{t.quote}”</p>
          <p className="mt-5 text-sm font-semibold text-accent2">{t.name}</p>
          <p className="text-sm text-mute">{t.role ? `${t.role} · ` : ""}{t.city}</p>
        </li>
      ))}
    </ul>
  );
}
