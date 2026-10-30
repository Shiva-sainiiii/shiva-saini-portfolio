"use client";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SITE } from "@/lib/data";
import type { LinkItem } from "@/lib/content";
import Fx from "./Fx";
import { SendIcon, SocialIcon } from "./Icons";

const input = "w-full rounded-lg border border-line2 bg-surface px-4 py-3 text-white outline-none placeholder:text-mute/70 focus:border-accent2";

export default function Contact({ links }: { links: LinkItem[] }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [hp, setHp] = useState(""); // honeypot: bots bharte hain, insaan nahi dekhta
  const lastSent = useRef(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) { setStatus("done"); return; } // bot: chupchap success dikha do, bheji kuch nahi
    if (Date.now() - lastSent.current < 30_000) { setStatus("error"); return; } // 30s cooldown
    // Supabase na ho to mail app khul jaayegi
    if (!supabase) { window.location.href = `mailto:${SITE.email}?body=${encodeURIComponent(form.message)}`; return; }
    setStatus("sending");
    const { error } = await supabase.from("messages").insert({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
    if (error) return setStatus("error");
    lastSent.current = Date.now();
    setForm({ name: "", email: "", message: "" }); setStatus("done");
  };

  return (
    <div>
      <p className="mb-6 text-xl italic text-accent2 md:text-3xl">Let&apos;s build something great.</p>
      <a href={`mailto:${SITE.email}`} className="break-all text-2xl font-semibold text-white underline-offset-8 hover:text-accent2 hover:underline md:text-5xl">{SITE.email}</a>
      <p className="mt-4 text-mute">{SITE.location}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="glow-box rounded-full border-2 border-accent2 bg-ground px-6 py-3 text-sm font-bold tracking-wide transition-colors hover:bg-accent2 hover:text-black"><Fx tone="text-black">{`WhatsApp ${SITE.phone}`}</Fx></a>
        <a href={`tel:${SITE.phoneRaw}`} className="rounded-full border border-line2 bg-ground px-6 py-3 text-sm font-medium text-white transition-colors hover:border-accent2 hover:text-accent2"><Fx>Call now</Fx></a>
      </div>

      <form onSubmit={submit} className="mt-12 space-y-4">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <div className="grid gap-4 sm:grid-cols-2">
          <input className={input} placeholder="Name" required maxLength={80} value={form.name} onChange={set("name")} />
          <input className={input} type="email" placeholder="Email" required maxLength={120} value={form.email} onChange={set("email")} />
        </div>
        <textarea className={input} placeholder="Message" rows={4} required maxLength={2000} value={form.message} onChange={set("message")} />
        <button disabled={status === "sending"} className="group inline-flex items-center gap-2 rounded-full bg-accent2 px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-50">
          <Fx tone="text-black">{status === "sending" ? "Sending…" : "Send message"}</Fx>
          <SendIcon className={`h-4 w-4 transition-transform duration-200 ${status === "sending" ? "translate-x-1 -translate-y-1 opacity-60" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
        </button>
        {status === "done" && <p className="text-sm text-ink">Message sent. I will get back to you soon.</p>}
        {status === "error" && <p className="text-sm text-red-400">Could not send. Please email me directly.</p>}
      </form>

      <ul className="mt-12 flex flex-wrap gap-3 text-sm">
        {links.map((l) => (
          <li key={l.id}><a href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line2 bg-surface px-4 py-2 text-ink transition-colors hover:border-accent2 hover:text-accent2"><SocialIcon label={l.label} url={l.url} className="h-4 w-4 shrink-0" /><Fx>{l.label}</Fx></a></li>
        ))}
      </ul>
    </div>
  );
}
