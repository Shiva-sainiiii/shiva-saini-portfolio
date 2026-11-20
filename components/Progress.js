"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Progress sirf us browser me (localStorage) save hota hai. Koi login nahi.
const doneKey = (c) => `course:${c}`;
const quizKey = (c) => `quiz:${c}`;
const parse = (k, fallback) => { try { const v = JSON.parse(localStorage.getItem(k) || "null"); return v ?? fallback; } catch { return fallback; } };
const readDone = (c) => { const v = parse(doneKey(c), []); return Array.isArray(v) ? v : []; };
const readQuiz = (c) => { const v = parse(quizKey(c), {}); return v && typeof v === "object" && !Array.isArray(v) ? v : {}; };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} try { window.dispatchEvent(new Event("course-progress")); } catch {} };

export function saveQuiz(course, chapter, correct, total) {
  const q = readQuiz(course);
  const best = q[chapter] && q[chapter].c > correct ? q[chapter].c : correct;
  q[chapter] = { c: best, t: total };
  save(quizKey(course), q);
}

function useProgress(course) {
  const [s, setS] = useState({ done: [], quiz: {}, ready: false });
  useEffect(() => {
    const load = () => setS({ done: readDone(course), quiz: readQuiz(course), ready: true });
    load();
    window.addEventListener("course-progress", load);
    window.addEventListener("storage", load);
    return () => { window.removeEventListener("course-progress", load); window.removeEventListener("storage", load); };
  }, [course]);
  return s;
}

export function MarkDone({ course, chapter }) {
  const { done } = useProgress(course);
  const isDone = done.includes(chapter);
  const toggle = () => {
    const list = readDone(course).filter((x) => x !== chapter);
    if (!isDone) list.push(chapter);
    save(doneKey(course), list);
  };
  return <button type="button" className={`btn${isDone ? " alt" : ""}`} onClick={toggle}>{isDone ? "✓ Done. Tap to undo" : "Mark this chapter as done"}</button>;
}

export function ChapterList({ course, items }) {
  const { done, quiz } = useProgress(course);
  const n = items.filter((x) => done.includes(x.slug)).length;
  return (
    <>
      <p className="small prog">{n} of {items.length} chapters done on this device</p>
      <div className="chaps">
        {items.map((x, i) => {
          const q = quiz[x.slug];
          return (
            <Link key={x.slug} href={x.href} className="chap">
              <span className={`cn${done.includes(x.slug) ? " on" : ""}`}>{done.includes(x.slug) ? "✓" : i + 1}</span>
              <span className="ct"><b>{x.title}</b><i>{x.summary}</i></span>
              <span className="cm">{x.mins} min{q ? ` · quiz ${q.c}/${q.t}` : ""}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

// Score = har chapter ke 40 points (chapter done) + 60 points (best quiz score). Overall = sab chapters ka average.
const level = (p) => (p === 0 ? "Not started" : p < 25 ? "Just starting" : p < 50 ? "Building up" : p < 75 ? "Getting strong" : p < 100 ? "Almost there" : "Course complete");

export function Scorecard({ course, title, items }) {
  const { done, quiz, ready } = useProgress(course);
  const rows = items.map((x) => {
    const d = done.includes(x.slug);
    const q = quiz[x.slug];
    const pts = (d ? 40 : 0) + (q && q.t ? (q.c / q.t) * 60 : 0);
    return { ...x, d, q, pts };
  });
  const pct = ready && rows.length ? Math.round(rows.reduce((a, r) => a + r.pts, 0) / rows.length) : 0;
  const doneN = rows.filter((r) => r.d).length;
  const asked = rows.filter((r) => r.q);
  const quizPct = asked.length ? Math.round((asked.reduce((a, r) => a + r.q.c, 0) / asked.reduce((a, r) => a + r.q.t, 0)) * 100) : 0;
  const reset = () => {
    if (!window.confirm("Reset your progress and quiz scores for this course on this device?")) return;
    save(doneKey(course), []); save(quizKey(course), {});
  };
  return (
    <div className="score" id="scorecard">
      <div className="score-top">
        <div className="ring" style={{ background: `conic-gradient(var(--yel) ${pct * 3.6}deg, rgba(255,255,255,.12) 0)` }}><span><b>{pct}%</b><i>learned</i></span></div>
        <div className="score-t">
          <h3>{title || "Your scorecard"}</h3>
          <p className="lvl">{level(pct)}</p>
          <ul className="stats">
            <li><b>{doneN}/{rows.length}</b> chapters finished</li>
            <li><b>{asked.length ? `${quizPct}%` : "–"}</b> quiz accuracy {asked.length ? `(${asked.length}/${rows.length} quizzes taken)` : ""}</li>
          </ul>
        </div>
      </div>
      <div className="tbl"><table>
        <thead><tr><th>Chapter</th><th>Finished</th><th>Quiz</th></tr></thead>
        <tbody>{rows.map((r) => (
          <tr key={r.slug}><td><Link href={r.href}>{r.title}</Link></td><td>{r.d ? "✓" : "–"}</td><td>{r.q ? `${r.q.c}/${r.q.t}` : "–"}</td></tr>
        ))}</tbody>
      </table></div>
      <p className="small">How it is calculated: each chapter is worth 40% for marking it done and 60% for its quiz score (your best attempt). The overall score is the average of all chapters. It is saved only on this device.</p>
      <button type="button" className="linkbtn" onClick={reset}>Reset my progress</button>
    </div>
  );
}
