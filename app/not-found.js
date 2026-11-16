import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { wa } from "@/data/content";
import { trades } from "@/data/trades";

export const metadata = { title: "Page not found | Shiva Saini", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <>
      <Nav home="/" />
      <main>
        <section className="sec page-hero nf">
          <h1 className="d">This page does not exist</h1>
          <p className="lead">The link may be old or mistyped. Here is where you can go instead.</p>
          <div className="row-btns">
            <Link className="btn" href="/">Back to home</Link>
            <a className="btn alt" href={wa()} target="_blank" rel="noreferrer">WhatsApp me</a>
          </div>
          <div className="stickers">
            {trades.map((t) => (<Link key={t.slug} className="sticker" href={`/${t.slug}`}>{t.match}</Link>))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
