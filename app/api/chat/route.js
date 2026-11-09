import { NextResponse } from "next/server";
import { aiContext } from "@/data/content";

const canned = [
  [/sapna|dental|clinic/i, "I built a full clinic website for Dr. Sapna's Dental Care in Rohtak, with an admin panel she runs herself and an AI chatbot that answers patients."],
  [/stack|tech|language/i, "I mostly work with Next.js, Supabase and AI APIs, plus Flask and vanilla JS for smaller tools."],
  [/gym|cafe|jewel|real estate|website|site/i, "Yes, I have ready templates for dentists, gyms, jewellers, cafes and real estate. Message Shiva on WhatsApp for a free demo."],
  [/price|cost|charge|rate/i, "Pricing depends on the project. Message Shiva on WhatsApp and he will share a quote after a free demo."],
];

// Chhota in-memory rate limit: har IP se 8 sawal / minute. (Serverless me har instance ka apna hota hai; abuse rokne ke liye kaafi.)
const hits = new Map();
const LIMIT = 8, WINDOW = 60_000;
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 500) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW)) hits.delete(k);
  return arr.length > LIMIT;
}

export async function POST(req) {
  const ip = (req.headers.get("x-forwarded-for") || "anon").split(",")[0].trim();
  if (limited(ip)) return NextResponse.json({ reply: "Too many questions at once. Please wait a minute." }, { status: 429 });

  const { message } = await req.json().catch(() => ({}));
  if (!message || typeof message !== "string" || message.length > 500)
    return NextResponse.json({ reply: "Please send a short question." }, { status: 400 });

  const key = process.env.GEMINI_API_KEY;
  if (key) {
    try {
      const model = process.env.GEMINI_MODEL || "gemini-2.0-flash"; // current model name Google ke docs me check karo
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: aiContext }] }, contents: [{ role: "user", parts: [{ text: message }] }] }),
      });
      const d = await r.json();
      const reply = d?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return NextResponse.json({ reply });
    } catch {}
  }
  const hit = canned.find(([re]) => re.test(message));
  return NextResponse.json({ reply: hit ? hit[1] : "Good question. Please message Shiva on WhatsApp and he will answer directly." });
}
