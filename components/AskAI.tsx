"use client";
import { useEffect, useRef, useState } from "react";
import Markdown from "./Markdown";

type Msg = { role: "user" | "assistant"; content: string };
const SUGGESTIONS = ["What are Shiva's skills?", "Tell me about his projects", "Is he available to hire?", "Explain async/await in JS"];

export default function AskAI() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Naya message aaye to chat box andar hi scroll ho (page nahi)
  useEffect(() => { const el = listRef.current; if (el) el.scrollTop = el.scrollHeight; }, [msgs, busy]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => !m.content.startsWith("⚠")) }), // purane error history me nahi jaate
      });
      const j = await r.json().catch(() => ({}));
      setMsgs([...next, { role: "assistant", content: r.ok ? j.reply : `⚠ ${j.error || `Server error (${r.status})`}` }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "⚠ Network error. Please try again." }]);
    }
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
            <div key={i} className="max-w-[90%] text-ink"><Markdown text={m.content} /></div>
          )
        ))}
        {busy && <p className="text-mute">Thinking…</p>}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line px-5 pt-4">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => send(s)} className="rounded-full border border-line2 px-3 py-1 text-xs text-mute transition-colors hover:border-cyan-400/60 hover:text-cyan-300">{s}</button>
        ))}
      </div>
      <form className="flex gap-3 p-5" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" maxLength={500}
          className="min-w-0 flex-1 rounded-full border border-line2 bg-ground px-5 py-3 text-white outline-none placeholder:text-mute/70 focus:border-cyan-400" />
        <button disabled={busy} className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 disabled:opacity-50">Send</button>
      </form>
    </div>
  );
}
