import Link from "next/link";
import { site, wa } from "@/data/content";
import { trades } from "@/data/trades";
import { courses } from "@/data/courses";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-grid">
        <div>
          <h3>{site.name}</h3>
          <p>Full-stack web developer in {site.location}. Websites for local businesses in Sonipat, Rohtak and across Haryana. Free demo first.</p>
          <p><a href={wa()} target="_blank" rel="noreferrer">WhatsApp {site.phone}</a></p>
        </div>
        <div>
          <h3>Websites for</h3>
          <ul>{trades.map((t) => (<li key={t.slug}><Link href={`/${t.slug}`}>{t.match === "Real Estate" ? "Real estate" : t.match === "Jeweller" ? "Jewellers" : `${t.match}s`}</Link></li>))}</ul>
        </div>
        <div>
          <h3>Free courses</h3>
          <ul>{courses.filter((c) => c.featured).map((c) => (<li key={c.slug}><Link href={`/courses/${c.slug}`}>{c.title}</Link></li>))}<li><Link href="/courses">All {courses.length} courses</Link></li></ul>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link href="/#work">Work</Link></li>
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#projects">Projects</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><a href={site.resume} target="_blank" rel="noreferrer">Resume</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-b">© {new Date().getFullYear()} {site.name}. Kharkhoda, Sonipat, Haryana.</div>
    </footer>
  );
}
