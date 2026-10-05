import Navbar from "@/components/Navbar";
import ScrollStory from "@/components/ScrollStory";
import Sections from "@/components/Sections";
import { defaults, fetchContent } from "@/lib/content";
import { SITE } from "@/lib/data";

// ISR: page HTML har ~60s me Supabase ke real data se bante hai, taaki Google ko placeholder nahi, asli content dikhe
export const revalidate = 60;

export default async function Home() {
  const content = await fetchContent().catch(() => defaults);

  // Structured data (Google knowledge/rich results ke liye)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shiva Saini",
    url: SITE.url,
    jobTitle: "Full Stack Web Developer",
    description: SITE.bio,
    knowsAbout: content.skills.map((s) => s.name),
    address: { "@type": "PostalAddress", addressRegion: "Haryana", addressCountry: "IN" },
    sameAs: SITE.links.map((l) => l.href),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <ScrollStory />
      <Sections initial={content} />
    </main>
  );
}
