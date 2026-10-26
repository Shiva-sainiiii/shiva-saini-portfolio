import AsciiHero from "@/components/AsciiHero";
import AsciiLoader from "@/components/AsciiLoader";
import Navbar from "@/components/Navbar";
import ScrollStory from "@/components/ScrollStory";
import Sections from "@/components/Sections";
import { defaults, fetchContent } from "@/lib/content";
import { SERVICES, SITE } from "@/lib/data";

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
    image: `${SITE.url}/assets/profile-full.jpg`,
    email: SITE.email,
    description: SITE.bio,
    knowsAbout: content.skills.map((s) => s.name),
    address: { "@type": "PostalAddress", addressRegion: "Haryana", addressCountry: "IN" },
    sameAs: SITE.links.map((l) => l.href),
  };

  // Local business clients ke liye: Google ko batata hai ki ye ek service provider hai (Haryana / India)
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Shiva Saini — Web Development",
    url: SITE.url,
    image: `${SITE.url}/assets/profile-full.jpg`,
    email: SITE.email,
    areaServed: [{ "@type": "State", name: "Haryana" }, { "@type": "Country", name: "India" }],
    provider: { "@type": "Person", name: "Shiva Saini", url: SITE.url },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.note } })),
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <AsciiLoader />
      <Navbar />
      <ScrollStory />
      <AsciiHero />
      <Sections initial={content} />
    </main>
  );
}
