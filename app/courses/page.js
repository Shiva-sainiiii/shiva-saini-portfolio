import Link from "next/link";
import ScrollFX from "@/components/ScrollFX";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { wa } from "@/data/content";
import { courses, categories, catId, hours } from "@/data/courses";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";
const lessons = courses.reduce((a, c) => a + c.chapters.length, 0);
const title = "Free Coding, AI and Business Courses, Chapter by Chapter | Shiva Saini";
const desc = `${courses.length} free courses, ${lessons} chapters, in simple English: Python, JavaScript, HTML and CSS, SQL, Git, cloud, AI and local business. No sign-up.`;

export const metadata = {
  title: { absolute: title }, description: desc, alternates: { canonical: "/courses" },
  openGraph: { type: "website", url: "/courses", siteName: "Shiva Saini", locale: "en_IN", title, description: desc, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Free courses by Shiva Saini" }] },
  twitter: { card: "summary_large_image", title, description: desc, images: ["/og.jpg"] },
};

export default function CoursesPage() {
  const groups = categories.map((cat) => ({ cat, list: courses.filter((c) => c.cat === cat) })).filter((g) => g.list.length);
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
          <p className="lead">{courses.length} courses and {lessons} short chapters in simple English. Read, copy the code, see the real output, try the task and check yourself with a quiz. No sign-up, no fees.</p>
          <nav className="jump" aria-label="Course categories">{groups.map((g) => <a key={g.cat} href={`#${catId(g.cat)}`}>{g.cat}</a>)}</nav>
        </section>
        {groups.map((g, k) => (
          <section key={g.cat} id={catId(g.cat)} className={`sec wall ${k % 2 ? "ink" : "chalk"}`}>
            <h2 className="d">{g.cat}</h2>
            <div className="cgrid">
              {g.list.map((c) => (
                <Link key={c.slug} href={`/courses/${c.slug}`} className="ccard">
                  <span className="mk">{c.level}</span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <span className="cmeta">{c.chapters.length} chapters · about {hours(c)} hours · Free</span>
                  <span className="btn">Start learning →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
        <section className="sec wall chalk">
          <p className="small more" style={{ marginTop: 0 }}>New chapters and courses are added over time. Want a topic covered? <a className="ul2" href={wa("Hi Shiva, please add a course on ")} target="_blank" rel="noreferrer">Tell me on WhatsApp</a>.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
