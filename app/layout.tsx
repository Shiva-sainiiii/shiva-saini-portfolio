import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SITE } from "@/lib/data";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

// Purani site jaisa hi title/description — Google snippet aur ranking continuity ke liye
const title = "Shiva Saini — Full Stack Web Developer | Portfolio & AI Chat";
const description =
  "Shiva Saini — freelance Full Stack Website Developer from Haryana, India. React, Next.js and AI-powered websites, Google Business setup. Free demo website.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  keywords: ["Shiva Saini", "Full Stack Developer", "Web Developer", "React Developer", "Next.js Developer", "AI Integration", "Portfolio", "Haryana", "India", "Freelance Developer"],
  authors: [{ name: "Shiva Saini", url: SITE.url }],
  creator: "Shiva Saini",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Shiva Saini Portfolio", title, description, locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  // Search Console "HTML tag" verification ka content yahan env se aata hai
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION },
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={manrope.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
