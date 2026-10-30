"use client";
import { useEffect, useRef, useState } from "react";
import Markdown from "./Markdown";
import { SendIcon } from "./Icons";
import Fx from "./Fx";

type Msg = { role: "user" | "assistant"; content: string };
const SUGGESTIONS = ["What are Shiva's skills?", "Tell me about his projects", "Is he available to hire?", "Explain async/await in JS"];

// AI soch raha ho tab 3 bouncing dots (reduced-motion me halka pulse). aria-live se screen reader ko bhi pata chalta hai.
const Thinking = () => (
  <div role="status" aria-live="polite" className="flex w-fit items-center gap-3 rounded-2xl border border-line bg-ground px-4 py-3">
    <span className="flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((n) => (
        <span key={n} className="h-2 w-2 rounded-full bg-accent2 motion-safe:animate-bounce motion-reduce:animate-pulse" style={{ animationDelay: `${n * 140}ms`, animationDuration: "0.9s" }} />
      ))}
    </span>
    <span className="text-xs text-mute">Thinking…</span>
  </div>
);

// Reply type hone jaisi dikhti hai (naya jawab). ~1.6s me poora, lambe jawab me tez. Tap/click karne par turant poora.
function Typed({ text, onTick, onDone }: { text: string; onTick: () => void; onDone: () => void }) {
  const [n, setN] = useState(0);
  const cb = useRef({ onTick, onDone });
  cb.current = { onTick, onDone };

  useEffect(() => {
    const total = text.length;
    const perFrame = Math.max(2, Math.ceil(total / 100)); // ~100 frames => ~1.6s
    let raf = 0, i = 0;
    const step = () => {
      i = Math.min(total, i + perFrame);
      setN(i);
      cb.current.onTick();
      if (i < total) raf = requestAnimationFrame(step); else cb.current.onDone();
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <div onClick={() => { setN(text.length); cb.current.onDone(); }} title="Tap to show full reply">
      <Markdown text={text.slice(0, n)} />
      {n < text.length && <span aria-hidden className="typed inline-block h-4 w-2 align-middle text-accent2" />}
    </div>
  );
}

export default function AskAI() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(-1); // jis assistant message pe typing effect chal raha hai uska index
  const listRef = useRef<HTMLDivElement>(null);

  const toBottom = () => { const el = listRef.current; if (el) el.scrollTop = el.scrollHeight; };
  // Naya message aaye to chat box andar hi scroll ho (page nahi)
  useEffect(toBottom, [msgs, busy]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next); setInput(""); setBusy(true); setTyping(-1);
    let reply = "", ok = false;
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => !m.content.startsWith("⚠")) }), // purane error history me nahi jaate
      });
      const j = await r.json().catch(() => ({}));
      ok = r.ok && typeof j.reply === "string";
      reply = ok ? j.reply : `⚠ ${j.error || `Server error (${r.status})`}`;
    } catch {
      reply = "⚠ Network error. Please try again.";
    }
    setMsgs([...next, { role: "assistant", content: reply }]);
    // Sirf asli jawab pe typing effect (error pe nahi); reduced-motion walon ko seedha poora
    const rm = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTyping(ok && !rm ? next.length : -1);
    setBusy(false);
  };

  return (
    <div className="rounded-2xl border border-line bg-surface">
      <div ref={listRef} className="h-80 space-y-4 overflow-y-auto p-5 text-sm leading-relaxed">
        {!msgs.length && <p className="text-mute">Hi! I&apos;m Shiva&apos;s AI assistant. Ask about his skills and projects, or any coding question.</p>}
        {msgs.map((m, i) => (
          m.role === "user" ? (
            <p key={i} className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl border border-accent2/30 bg-accent2/15 px-4 py-2 text-white">{m.content}</p>
          ) : (
            <div key={i} className="max-w-[90%] text-ink">
              {i === typing ? <Typed text={m.content} onTick={toBottom} onDone={() => setTyping(-1)} /> : <Markdown text={m.content} />}
            </div>
          )
        ))}
        {busy && <Thinking />}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line px-5 pt-4">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => send(s)} disabled={busy} className="rounded-full border border-line2 px-3 py-1 text-xs text-mute transition-colors hover:border-accent2/60 hover:text-accent2 disabled:opacity-50"><Fx>{s}</Fx></button>
        ))}
      </div>
      <form className="flex gap-3 p-5" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" maxLength={500}
          className="min-w-0 flex-1 rounded-full border border-line2 bg-ground px-5 py-3 text-white outline-none placeholder:text-mute/70 focus:border-accent2" />
        <button disabled={busy} aria-label="Send message" className="group inline-flex items-center gap-2 rounded-full bg-accent2 px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-50">
          <span className="hidden sm:inline"><Fx tone="text-black">Send</Fx></span>
          <SendIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </form>
    </div>
  );
}
