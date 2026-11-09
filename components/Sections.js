import { site, wa, heroLines, heroStats, sapna, templates, services, process, projects, easy, experience, certs } from "@/data/content";
import { Mail, Phone, Pin, GearInfinity, LinkedIn, GitHub, WhatsApp, Instagram, Google, WebsiteIcon } from "@/components/Icons";
import ProjectList from "@/components/ProjectList";
import Rotator from "@/components/Rotator";
import TradeIcon from "@/components/TradeIcons";

// Khali ya "#" link ko hide karne ke liye
const ok = (u) => u && u !== "#";
const Row = ({ a, b, red }) => (<div className="brow"><span>{a}</span><i /><b className={red ? "red" : ""}>{b}</b></div>);

export function Hero() {
  return (
    <section id="top" className="sec wall ink hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eb-full">Clinic · Gym · Café · Real Estate · Services</span><Rotator items={["Clinic", "Gym", "Café", "Real Estate", "Jewellery", "Services"]} /></div>
          <h1 className="hero-title">{heroLines.map((l, i) => {
            if (i !== heroLines.length - 1) return <span key={l} className="t1">{l}</span>;
            const [first, ...rest] = l.split(" ");
            return <span key={l} className="t2">{first} <em>{rest.join(" ")}</em></span>;
          })}</h1>
          <p className="hero-sub">I build the website behind the sign.</p>
          <p className="lead">Full-stack developer. Live client sites in Haryana.</p>
          <div className="row-btns">
            <a className="btn" href={wa()} target="_blank" rel="noreferrer">Get a website for your business →</a>
            <a className="btn alt" href={site.resume} target="_blank" rel="noreferrer">Hiring? See my resume</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-art"><span className="disc" /><span className="orbit-wrap" aria-hidden="true"><span className="arc"><i className="star" /></span></span><img src="/statue.webp" alt="" width="1000" height="960" /></div>
          <div className="stats">
            <div className="stat"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg><div><b>{projects.length}+</b><span>Projects</span></div></div>
            {heroStats.clients && <div className="stat"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></svg><div><b>{heroStats.clients}</b><span>Happy Clients</span></div></div>}
            <div className="stat"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1.2 1.2C7.8 18.5 7 20 7 22M14 14.7V17c0 .6.5 1 1.2 1.2 1 .3 1.8 1.8 1.8 3.8M18 2H6v7a6 6 0 0 0 12 0Z" /></svg><div><b>{certs.length}+</b><span>Certificates</span></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Sapna() {
  return (
    <section id="work" className="sec wall chalk">
      <h2 className="d one-line">Dr. Sapna's<br className="dbr" /> Dental Care</h2>
      <div className={`split ${sapna.image ? "" : "one"}`}>
        <div className="bill">
          <div className="stamp">Live</div>
          <div className="bill-h">Bill no. 001 · Rohtak</div>
          <p className="bill-d">A full clinic website with an admin panel the doctor runs herself, and an AI chatbot that answers patients.</p>
          {sapna.result && <Row a="Result" b={sapna.result} red />}
          <Row a="Stack" b="Next.js · Admin panel · Gemini chatbot" />
          <Row a="My role" b="Design · build · launch" />
          <a className="btn" href={site.sapnaUrl} target="_blank" rel="noreferrer">Open live site ↗</a>
        </div>
        {sapna.image && (
          <div className="shots-wrap">
            <div className="browser"><div className="browser-bar"><i /><i /><i /></div><img src={sapna.image} alt="Dr. Sapna's Dental Care website" style={{ display: "block", width: "100%" }} /></div>
            {sapna.mobile && <div className="sphone"><img src={sapna.mobile} alt="Dr. Sapna's Dental Care on mobile" /></div>}
          </div>
        )}
      </div>
    </section>
  );
}

export function Templates() {
  return (
    <section id="demo" className="sec wall ink">
      <h2 className="d">Templates by trade</h2>
      <p className="lead">Pick your business. Each one is a ready site I customise for you.</p>
      <div className="rates">
        {templates.map((t) => (
          <div key={t.name} className="rate">
            <div className="rate-top">
              <span className="rate-n">{t.name}</span>
              <span className="sw" style={{ background: t.c[0] }} /><span className="sw" style={{ background: t.c[1] }} />
              <TradeIcon name={t.name} />
              <i />
              {t.demo
                ? <a className="tagy" href={t.demo} target="_blank" rel="noreferrer">Live demo ↗</a>
                : <a className="tagy" href={wa(`Hi, I'd like the ${t.name} template`)} target="_blank" rel="noreferrer">Ask for demo</a>}
            </div>
            <div className="rate-d">{t.text} <a className="ul2" href={wa(`Hi Shiva, I run a ${t.name.toLowerCase()} business. I'd like this website.`)} target="_blank" rel="noreferrer">Get this ↗</a></div>
          </div>
        ))}
      </div>
      <p className="small">Don't see your trade? <a className="ul" href={wa("Hi, my trade is ")} target="_blank" rel="noreferrer">Ask on WhatsApp</a> · <a className="ul" href={site.moreDemos} target="_blank" rel="noreferrer">More demos ↗</a></p>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="sec wall chalk">
      <h2 className="d">What I do</h2>
      <div className="svc">
        {services.map(([a, b], i) => { const Ic = [WebsiteIcon, Google, WhatsApp, Instagram][i]; return (<div key={a} className="svc-row"><div className="svc-n">{Ic && <span className="svc-ico"><Ic size={34} /></span>}<span>{a}</span></div><div className="svc-d">{b}</div></div>); })}
      </div>
      <div className="stickers">
        <span className="small b">Demo sites for</span>
        {templates.map((t) => <span key={t.name} className="sticker">{t.name}</span>)}
        <a className="btn" href={wa("Hi, I want a free demo")} target="_blank" rel="noreferrer">Get a free demo</a>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="sec wall yel">
      <div className="between"><h2 className="d">How a project goes</h2><a className="btn dk" href={wa("Hi, I want a free demo")} target="_blank" rel="noreferrer">Start with a free demo</a></div>
      <div className="tickets">
        {process.map(([a, b], i) => (
          <div key={a} className="ticket"><div className="d tk-n">{i + 1}</div><div className="tk-t">{a}</div><p>{b}</p></div>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="sec wall chalk">
      <div className="between"><h2 className="d">Projects</h2><span className="small">Things I built for myself.</span></div>
      <ProjectList />
    </section>
  );
}

const flow = ["Your command", "Intent parser", "AI (only for typos or complex asks)", "GitHub · Vercel · Render · Netlify APIs"];

export function EasyDevOps() {
  return (
    <section id="easydevops" className="sec wall ink">
      <div className="split narrow">
        <div>
          <span className="mk">Engineering project</span>
          <h2 className="d one-line ed-h" style={{ marginTop: 18 }}><GearInfinity className="ed-ico" size={40} /><span>Easy<br className="dbr" />DevOps</span></h2>
          <p className="lead">Deploy without a laptop. GitHub, Vercel, Render and Netlify on one screen, driven by plain commands.</p>
          <div className="stickers">{["Flask", "Vanilla JS", "Python intent parser", "Platform APIs"].map((x) => <span key={x} className="sticker">{x}</span>)}</div>
          <a className="btn" href={site.easyUrl} target="_blank" rel="noreferrer">Open live app ↗</a>
        </div>
        <div className="notes">
          <div className="flow" aria-label="How a command flows">{flow.map((x) => <span key={x} className="fl">{x}</span>)}</div>
          {easy.map(([a, b]) => (<div key={a} className="note"><span className="mk">{a}</span><p>{b}</p></div>))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="sec wall chalk">
      <div className="split about">
        <div className="vcard">
          {site.photo
            ? <img className="vc-photo" src={site.photo} alt={site.name} />
            : <div className="vc-logo"><img src="/shiva-logo.png" alt="" /></div>}
          <div className="vc-top"><div><div className="vc-n">{site.name}</div><div className="vc-r">Full-stack developer</div></div></div>
          <div className="vc-c">{site.location}</div>
        </div>
        <div>
          <h2 className="d">About</h2>
          <p className="big2">Self-driven full-stack developer from Kharkhoda, Haryana. I build websites and AI tools for businesses, and I started by deploying from a phone.</p>
          <div className="exp">
            {experience.map(([a, b, c]) => (<div key={a} className="exp-row"><div><b>{a}</b><span>{b}</span></div><em>{c}</em></div>))}
          </div>
          <div className="row-btns" id="resume"><a className="btn" href={site.resume} target="_blank" rel="noreferrer">Resume ↓</a>{ok(site.github) && <a className="btn alt" href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a>}</div>
        </div>
      </div>
    </section>
  );
}

export function Certificates() {
  return (
    <section id="certs" className="sec wall sand">
      <div className="between"><h2 className="d">Certificates</h2><span className="small">{certs.some((c) => c.image) ? "Tap any one to open it full size." : ""}</span></div>
      <div className="certs">
        {certs.map((c, i) => {
          const inner = (<>{c.image && <img src={c.image} alt={c.title} />}<b>{c.title}</b><span>{c.by}</span></>);
          return c.image
            ? <a key={i} href={c.image} target="_blank" rel="noreferrer" className="frame">{inner}</a>
            : <div key={i} className="frame plain">{inner}</div>;
        })}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="sec wall yel contact">
      <div><div className="open-sign"><span className="d">Open</span><small>for freelance work and internships</small></div><h2 className="d huge">Let's talk.</h2></div>
      <div className="contact-grid">
        <div>
          <a className="btn dk big" href={wa()} target="_blank" rel="noreferrer"><WhatsApp size={22} />WhatsApp me</a>
          <div className="row-btns pair">
            <a className="btn wh" href={`mailto:${site.email}`}><Mail size={20} />Email</a>
            <a className="btn wh" href={`tel:${site.phone.replace(/\s/g, "")}`}><Phone size={20} />Call</a>
          </div>
          <div className="row-btns mini">
            {ok(site.linkedin) && <a className="btn alt" href={site.linkedin} target="_blank" rel="noreferrer"><LinkedIn size={20} />LinkedIn</a>}
            {ok(site.github) && <a className="btn alt" href={site.github} target="_blank" rel="noreferrer"><GitHub size={20} />GitHub</a>}
          </div>
        </div>
        <div className="mapbox">
          <iframe title={`Map: ${site.location}`} src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <a className="map-cap" href={site.mapLink} target="_blank" rel="noreferrer"><span><Pin size={18} /> {site.location}</span><span>Open in Maps ↗</span></a>
        </div>
      </div>
    </section>
  );
}
