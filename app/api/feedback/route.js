import { NextResponse } from "next/server";

// Feedback Supabase `feedback` table me jaata hai (SQL README me). Env: SUPABASE_URL, SUPABASE_SERVICE_KEY (sirf server par, NEXT_PUBLIC mat banana).
// Env na ho to sirf server log me jaata hai (site phir bhi "Thank you" dikhati hai).
export async function POST(req) {
  const { stars, name, text } = await req.json().catch(() => ({}));
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) return NextResponse.json({ ok: false }, { status: 400 });
  const row = { stars, name: String(name || "").slice(0, 80), text: String(text || "").slice(0, 1000) };

  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) { console.log("FEEDBACK (Supabase env missing)", row); return NextResponse.json({ ok: true }); }
  try {
    const r = await fetch(`${url}/rest/v1/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}`, Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });
    if (!r.ok) { console.error("FEEDBACK insert failed", r.status); return NextResponse.json({ ok: false }, { status: 502 }); }
    return NextResponse.json({ ok: true });
  } catch (e) { console.error("FEEDBACK error", e); return NextResponse.json({ ok: false }, { status: 502 }); }
}
