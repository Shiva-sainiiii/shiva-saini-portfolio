"use client";
import { useEffect, useState } from "react";
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
import Marquee from "./Marquee";
import Projects from "./Projects";
import Showcase from "./Showcase";
import Testimonials from "./Testimonials";

// Section = bada uppercase heading (Bricolage 800). `split` = heading left (desktop pe sticky), content right.
// `bone` = light section (globals.css .on-bone: tokens ulte ho jaate hain). `huge` = viewport-size heading (Contact).
// Stacking context jaan-boojh ke nahi banaya (isolate / z-index nahi): certificate lightbox (fixed z-50) navbar ke upar hi rehna chahiye.
const Section = ({ id, title, split, bone, huge, children }: { id: string; title: string; split?: boolean; bone?: boolean; huge?: boolean; children: React.ReactNode }) => {
  const heading = (
    <h2 className={`font-display font-extrabold uppercase leading-[0.85] tracking-[-0.05em] ${huge ? "text-[17vw] md:text-[14vw]" : "text-6xl md:text-8xl"}`}>{title}</h2>
  );
  return (
    <section id={id} className={bone ? "on-bone" : "border-t border-line"}>
      {split ? (
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.6fr] md:px-8 md:py-32">
          <div><div className="md:sticky md:top-28">{heading}</div></div>
          <div>{children}</div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
          {heading}
          <div className="mt-12 md:mt-16">{children}</div>
        </div>
      )}
    </section>
  );
};

const Row = ({ title, note }: { title: string; note: string }) => (
  <li className="flex flex-col gap-1 border-b border-line py-6 md:flex-row md:items-baseline md:justify-between">
    <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h3>
    <p className="text-mute">{note}</p>
  </li>
);

// Footer me IST time (Kharkhoda ka). Hydration mismatch se bachne ke liye mount ke baad hi dikhta hai.
function LocalTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true }));
    f(); const id = setInterval(f, 30_000); return () => clearInterval(id);
  }, []);
  return <span>{t ? `${t} IST, Haryana` : "Haryana, India"}</span>;
}

export default function Sections({ initial }: { initial: Content }) {
  // Ek hi fetch, saare sections ko data milta hai
  const { projects, skills, certificates, links } = useContent(initial);
  return (
    <div className="relative">
      <Marquee items={skills.map((s) => s.name)} />

      <Section id="work" title="Work">
        <Showcase />
      </Section>

      <Section id="services" title="What I do" split bone>
        <ul className="border-t border-line">
          {SERVICES.map((s) => (
            <li key={s.title} className="grid gap-2 border-b border-line py-7 md:grid-cols-[1fr_1.1fr] md:items-baseline md:gap-8">
              <h3 className="font-display text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">{s.title}</h3>
              <p className="text-mute">{s.note}</p>
            </li>
          ))}
        </ul>
        <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center rounded-full bg-ground px-7 py-3.5 text-sm font-bold text-accent2 transition hover:brightness-125">
          <Fx tone="text-white">Get a free demo website</Fx>
        </a>
        <p className="mt-16 font-display text-2xl font-extrabold tracking-tight">Working with</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {TEAM.map((t) => (
            <li key={t.name}>
              <p className="text-lg font-semibold">{t.name}</p>
              <p className="text-mute">{t.role} · {t.city}</p>
              {t.phone && <a href={`tel:${t.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">{t.phone}</a>}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="projects" title="Projects"><Projects items={projects} /></Section>

      <Section id="about" title="About">
        <div className="grid gap-12 md:grid-cols-[minmax(0,340px)_1fr] md:items-start md:gap-16">
          {/* Asli photo + flat gold block. isolate: sirf is wrapper ke andar, block photo ke peeche rahe */}
          <div className="relative isolate mr-3 mb-3 md:mr-4 md:mb-4">
            <span aria-hidden className="absolute left-3 top-3 -z-10 h-full w-full bg-accent2 md:left-4 md:top-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/profile-full.jpg" alt={`${SITE.name}, full stack web developer`} width={800} height={800} className="aspect-square w-full object-cover" />
          </div>
          <div>
            <p className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] md:text-5xl">{SITE.bio}</p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/85">{SITE.about}</p>
            <dl className="mt-10 grid max-w-xl gap-x-10 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
              <div><dt className="text-mute">Based in</dt><dd>{SITE.location}</dd></div>
              <div><dt className="text-mute">Experience</dt><dd>{SITE.stats[2]}</dd></div>
              <div><dt className="text-mute">Work</dt><dd>{SITE.stats[0]}, {SITE.stats[1]}</dd></div>
              <div><dt className="text-mute">Open to</dt><dd>Freelance projects and internships</dd></div>
            </dl>
          </div>
        </div>
      </Section>

      {certificates.length > 0 && <Section id="certificates" title="Certificates" split><Certificates items={certificates} /></Section>}

      <Section id="experience" title="Experience" split>
        <ul className="border-t border-line">{EXPERIENCE.map((e) => <Row key={e.company} title={e.company} note={`${e.role} · ${e.period}`} />)}</ul>
      </Section>

      {TESTIMONIALS.length > 0 && <Section id="testimonials" title="Client words"><Testimonials /></Section>}

      <Section id="ask-ai" title="Ask my AI" split><AskAI /></Section>

      {db && <Section id="feedback" title="Feedback" split><Feedback /></Section>}

      <Section id="contact" title="Let's talk" huge>
        <Contact links={[...links, { id: "resume", label: "Resume", url: SITE.resume }]} />
      </Section>

      <footer className="relative flex flex-col items-center justify-between gap-3 border-t border-line px-6 py-8 text-sm text-mute md:flex-row">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <LocalTime />
        {/* Admin panel ka login: /admin (Supabase auth). Google ko disallow + noindex already hai */}
        <Link href="/admin" className="underline-offset-4 transition-colors hover:text-accent2 hover:underline focus-visible:text-accent2">Admin login</Link>
      </footer>
    </div>
  );
}
