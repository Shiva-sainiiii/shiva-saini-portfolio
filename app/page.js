import ScrollFX from "@/components/ScrollFX";
import Nav from "@/components/Nav";
import AskAI from "@/components/AskAI";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Hero, Sapna, Templates, Services, Process, Projects, EasyDevOps, About, Certificates, CoursesTeaser, FaqSection, Contact } from "@/components/Sections";
import { homeFaq, site } from "@/data/content";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";
const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Easy DevOps",
  url: site.easyUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description: "Create GitHub repos, deploy to Vercel, Netlify and Render, and manage env vars and pull requests from a simple chat. English and Hinglish, on phone and laptop.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Person", "@id": `${base}/#person`, name: site.name },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

// Section order badalna ho to bas yahan lines upar-neeche karo.
export default function Home() {
  return (
    <>
      <JsonLd data={faqLd} />
      <JsonLd data={appLd} />
      <ScrollFX />
      <Nav />
      <main>
        <Hero />
        <Sapna />
        <Templates />
        <Services />
        <Process />
        <Projects />
        <EasyDevOps />
        <About />
        <Certificates />
        <CoursesTeaser />
        <AskAI />
        <Feedback />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
