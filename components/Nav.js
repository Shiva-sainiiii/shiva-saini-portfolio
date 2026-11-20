"use client";
import { useState } from "react";
import { site, wa } from "@/data/content";
import ThemeToggle from "@/components/ThemeToggle";
const links = [["Work", "#work"], ["Services", "#services"], ["Projects", "#projects"], ["Courses", "/courses"], ["About", "#about"]];
export default function Nav({ home = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`nav ${open ? "menu-open" : ""}`}>
      <a href={home ? home : "#top"} className="logo"><img src="/shiva-logo-nobg.png" width="38" height="38" alt="" /><span>{site.name}</span></a>
      <button className={`burger ${open ? "open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /><i /></button>
      <nav aria-label="Main" className={open ? "open" : ""} onClick={() => setOpen(false)}>
        {links.map(([l, h]) => <a key={l} href={h.startsWith("/") ? h : `${home}${h}`}>{l}</a>)}
        <a href={site.resume} target="_blank" rel="noreferrer">Resume</a>
        <a className="btn sm only-m" href={wa()} target="_blank" rel="noreferrer">Contact</a>
      </nav>
      <div className="nav-right">
        <a className="btn sm nav-cta" href={wa()} target="_blank" rel="noreferrer">Contact</a>
        <ThemeToggle />
      </div>
    </header>
  );
}
