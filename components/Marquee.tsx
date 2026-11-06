// Infinite strip: stack/skills. CSS-only (globals.css me @keyframes marquee). Hover pe ruk jaati hai, reduced-motion me static.
export default function Marquee({ items }: { items: string[] }) {
  const row = (k: string) => (
    <ul key={k} aria-hidden={k === "b"} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 font-display text-4xl font-extrabold uppercase tracking-[-0.03em] md:text-6xl">
          {t}<span aria-hidden className="h-3 w-3 rotate-45 bg-accent2" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-line py-6 text-ink md:py-8">
      <div className="marquee-track flex w-max">{row("a")}{row("b")}</div>
    </div>
  );
}
