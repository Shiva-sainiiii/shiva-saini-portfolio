"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { SITE } from "@/lib/data";
import type { LinkItem } from "@/lib/content";

const input = "w-full rounded-lg border border-line2 bg-surface px-4 py-3 text-white outline-none placeholder:text-mute/70 focus:border-cyan-400";

export default function Contact({ links }: { links: LinkItem[] }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase na ho to mail app khul jaayegi
    if (!supabase) { window.location.href = `mailto:${SITE.email}?body=${encodeURIComponent(form.message)}`; return; }
    setStatus("sending");
    const { error } = await supabase.from("messages").insert(form);
    if (error) return setStatus("error");
    setForm({ name: "", email: "", message: "" }); setStatus("done");
  };

  return (
    <div>
      <p className="mb-6 text-xl italic text-accent2 md:text-3xl">Let&apos;s build something great.</p>
      <a href={`mailto:${SITE.email}`} className="break-all text-2xl font-semibold text-white underline-offset-8 hover:text-cyan-300 hover:underline md:text-5xl">{SITE.email}</a>
      <p className="mt-4 text-mute">{SITE.location}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="glow-box rounded-full border-2 border-cyan-400 bg-ground px-6 py-3 text-sm font-bold tracking-wide transition-colors hover:bg-cyan-400 hover:text-black">WhatsApp {SITE.phone}</a>
        <a href={`tel:${SITE.phoneRaw}`} className="rounded-full border border-line2 bg-ground px-6 py-3 text-sm font-medium text-white transition-colors hover:border-cyan-400 hover:text-cyan-300">Call now</a>
      </div>

      <form onSubmit={submit} className="mt-12 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input className={input} placeholder="Name" required value={form.name} onChange={set("name")} />
          <input className={input} type="email" placeholder="Email" required value={form.email} onChange={set("email")} />
        </div>
        <textarea className={input} placeholder="Message" rows={4} required maxLength={2000} value={form.message} onChange={set("message")} />
        <button disabled={status === "sending"} className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 disabled:opacity-50">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "done" && <p className="text-sm text-ink">Message sent. I will get back to you soon.</p>}
        {status === "error" && <p className="text-sm text-red-400">Could not send. Please email me directly.</p>}
      </form>

      <ul className="mt-12 flex flex-wrap gap-3 text-sm">
        {links.map((l) => (
          <li key={l.id}><a href={l.url} target="_blank" rel="noreferrer" className="inline-block rounded-full border border-line2 bg-surface px-4 py-2 text-ink transition-colors hover:border-cyan-400 hover:text-cyan-300">{l.label}</a></li>
        ))}
      </ul>
    </div>
  );
}
