"use client";
import { db } from "@/lib/firebase";
import type { Content } from "@/lib/content";
import { useContent } from "@/lib/useContent";
import { EXPERIENCE, SERVICES, SITE, TEAM } from "@/lib/data";
import AskAI from "./AskAI";
import Certificates from "./Certificates";
import Contact from "./Contact";
import Feedback from "./Feedback";
import Projects from "./Projects";
import Skills from "./Skills";

// wide = title upar, content full-bleed (skills marquee ke liye)
const Section = ({ id, title, wide, children }: { id: string; title: string; wide?: boolean; children: React.ReactNode }) =>
  wide ? (
    <section id={id} className="border-t border-white/10 py-28 md:py-40">
      <h2 className="mx-auto mb-12 max-w-6xl px-6 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">{title}</h2>
      {children}
    </section>
  ) : (
    <section id={id} className="mx-auto grid max-w-6xl gap-10 border-t border-white/10 px-6 py-28 md:grid-cols-[1fr_2fr] md:py-40">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">{title}</h2>
      <div>{children}</div>
    </section>
  );

const Row = ({ title, note }: { title: string; note: string }) => (
  <li className="group flex flex-col gap-2 border-b border-white/10 py-8 first:pt-0 md:flex-row md:items-baseline md:justify-between">
    <h3 className="text-3xl font-semibold text-white/90 transition-colors group-hover:text-cyan-300 md:text-5xl">{title}</h3>
    <p className="max-w-xs text-white/50 transition-colors group-hover:text-white/80">{note}</p>
  </li>
);

export default function Sections({ initial }: { initial: Content }) {
  // Ek hi fetch, saare sections ko data milta hai
  const { projects, skills, certificates, links } = useContent(initial);
  return (
    <div className="bg-black text-white">
      <Section id="about" title="About me">
        <p className="text-3xl font-light leading-snug md:text-5xl">{SITE.bio}</p>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">{SITE.about}</p>
        <p className="mt-6 text-white/40">{SITE.stats.join("  ·  ")}</p>
      </Section>

      <Section id="services" title="Services">
        <p className="text-3xl font-light leading-snug md:text-5xl">
          Ideas <span className="text-cyan-400">→</span> Websites <span className="text-cyan-400">→</span> Growth
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s, n) => (
            <li key={s.title} className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.03] p-6 transition-colors hover:border-accent2/60 hover:bg-accent2/[0.07]">
              <span className="text-xs font-semibold tracking-widest text-accent2">0{n + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/50">{s.note}</p>
            </li>
          ))}
        </ul>
        <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="glow-box group inline-flex items-center rounded-full border-2 border-cyan-400 px-7 py-3 text-xs font-bold tracking-widest transition-colors hover:bg-cyan-400 hover:text-black md:text-sm mt-10">
          FREE&nbsp;<span className="text-cyan-300 transition-colors group-hover:text-black">DEMO WEBSITE</span>
        </a>
        <h3 className="mt-16 text-xs font-semibold uppercase tracking-[0.2em] text-accent2">Our team</h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {TEAM.map((t) => (
            <li key={t.name}>
              <p className="text-xl font-semibold">{t.name}</p>
              <p className="text-white/50">{t.role} · {t.city}</p>
              {t.phone && <a href={`tel:${t.phone.replace(/\s/g, "")}`} className="mt-1 inline-block text-cyan-300 hover:underline">{t.phone}</a>}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="projects" title="Projects"><Projects items={projects} /></Section>
      <Section id="skills" title="Skills" wide><Skills items={skills} /></Section>
      {certificates.length > 0 && <Section id="certificates" title="Certificates"><Certificates items={certificates} /></Section>}

      <Section id="experience" title="Experience">
        <ul>{EXPERIENCE.map((e) => <Row key={e.company} title={e.company} note={`${e.role} · ${e.period}`} />)}</ul>
      </Section>

      <Section id="ask-ai" title="Ask my AI"><AskAI /></Section>

      {db && <Section id="feedback" title="Feedback"><Feedback /></Section>}
      <Section id="contact" title="Contact">
        <Contact links={[...links, { id: "resume", label: "Resume", url: SITE.resume }]} />
      </Section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/30">© {new Date().getFullYear()} {SITE.name}</footer>
    </div>
  );
}
