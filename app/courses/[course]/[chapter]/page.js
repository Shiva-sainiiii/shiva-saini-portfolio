import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollFX from "@/components/ScrollFX";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Lesson, { headingsOf } from "@/components/Lesson";
import LessonNav from "@/components/LessonNav";
import Quiz from "@/components/Quiz";
import { MarkDone, Scorecard } from "@/components/Progress";
import { site, wa } from "@/data/content";
import { courses, courseBySlug } from "@/data/courses";
import outputs from "@/data/outputs.json";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";
export const dynamicParams = false;
export function generateStaticParams() { return courses.flatMap((c) => c.chapters.map((x) => ({ course: c.slug, chapter: x.slug }))); }

const find = (p) => {
  const c = courseBySlug(p.course);
  const i = c ? c.chapters.findIndex((x) => x.slug === p.chapter) : -1;
  return { c, i, ch: i >= 0 ? c.chapters[i] : null };
};

export function generateMetadata({ params }) {
  const { c, i, ch } = find(params);
  if (!ch) return {};
  // Google ~60 character ke baad title kaat deta hai, isliye sabse lamba jo 68 me fit ho wahi lo
  const title = [`${ch.title} (${c.short} Ch. ${i + 1}) | Shiva Saini`, `${ch.title} | ${c.short}`, ch.title].find((t) => t.length <= 68) || ch.title;
  const desc = [`${ch.summary} Free lesson with code examples, a task and a quiz.`, `${ch.summary} Free lesson with a task and quiz.`, ch.summary].find((t) => t.length <= 160) || ch.summary;
  const path = `/courses/${c.slug}/${ch.slug}`;
  return {
    title: { absolute: title }, description: desc, alternates: { canonical: path },
    openGraph: { type: "article", url: path, siteName: "Shiva Saini", locale: "en_IN", title, description: desc, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: ch.title }] },
    twitter: { card: "summary_large_image", title, description: desc, images: ["/og.jpg"] },
  };
}

export default function ChapterPage({ params }) {
  const { c, i, ch } = find(params);
  if (!ch) notFound();
  const prev = c.chapters[i - 1], next = c.chapters[i + 1];
  const last = !next;
  const courseUrl = `${base}/courses/${c.slug}`;
  const url = `${courseUrl}/${ch.slug}`;
  const headings = headingsOf(ch.body);
  const outs = outputs[`${c.slug}/${ch.slug}`] || {};
  const items = c.chapters.map((x) => ({ slug: x.slug, title: x.title, href: `/courses/${c.slug}/${x.slug}` }));
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource", "@id": `${url}#lesson`, name: ch.title, description: ch.summary, url, learningResourceType: "lesson", inLanguage: "en", educationalLevel: c.level, isAccessibleForFree: true,
        timeRequired: `PT${ch.mins}M`, position: i + 1, dateModified: c.updated, teaches: ch.summary,
        isPartOf: { "@type": "Course", name: c.title, url: courseUrl },
        author: { "@type": "Person", "@id": `${base}/#person`, name: site.name, url: base },
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: "Free courses", item: `${base}/courses` },
        { "@type": "ListItem", position: 3, name: c.title, item: courseUrl },
        { "@type": "ListItem", position: 4, name: ch.title, item: url },
      ] },
    ],
  };
  return (
    <>
      <JsonLd data={ld} />
      <ScrollFX />
      <Nav home="/" />
      <main>
        <section className="sec page-hero">
          <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/courses">Free courses</Link><span>/</span><Link href={`/courses/${c.slug}`}>{c.short}</Link><span>/</span><span>Chapter {i + 1}</span></nav>
          <h1 className="d">{ch.title}</h1>
          <p className="lead">{ch.summary}</p>
          <p className="cmeta">Chapter {i + 1} of {c.chapters.length} · {ch.mins} min read · Free · Updated {c.updated}</p>
        </section>
        <section className="sec wall chalk lessonwrap">
          <div className="lessongrid">
            <LessonNav course={c.slug} chapters={items} current={ch.slug} headings={headings} />
            <article className="lesson-col">
              <Lesson blocks={ch.body} outs={outs} />
              <h2 className="qh" id="quiz-heading">Check yourself</h2>
              <Quiz items={ch.quiz} course={c.slug} chapter={ch.slug} />
              <div className="done-row"><MarkDone course={c.slug} chapter={ch.slug} /></div>
              <div id="scorecard-area" className="score-area">
                <Scorecard course={c.slug} items={items} title={last ? "Your final scorecard" : "Your progress so far"} />
              </div>
              <div className="pn">
                {prev ? <Link className="btn alt" href={`/courses/${c.slug}/${prev.slug}`}>← {prev.title}</Link> : <span />}
                {next ? <Link className="btn" href={`/courses/${c.slug}/${next.slug}`}>Next: {next.title} →</Link> : <Link className="btn" href="/courses">Pick your next course →</Link>}
              </div>
              <p className="small more">Stuck on something? <a className="ul2" href={wa(`Hi Shiva, I have a question about "${ch.title}" in the ${c.short} course.`)} target="_blank" rel="noreferrer">Ask me on WhatsApp</a>.</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
