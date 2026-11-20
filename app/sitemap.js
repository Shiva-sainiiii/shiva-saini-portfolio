import { trades } from "@/data/trades";
import { courses } from "@/data/courses";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";
const date = "2026-11-20"; // content badle to ye date badal do
export default function sitemap() {
  return [
    { url: base, lastModified: date, changeFrequency: "monthly", priority: 1 },
    ...trades.map((t) => ({ url: `${base}/${t.slug}`, lastModified: date, changeFrequency: "monthly", priority: 0.8 })),
    { url: `${base}/courses`, lastModified: date, changeFrequency: "weekly", priority: 0.8 },
    ...courses.flatMap((c) => [
      { url: `${base}/courses/${c.slug}`, lastModified: date, changeFrequency: "monthly", priority: 0.7 },
      ...c.chapters.map((x) => ({ url: `${base}/courses/${c.slug}/${x.slug}`, lastModified: date, changeFrequency: "monthly", priority: 0.6 })),
    ]),
  ];
}
