import Link from "next/link";
import ScrollFX from "@/components/ScrollFX";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { wa } from "@/data/content";
import { courses, totalMins } from "@/data/courses";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";
const title = "Free Courses: Python and Cloud Computing, Chapter by Chapter | Shiva Saini";
const desc = "Free chapter-wise courses in simple English: Python for beginners and Cloud Computing basics, with code examples, tasks and quizzes. No sign-up needed.";

export const metadata = {
  title: { absolute: title }, description: desc, alternates: { canonical: "/courses" },
  openGraph: { type: "website", url: "/courses", siteName: "Shiva Saini", locale: "en_IN", title, description: desc, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Free courses by Shiva Saini" }] },
  twitter: { card: "summary_large_image", title, description: desc, images: ["/og.jpg"] },
};

export default function CoursesPage() {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: "Free courses", url: `${base}/courses`, description: desc },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: base }, { "@type": "ListItem", position: 2, name: "Free courses", item: `${base}/courses` }] },
      { "@type": "ItemList", itemListElement: courses.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${base}/courses/${c.slug}`, name: c.title })) },
    ],
  };
  return (
    <>
      <JsonLd data={ld} />
      <ScrollFX />
      <Nav home="/" />
      <main>
        <section className="sec page-hero">
          <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Free courses</span></nav>
          <h1 className="d">Free courses, chapter by chapter</h1>
          <p className="lead">Short lessons in simple English. Read, copy the code, try the task and check yourself with a quiz. No sign-up, no fees.</p>
        </section>
        <section className="sec wall chalk">
          <div className="cgrid">
            {courses.map((c) => (
              <Link key={c.slug} href={`/courses/${c.slug}`} className="ccard">
                <span className="mk">{c.level}</span>
                <h2>{c.title}</h2>
                <p>{c.desc}</p>
                <span className="cmeta">{c.chapters.length} chapters · about {Math.round(totalMins(c) / 60 * 10) / 10} hours · Free</span>
                <span className="btn">Start learning →</span>
              </Link>
            ))}
          </div>
          <p className="small more">More courses will be added over time. Want a topic covered? <a className="ul2" href={wa("Hi Shiva, please add a course on ")} target="_blank" rel="noreferrer">Tell me on WhatsApp</a>.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
