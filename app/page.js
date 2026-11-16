import ScrollFX from "@/components/ScrollFX";
import Nav from "@/components/Nav";
import AskAI from "@/components/AskAI";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Hero, Sapna, Templates, Services, Process, Projects, EasyDevOps, About, Certificates, FaqSection, Contact } from "@/components/Sections";
import { homeFaq } from "@/data/content";

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
        <AskAI />
        <Feedback />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
