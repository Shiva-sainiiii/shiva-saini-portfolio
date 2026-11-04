"use client";
import { db } from "@/lib/firebase";
import type { Content } from "@/lib/content";
import { useContent } from "@/lib/useContent";
import { EXPERIENCE, SERVICES, SITE, TEAM, TESTIMONIALS } from "@/lib/data";
import AskAI from "./AskAI";
import Link from "next/link";
import Certificates from "./Certificates";
import Contact from "./Contact";
import Feedback from "./Feedback";
import Fx from "./Fx";
import Projects from "./Projects";
import Showcase from "./Showcase";
import Skills from "./Skills";
import Testimonials from "./Testimonials";

// Section = hairline rule + bada serif heading (italic lime word). Koi glow / grain / dots nahi, koi chhota uppercase label nahi.
// split = heading left (desktop pe sticky), content right. Warna heading upar, content neeche (full width).
// Stacking context jaan-boojh ke nahi banaya (isolate / z-index nahi): certificate lightbox (fixed z-50) navbar ke upar hi rehna chahiye.
const Section = ({ id, title, em, split, children }: { id: string; title?: string; em: string; split?: boolean; children: React.ReactNode }) => {
  const heading = (
    <h2 className="font-display text-5xl leading-[0.95] tracking-tight text-white md:text-7xl">
      {title && <>{title} </>}<em className="text-accent2">{em}</em>
    </h2>
  );
  return (
    <section id={id} className="border-t border-line">
      {split ? (
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1fr_2fr] md:py-36">
          <div><div className="md:sticky md:top-28">{heading}</div></div>
          <div>{children}</div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          {heading}
          <div className="mt-12 md:mt-16">{children}</div>
        </div>
      )}
    </section>
  );
};

const Row = ({ title, note }: { title: string; note: string }) => (
  <li className="flex flex-col gap-1 border-b border-line py-6 first:pt-0 md:flex-row md:items-baseline md:justify-between">
    <h3 className="font-display text-3xl text-white md:text-4xl">{title}</h3>
    <p className="text-mute">{note}</p>
  </li>
);

export default function Sections({ initial }: { initial: Content }) {
  // Ek hi fetch, saare sections ko data milta hai
  const { projects, skills, certificates, links } = useContent(initial);
  return (
    <div className="relative text-ink">
      {/* Background: sirf flat colour (page-ground, -z-[3]). Is div ko z-index/isolate mat dena. */}
      <div aria-hidden className="page-ground pointer-events-none absolute inset-0 -z-[3]" />

      <Section id="about" title="Hi, I'm" em="Shiva.">
        <div className="grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:items-start md:gap-16">
          {/* Asli photo + flat lime block (demo sites jaisa). isolate: sirf is wrapper ke andar, lime block photo ke peeche rahe */}
          <div className="relative isolate mr-3 mb-3 md:mr-4 md:mb-4">
            <span aria-hidden className="absolute left-3 top-3 -z-10 h-full w-full bg-accent2 md:left-4 md:top-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/profile-full.jpg" alt={`${SITE.name}, full stack web developer`} width={800} height={800} className="aspect-square w-full object-cover" />
          </div>
          <div>
            <p className="font-display text-3xl leading-snug text-white md:text-5xl">{SITE.bio}</p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink">{SITE.about}</p>
            <dl className="mt-10 grid max-w-xl gap-x-10 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
              <div><dt className="text-mute">Based in</dt><dd className="text-white">{SITE.location}</dd></div>
              <div><dt className="text-mute">Experience</dt><dd className="text-white">{SITE.stats[2]}</dd></div>
              <div><dt className="text-mute">Work</dt><dd className="text-white">{SITE.stats[0]}, {SITE.stats[1]}</dd></div>
              <div><dt className="text-mute">Open to</dt><dd className="text-white">Freelance projects and internships</dd></div>
            </dl>
          </div>
        </div>
      </Section>

      <Section id="services" title="What I" em="build" split>
        <ul className="border-t border-line">
          {SERVICES.map((s) => (
            <li key={s.title} className="grid gap-2 border-b border-line py-7 md:grid-cols-[1fr_1.1fr] md:items-baseline md:gap-8">
              <h3 className="font-display text-3xl text-white md:text-4xl">{s.title}</h3>
              <p className="text-mute">{s.note}</p>
            </li>
          ))}
        </ul>
        <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center rounded-full bg-accent2 px-7 py-3 text-sm font-semibold text-black transition hover:brightness-110">
          <Fx tone="text-black">Get a free demo website →</Fx>
        </a>
        <p className="mt-16 font-display text-2xl text-white">Working with</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {TEAM.map((t) => (
            <li key={t.name}>
              <p className="text-lg text-white">{t.name}</p>
              <p className="text-mute">{t.role} · {t.city}</p>
              {t.phone && <a href={`tel:${t.phone.replace(/\s/g, "")}`} className="text-accent2 underline-offset-4 hover:underline">{t.phone}</a>}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="demos" title="Demo" em="sites"><Showcase /></Section>

      <Section id="projects" title="Selected" em="work"><Projects items={projects} /></Section>
      <Section id="skills" title="Tools I" em="use"><Skills items={skills} /></Section>
      {certificates.length > 0 && <Section id="certificates" em="Certificates" split><Certificates items={certificates} /></Section>}

      <Section id="experience" em="Experience" split>
        <ul className="border-t border-line pt-6">{EXPERIENCE.map((e) => <Row key={e.company} title={e.company} note={`${e.role} · ${e.period}`} />)}</ul>
      </Section>

      {TESTIMONIALS.length > 0 && <Section id="testimonials" title="Client" em="words"><Testimonials /></Section>}

      <Section id="ask-ai" title="Ask my" em="AI" split><AskAI /></Section>

      {db && <Section id="feedback" title="Leave" em="feedback" split><Feedback /></Section>}
      <Section id="contact" title="Let's" em="talk" split>
        <Contact links={[...links, { id: "resume", label: "Resume", url: SITE.resume }]} />
      </Section>

      <footer className="relative border-t border-line px-6 py-10 text-center text-sm text-mute">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <p className="mt-4 text-xs text-faint">
          Laptop 3D model &ldquo;Laptop (FREE)&rdquo; by <a href="https://sketchfab.com/3d-models/laptop-free-a651092825974fc5a405129d4f50a7d2" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-accent2">Brandon Westlake</a> · Sketchfab
        </p>
        {/* Admin panel ka login: /admin (Supabase auth). Google ko disallow + noindex already hai */}
        <Link href="/admin" className="mt-2 inline-flex items-center gap-1 text-mute underline-offset-4 transition-colors hover:text-accent2 hover:underline focus-visible:text-accent2">
          Admin login
        </Link>
      </footer>
    </div>
  );
}
