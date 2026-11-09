const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";
export default function sitemap() { return [{ url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }]; }
