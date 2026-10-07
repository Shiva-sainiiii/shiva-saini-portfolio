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

type Side = "l" | "r";

// wide = title upar, content full-bleed (skills marquee ke liye)
// B3: har section pe glow + dots + gradient divider. Ye sab sirf decoration hai (aria-hidden, pointer-events-none).
// Stacking context jaan-boojh ke nahi banaya (isolate / z-index nahi): certificate lightbox (fixed z-50) navbar ke upar hi rehna chahiye.
// Decoration pehle DOM me hai, content `relative` hai aur baad me, isliye content upar paint hota hai.
const Section = ({ id, title, wide, side = "r", children }: { id: string; title: string; wide?: boolean; side?: Side; children: React.ReactNode }) => (
  <section id={id} className={`relative ${side === "l" ? "side-l" : "side-r"}`}>
    <div aria-hidden className="section-glow pointer-events-none absolute inset-0" />
    <div aria-hidden className="section-dots pointer-events-none absolute inset-0" />
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 px-6">
      <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-cyan-400/50 via-accent2/40 to-transparent" />
    </div>
    {wide ? (
      <div className="relative py-28 md:py-40">
        <h2 className="mx-auto mb-12 max-w-6xl px-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent2">{title}</h2>
        {children}
      </div>
    ) : (
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-28 md:grid-cols-[1fr_2fr] md:py-40">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent2">{title}</h2>
        <div>{children}</div>
      </div>
    )}
  </section>
);

const Row = ({ title, note }: { title: string; note: string }) => (
  <li className="group flex flex-col gap-2 border-b border-line py-8 first:pt-0 md:flex-row md:items-baseline md:justify-between">
    <h3 className="text-3xl font-semibold text-white/90 transition-colors group-hover:text-accent2 md:text-5xl">{title}</h3>
    <p className="max-w-xs text-mute transition-colors group-hover:text-ink">{note}</p>
  </li>
);

export default function Sections({ initial }: { initial: Content }) {
  // Ek hi fetch, saare sections ko data milta hai
  const { projects, skills, certificates, links } = useContent(initial);
  return (
    <div className="page-ground relative text-ink">
      <Section id="about" title="About me" side="r">
        <p className="text-3xl font-light leading-snug text-white md:text-5xl">{SITE.bio}</p>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink">{SITE.about}</p>
        <p className="mt-6 text-mute">{SITE.stats.join("  ·  ")}</p>
      </Section>

      <Section id="services" title="Services" side="l">
        <p className="text-3xl font-light leading-snug text-white md:text-5xl">
          Ideas <span className="text-accent2">→</span> Websites <span className="text-accent2">→</span> Growth
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s, n) => (
            <li key={s.title} className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent2/50 hover:bg-surface2">
              <span className="text-xs font-semibold tracking-widest text-accent2">0{n + 1}</span>
              <h3 className="mt-3 text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-mute">{s.note}</p>
            </li>
          ))}
        </ul>
        <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="glow-box group inline-flex items-center rounded-full border-2 border-cyan-400 px-7 py-3 text-xs font-bold tracking-widest text-white transition-colors hover:bg-cyan-400 hover:text-black md:text-sm mt-10">
          FREE&nbsp;<span className="text-cyan-300 transition-colors group-hover:text-black">DEMO WEBSITE</span>
        </a>
        <h3 className="mt-16 text-xs font-semibold uppercase tracking-[0.2em] text-accent2">Our team</h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {TEAM.map((t) => (
            <li key={t.name}>
              <p className="text-xl font-semibold text-white">{t.name}</p>
              <p className="text-mute">{t.role} · {t.city}</p>
              {t.phone && <a href={`tel:${t.phone.replace(/\s/g, "")}`} className="mt-1 inline-block text-cyan-300 hover:underline">{t.phone}</a>}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="projects" title="Projects" side="r"><Projects items={projects} /></Section>
      <Section id="skills" title="Skills" wide side="l"><Skills items={skills} /></Section>
      {certificates.length > 0 && <Section id="certificates" title="Certificates" side="r"><Certificates items={certificates} /></Section>}

      <Section id="experience" title="Experience" side="l">
        <ul>{EXPERIENCE.map((e) => <Row key={e.company} title={e.company} note={`${e.role} · ${e.period}`} />)}</ul>
      </Section>

      <Section id="ask-ai" title="Ask my AI" side="r"><AskAI /></Section>

      {db && <Section id="feedback" title="Feedback" side="l"><Feedback /></Section>}
      <Section id="contact" title="Contact" side="r">
        <Contact links={[...links, { id: "resume", label: "Resume", url: SITE.resume }]} />
      </Section>

      <footer className="relative border-t border-line px-6 py-10 text-center text-sm text-mute/80">© {new Date().getFullYear()} {SITE.name}</footer>

      {/* B3: film grain, sabse upar lekin lightbox (z-50) aur navbar (z-40) ke neeche */}
      <div aria-hidden className="grain pointer-events-none absolute inset-0 z-20" />
    </div>
  );
}
