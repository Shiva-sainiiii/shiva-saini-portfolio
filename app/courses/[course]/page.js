import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollFX from "@/components/ScrollFX";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { ChapterList } from "@/components/Progress";
import { site, wa } from "@/data/content";
import { courses, courseBySlug, totalMins } from "@/data/courses";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";
export const dynamicParams = false;
export function generateStaticParams() { return courses.map((c) => ({ course: c.slug })); }

export function generateMetadata({ params }) {
  const c = courseBySlug(params.course);
  if (!c) return {};
  const title = `Free ${c.short} Course for Beginners | Shiva Saini`;
  return {
    title: { absolute: title }, description: c.desc, alternates: { canonical: `/courses/${c.slug}` },
    openGraph: { type: "website", url: `/courses/${c.slug}`, siteName: "Shiva Saini", locale: "en_IN", title, description: c.desc, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${c.title}, free course` }] },
    twitter: { card: "summary_large_image", title, description: c.desc, images: ["/og.jpg"] },
  };
}

export default function CoursePage({ params }) {
  const c = courseBySlug(params.course);
  if (!c) notFound();
  const url = `${base}/courses/${c.slug}`;
  const mins = totalMins(c);
  const items = c.chapters.map((x) => ({ slug: x.slug, title: x.title, summary: x.summary, mins: x.mins, href: `/courses/${c.slug}/${x.slug}` }));
  const other = courses.filter((x) => x.slug !== c.slug);
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course", "@id": `${url}#course`, name: c.title, description: c.desc, url, inLanguage: "en", educationalLevel: c.level, isAccessibleForFree: true,
        provider: { "@type": "Person", "@id": `${base}/#person`, name: site.name, url: base },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${mins}M` },
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR", category: "Free" },
        teaches: c.outcomes,
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: "Free courses", item: `${base}/courses` },
        { "@type": "ListItem", position: 3, name: c.title, item: url },
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
          <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/courses">Free courses</Link><span>/</span><span>{c.short}</span></nav>
          <h1 className="d">{c.title}: free course</h1>
          <p className="lead">{c.intro}</p>
          <p className="cmeta">{c.level} · {c.chapters.length} chapters · about {Math.round(mins / 60 * 10) / 10} hours · Free</p>
          <div className="row-btns"><Link className="btn" href={items[0].href}>Start chapter 1 →</Link></div>
        </section>
        <section className="sec wall chalk">
          <h2 className="d">What you will learn</h2>
          <ul className="outs">{c.outcomes.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>
        <section className="sec wall ink">
          <h2 className="d">Chapters</h2>
          <ChapterList course={c.slug} items={items} />
        </section>
        <section className="sec wall chalk">
          <h2 className="d">Keep learning</h2>
          <div className="stickers">
            {other.map((x) => <Link key={x.slug} className="sticker" href={`/courses/${x.slug}`}>{x.title}</Link>)}
            <a className="btn" href={wa(`Hi Shiva, I finished some of the ${c.short} course. `)} target="_blank" rel="noreferrer">Ask me a question</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
