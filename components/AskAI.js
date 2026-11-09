"use client";
import { useEffect, useRef, useState } from "react";
import { askChips } from "@/data/content";
import { Back, Video, Phone, Dots, Smile, Clip, Camera, Mic, Send, Ticks } from "@/components/Icons";

const now = () => new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });

export default function AskAI() {
  const [msgs, setMsgs] = useState([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [t0, setT0] = useState("");
  const box = useRef(null);
  useEffect(() => setT0(now()), []);

  async function send(text) {
    const t = (text ?? q).trim();
    if (!t || busy) return;
    const next = [...msgs, { r: "me", t, at: now() }];
    setMsgs(next); setQ(""); setBusy(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: t }) });
      const d = await res.json();
      setMsgs([...next, { r: "ai", t: d.reply || "Something went wrong. Try again.", at: now() }]);
    } catch {
      setMsgs([...next, { r: "ai", t: "Could not reach the assistant. Please try again.", at: now() }]);
    }
    setBusy(false);
    setTimeout(() => box.current?.scrollTo({ top: 99999, behavior: "smooth" }), 50);
  }

  return (
    <section id="ask" className="sec wall ink">
      <div className="split ask">
        <div>
          <h2 className="d">Ask<br />my AI</h2>
          <p className="lead">Questions about my projects, stack or services. Answers come from my real work.</p>
          <div className="stickers col">{askChips.map((c) => <button key={c} className="sticker btn-s" onClick={() => send(c)}>{c}</button>)}</div>
        </div>
        <div className="phone">
          <div className="wa-head">
            <Back size={22} />
            <img className="wa-dp" src="/shiva-logo.png" alt="" />
            <div className="wa-who"><b>Shiva's assistant</b><small>online</small></div>
            <div className="wa-act"><Video size={22} /><Phone size={20} /><Dots size={22} /></div>
          </div>
          <div className="wa-body" ref={box}>
            <div className="wa-day">Today</div>
            <div className="bubble ai">Hi! Ask me about Shiva's work, or tap one of the suggested questions.<small>{t0}</small></div>
            {msgs.map((m, i) => (
              <div key={i} className={`bubble ${m.r}`}>{m.t}<small>{m.at}{m.r === "me" && <Ticks size={14} className="tick" />}</small></div>
            ))}
            {busy && <div className="bubble ai typing"><i /><i /><i /></div>}
          </div>
          <div className="wa-in">
            <div className="wa-pill">
              <button aria-label="Stickers" tabIndex={-1}><Smile size={24} /></button>
              <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Message" />
              <button aria-label="Attach" tabIndex={-1}><Clip size={22} /></button>
              <button aria-label="Pay" tabIndex={-1} className="rup">₹</button>
              <button aria-label="Camera" tabIndex={-1}><Camera size={22} /></button>
            </div>
            <button className="wa-mic" onClick={() => (q.trim() ? send() : null)} aria-label={q.trim() ? "Send" : "Voice message"} disabled={busy}>
              {q.trim() ? <Send size={22} /> : <Mic size={24} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
