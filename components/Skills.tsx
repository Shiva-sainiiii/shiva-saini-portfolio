import type { Skill } from "@/lib/content";

// Simple static list (pehle do marquee rows thi). Kam motion, zyada readable.
export default function Skills({ items }: { items: Skill[] }) {
  return (
    <ul className="flex flex-wrap gap-x-8 gap-y-2 font-display text-4xl text-ink md:text-6xl">
      {items.map((s) => (
        <li key={s.id} className="transition-colors hover:text-accent2">{s.name}</li>
      ))}
    </ul>
  );
}
