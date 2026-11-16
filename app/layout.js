import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { site, services } from "@/data/content";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "500", "600", "700", "800"], variable: "--f-d", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--f-body", display: "swap" });

// Site ka asli domain. Custom domain lagao to Vercel env me NEXT_PUBLIC_SITE_URL badal dena.
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";
const title = "Shiva Saini | Website Developer for Local Businesses, Haryana";
const desc = "Full-stack web developer in Kharkhoda, Sonipat. Fast websites for clinics, gyms, cafes and shops in Haryana. Free demo first, then build and launch.";

export const metadata = {
  metadataBase: new URL(base),
  title: { default: title, template: "%s | Shiva Saini" },
  description: desc,
  applicationName: "Shiva Saini Portfolio",
  authors: [{ name: "Shiva Saini", url: base }],
  creator: "Shiva Saini",
  keywords: ["Shiva Saini", "website developer Sonipat", "web developer Haryana", "website for clinic", "website for gym", "Next.js developer", "full-stack developer", "Google Business setup", "free demo website"],
  alternates: { canonical: "/" },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } : undefined,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", url: "/", siteName: "Shiva Saini", locale: "en_IN", title, description: desc,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Shiva Saini, full-stack web developer for local businesses in Haryana" }],
  },
  twitter: { card: "summary_large_image", title, description: desc, images: ["/og.jpg"] },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#121316" };

// Google ke liye structured data (sab kuch data/content.js se aata hai, wahan badlo to yahan apne aap badal jaata hai)
const sameAs = [site.github, site.linkedin].filter((u) => u && u !== "#");
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${base}/#website`, url: base, name: "Shiva Saini", description: desc, inLanguage: "en-IN", publisher: { "@id": `${base}/#person` } },
    {
      "@type": "Person", "@id": `${base}/#person`, name: site.name, url: base, image: `${base}${site.photo || "/shiva-logo.png"}`,
      jobTitle: "Full-stack web developer", email: site.email, telephone: site.phone, sameAs,
      address: { "@type": "PostalAddress", addressLocality: "Kharkhoda", addressRegion: "Haryana", postalCode: "131402", addressCountry: "IN" },
      knowsAbout: ["Web development", "Next.js", "React", "Supabase", "AI chatbots", "Local business websites"],
    },
    {
      "@type": "ProfessionalService", "@id": `${base}/#service`, name: "Shiva Saini, Web Development", url: base, image: `${base}/og.jpg`,
      telephone: site.phone, email: site.email, founder: { "@id": `${base}/#person` },
      address: { "@type": "PostalAddress", addressLocality: "Kharkhoda", addressRegion: "Haryana", postalCode: "131402", addressCountry: "IN" },
      areaServed: [{ "@type": "AdministrativeArea", name: "Haryana" }, { "@type": "City", name: "Sonipat" }, { "@type": "City", name: "Rohtak" }],
      hasOfferCatalog: { "@type": "OfferCatalog", name: "Services", itemListElement: services.map(([name, d]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, description: d } })) },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{var a=localStorage.getItem('accent');if(a)document.documentElement.dataset.accent=a}catch(e){}" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body className={`${outfit.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
