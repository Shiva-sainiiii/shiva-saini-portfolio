import { trades } from "@/data/trades";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";
const date = "2026-11-16"; // content badle to ye date badal do
export default function sitemap() {
  return [
    { url: base, lastModified: date, changeFrequency: "monthly", priority: 1 },
    ...trades.map((t) => ({ url: `${base}/${t.slug}`, lastModified: date, changeFrequency: "monthly", priority: 0.8 })),
  ];
}
