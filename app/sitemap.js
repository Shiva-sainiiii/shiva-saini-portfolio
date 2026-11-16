const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";
// Single page site hai, isliye ek hi URL. lastModified ko tab badlo jab content badle.
export default function sitemap() {
  return [{ url: base, lastModified: "2026-11-16", changeFrequency: "monthly", priority: 1 }];
}
