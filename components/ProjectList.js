"use client";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/content";

const ok = (u) => u && u !== "#";

// Project row par hover karo to uska screenshot mouse ke peeche floating karta hai (sirf Projects section ke andar).
export default function ProjectList() {
  const [active, setActive] = useState(null);
  const [all, setAll] = useState(false); // mobile par sirf top 3, baaki "View all" se
  const fl = useRef(null);
  const m = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
  const sec = useRef(null);

  useEffect(() => {
    if (active === null) return;
    let raf;
    const tick = () => {
      const el = fl.current;
      if (el) {
        const p = m.current;
        const vx = p.x - p.cx;
        p.cx += vx * 0.14;
        p.cy += (p.y - p.cy) * 0.14;
        const w = el.offsetWidth, h = el.offsetHeight;
        let x = p.cx + 28;
        if (x + w > window.innerWidth - 10) x = p.cx - 28 - w; // right edge pe aaye to left side
        let y = p.cy - h / 2;
        const r = sec.current?.getBoundingClientRect();
        const top = Math.max(10, r ? r.top + 10 : 10);
        const bot = Math.min(window.innerHeight - 10, r ? r.bottom - 10 : window.innerHeight - 10);
        y = Math.min(Math.max(y, top), Math.max(top, bot - h));
        const tilt = Math.max(-10, Math.min(10, vx * 0.06));
        el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${tilt}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const move = (e) => { m.current.x = e.clientX; m.current.y = e.clientY; };
  const enter = (i, e, has) => {
    sec.current = e.currentTarget.closest("section");
    move(e);
    m.current.cx = e.clientX; m.current.cy = e.clientY; // purani jagah se udke na aaye
    setActive(has ? i : null);
  };
  const shots = active !== null ? projects[active][5] || [] : [];

  return (
    <>
      <div className={`khata ${all ? "all" : ""}`} onMouseLeave={() => setActive(null)}>
        {projects.map(([n, stack, d, live, code, imgs = []], i) => (
          <div key={n} className="k-row" onMouseEnter={(e) => enter(i, e, imgs.length > 0)} onMouseMove={move}>
            <div className="k-n">{n === "EasyDevOps" ? <a href="#easydevops">{n}</a> : n}</div>
            <div><b>{stack}</b><div>{d}</div></div>
            <div className="k-l">
              {ok(live) && <a href={live} target="_blank" rel="noreferrer">Live ↗</a>}
              {ok(code) && <a href={code} target="_blank" rel="noreferrer">Code ↗</a>}
            </div>
            {imgs.length > 0 && (
              <div className="k-shots">
                {imgs.map((src) => <a key={src} href={src} target="_blank" rel="noreferrer"><img src={src} alt={`${n} screenshot`} loading="lazy" /></a>)}
              </div>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="btn alt view-all" onClick={() => { const next = !all; setAll(next); if (!next) document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>
        {all ? "Show less ↑" : `View all ${projects.length} projects ↓`}
      </button>
      <div ref={fl} className={`k-float ${shots.length ? "on" : ""}`} aria-hidden="true">
        {shots.map((src, j) => <img key={src} src={src} alt="" className={j ? "second" : ""} />)}
      </div>
    </>
  );
}
