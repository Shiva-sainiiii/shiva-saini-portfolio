"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Progress sirf us browser me (localStorage) save hota hai. Koi login nahi.
const key = (c) => `course:${c}`;
const read = (c) => { try { const v = JSON.parse(localStorage.getItem(key(c)) || "[]"); return Array.isArray(v) ? v : []; } catch { return []; } };
const write = (c, list) => { try { localStorage.setItem(key(c), JSON.stringify(list)); } catch {} };

export function MarkDone({ course, chapter }) {
  const [done, setDone] = useState(false);
  useEffect(() => { setDone(read(course).includes(chapter)); }, [course, chapter]);
  const toggle = () => {
    const list = read(course).filter((x) => x !== chapter);
    if (!done) list.push(chapter);
    write(course, list);
    setDone(!done);
  };
  return <button type="button" className={`btn${done ? " alt" : ""}`} onClick={toggle}>{done ? "✓ Done. Tap to undo" : "Mark this chapter as done"}</button>;
}

export function ChapterList({ course, items }) {
  const [done, setDone] = useState([]);
  useEffect(() => { setDone(read(course)); }, [course]);
  const n = items.filter((x) => done.includes(x.slug)).length;
  return (
    <>
      <p className="small prog">{n} of {items.length} chapters done on this device</p>
      <div className="chaps">
        {items.map((x, i) => (
          <Link key={x.slug} href={x.href} className="chap">
            <span className={`cn${done.includes(x.slug) ? " on" : ""}`}>{done.includes(x.slug) ? "✓" : i + 1}</span>
            <span className="ct"><b>{x.title}</b><i>{x.summary}</i></span>
            <span className="cm">{x.mins} min</span>
          </Link>
        ))}
      </div>
    </>
  );
}
