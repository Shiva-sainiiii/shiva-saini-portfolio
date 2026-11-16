import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollFX from "@/components/ScrollFX";
import Nav from "@/components/Nav";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site, wa, process as steps } from "@/data/content";
import { trades, tradeBySlug } from "@/data/trades";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app";

export const dynamicParams = false; // sirf trades.js wale slugs, baaki 404
export function generateStaticParams() { return trades.map((t) => ({ slug: t.slug })); }

export function generateMetadata({ params }) {
  const t = tradeBySlug(params.slug);
  if (!t) return {};
  const img = [{ url: "/og.jpg", width: 1200, height: 630, alt: `${t.h1}, by Shiva Saini` }];
  return {
    title: { absolute: t.title },
    description: t.desc,
    alternates: { canonical: `/${t.slug}` },
    openGraph: { type: "website", url: `/${t.slug}`, siteName: "Shiva Saini", locale: "en_IN", title: t.title, description: t.desc, images: img },
    twitter: { card: "summary_large_image", title: t.title, description: t.desc, images: ["/og.jpg"] },
  };
}

export default function TradePage({ params }) {
  const t = tradeBySlug(params.slug);
  if (!t) notFound();
  const url = `${base}/${t.slug}`;
  const others = trades.filter((x) => x.slug !== t.slug);
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", "@id": `${url}#service`, name: t.h1, url, description: t.desc, serviceType: "Website development",
        provider: { "@type": "Person", "@id": `${base}/#person`, name: site.name, url: base },
        areaServed: [{ "@type": "AdministrativeArea", name: "Haryana" }, { "@type": "City", name: "Sonipat" }, { "@type": "City", name: "Rohtak" }],
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: t.h1, item: url },
      ] },
      { "@type": "FAQPage", mainEntity: t.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  };
  return (
    <>
      <JsonLd data={ld} />
      <ScrollFX />
      <Nav home="/" />
      <main>
        <section className="sec page-hero">
          <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Websites for {t.match === "Real Estate" ? "real estate" : t.match.toLowerCase() + "s"}</span></nav>
          <h1 className="d">{t.h1}</h1>
          <p className="lead">{t.intro}</p>
          <div className="row-btns">
            <a className="btn" href={wa(`Hi Shiva, I run a ${t.noun} and want a website.`)} target="_blank" rel="noreferrer">Get a free demo →</a>
            {t.demo && <a className="btn alt" href={t.demo} target="_blank" rel="noreferrer">See a live demo ↗</a>}
          </div>
        </section>

        <section className="sec wall chalk">
          <h2 className="d">What your {t.noun} website needs</h2>
          <div className="svc">
            {t.features.map(([a, b]) => (<div key={a} className="svc-row"><div className="svc-n"><span>{a}</span></div><div className="svc-d">{b}</div></div>))}
          </div>
        </section>

        <section className="sec wall ink">
          <h2 className="d">How it helps people find you</h2>
          <div className="notes two">
            {t.seo.map(([a, b]) => (<div key={a} className="note"><span className="mk">{a}</span><p>{b}</p></div>))}
          </div>
        </section>

        {t.example && (
          <section className="sec wall chalk">
            <h2 className="d">Work I have already done</h2>
            <div className="split one">
              <div className="bill">
                <div className="stamp">Live</div>
                <div className="bill-h">{t.example.label}</div>
                <p className="bill-d"><b>{t.example.name}</b><br />{t.example.text}</p>
                <a className="btn" href={t.example.url} target="_blank" rel="noreferrer">Open live site ↗</a>
              </div>
            </div>
          </section>
        )}

        <section className="sec wall yel">
          <div className="between"><h2 className="d">How a project goes</h2><a className="btn dk" href={wa("Hi, I want a free demo")} target="_blank" rel="noreferrer">Start with a free demo</a></div>
          <div className="tickets">
            {steps.map(([a, b], i) => (<div key={a} className="ticket"><div className="d tk-n">{i + 1}</div><div className="tk-t">{a}</div><p>{b}</p></div>))}
          </div>
        </section>

        <section className="sec wall chalk">
          <h2 className="d">Questions</h2>
          <Faq items={t.faq} />
        </section>

        <section className="sec wall ink">
          <h2 className="d">Other trades I build for</h2>
          <div className="stickers">
            {others.map((x) => (<Link key={x.slug} className="sticker" href={`/${x.slug}`}>{x.match}</Link>))}
            <a className="btn" href={wa(`Hi Shiva, I run a ${t.noun} and want a website.`)} target="_blank" rel="noreferrer">WhatsApp me</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
