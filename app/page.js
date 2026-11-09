import ScrollFX from "@/components/ScrollFX";
import Nav from "@/components/Nav";
import AskAI from "@/components/AskAI";
import Feedback from "@/components/Feedback";
import { Hero, Sapna, Templates, Services, Process, Projects, EasyDevOps, About, Certificates, Contact } from "@/components/Sections";

// Section order badalna ho to bas yahan lines upar-neeche karo.
export default function Home() {
  return (
    <>
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
        <Contact />
      </main>
    </>
  );
}
