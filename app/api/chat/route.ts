import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { EXPERIENCE, SERVICES, SITE } from "@/lib/data";

type Msg = { role: "user" | "assistant"; content: string };

// ---- Abuse guard: IP-wise rate limit (in-memory). Vercel pe har instance ka apna counter hota hai, isliye ye
// "perfect" nahi par casual spam / script se quota jalane se rok deta hai. Pakka limit chahiye to baad me Upstash Redis lagana.
const PER_MIN = 6;
const PER_DAY = 60;
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 86_400_000);
  const lastMin = arr.filter((t) => now - t < 60_000).length;
  if (lastMin >= PER_MIN || arr.length >= PER_DAY) { hits.set(ip, arr); return true; }
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 5000) { for (const [k, v] of hits) if (!v.length || now - v[v.length - 1] > 86_400_000) hits.delete(k); }
  return false;
}
// Asli error sirf tab UI me dikhega jab Vercel env me CHAT_DEBUG=1 ho
const DEBUG = process.env.CHAT_DEBUG === "1";
const MAX_OUT = 700; // reply ki max tokens, quota bachane ke liye

// System prompt: static info + Supabase se live projects/skills (admin se update karoge to AI bhi jaan jaayega)
async function systemPrompt() {
  let projects = "", skills = "";
  if (supabase) {
    const [p, s] = await Promise.all([
      supabase.from("projects").select("title,description,tech").order("position"),
      supabase.from("skills").select("name").order("position"),
    ]);
    projects = (p.data ?? []).map((x) => `- ${x.title}: ${x.description} (${x.tech})`).join("\n");
    skills = (s.data ?? []).map((x) => x.name).join(", ");
  }
  return `You are the AI assistant on ${SITE.name}'s portfolio website. Answer visitors' questions about Shiva clearly and briefly (under ~200 words). You may also help with short, general programming questions, but politely decline unrelated requests (essays, homework, roleplay, anything not about Shiva, his work or web development).
Only state facts about Shiva from the info below. If something is not covered, say so and suggest emailing ${SITE.email}.
About: ${SITE.about}
Role: ${SITE.role}. Location: ${SITE.location}. Available for opportunities.
Experience: ${EXPERIENCE.map((e) => `${e.company} (${e.role}, ${e.period})`).join("; ")}
Freelance services: ${SERVICES.map((s) => s.title).join(", ")}. A free demo website is offered. Phone/WhatsApp: ${SITE.phone}.
Skills: ${skills}
Projects:\n${projects}`;
}

async function gemini(sys: string, msgs: Msg[]) {
  const model = process.env.GEMINI_MODEL || "gemini-flash-latest";
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY! },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: sys }] },
      contents: msgs.map((m) => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.content }] })),
      generationConfig: { maxOutputTokens: MAX_OUT },
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || `Gemini error ${r.status}`);
  return (j.candidates?.[0]?.content?.parts ?? []).map((p: { text?: string }) => p.text ?? "").join("");
}

async function openrouter(sys: string, msgs: Msg[]) {
  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free",
      messages: [{ role: "system", content: sys }, ...msgs],
      max_tokens: MAX_OUT,
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || `OpenRouter error ${r.status}`);
  return j.choices?.[0]?.message?.content ?? "";
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
    if (limited(ip)) return NextResponse.json({ error: "Too many questions in a short time. Please wait a minute and try again." }, { status: 429 });
    const { messages } = (await req.json()) as { messages: Msg[] };
    if (!Array.isArray(messages) || !messages.length) return NextResponse.json({ error: "No message" }, { status: 400 });
    const clean: Msg[] = messages.slice(-10).map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content).slice(0, 2000) }));
    const sys = await systemPrompt();

    let reply: string;
    if (process.env.GEMINI_API_KEY) reply = await gemini(sys, clean);
    else if (process.env.OPENROUTER_API_KEY) reply = await openrouter(sys, clean);
    else {
      console.error("chat: no GEMINI_API_KEY / OPENROUTER_API_KEY set");
      return NextResponse.json({ error: DEBUG ? "AI not configured: set GEMINI_API_KEY (or OPENROUTER_API_KEY) in Vercel env vars and redeploy." : "The AI assistant is unavailable right now. Please email me directly." }, { status: 500 });
    }

    return NextResponse.json({ reply: reply || "The model returned an empty reply. Try again." });
  } catch (e) {
    // Asli error Vercel logs me; UI me generic (debug ke liye env CHAT_DEBUG=1 lagao)
    console.error("chat error:", e);
    return NextResponse.json({ error: DEBUG && e instanceof Error ? e.message : "The AI is busy right now. Please try again in a moment, or email me directly." }, { status: 500 });
  }
}
