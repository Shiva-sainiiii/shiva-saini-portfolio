"use client";
import { useState } from "react";
export default function Feedback() {
  const [stars, setStars] = useState(5);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [state, setState] = useState("idle");
  async function submit() {
    if (state === "sending") return;
    setState("sending");
    try {
      const r = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ stars, name, text }) });
      setState(r.ok ? "done" : "error");
    } catch { setState("error"); }
  }
  return (
    <section className="sec wall chalk">
      <div className="split fb">
        <div><h2 className="d">Rate<br />my work</h2><p className="lead">Visited the site, used a project or worked with me? One tap and a line is enough.</p></div>
        <div className="slip">
          {state === "done" ? (<><div className="d" style={{ fontSize: 32 }}>Thank you!</div><p>Your feedback was sent.</p></>) : (<>
            <div className="stars">{[1, 2, 3, 4, 5].map((n) => (<button key={n} aria-label={`${n} stars`} onClick={() => setStars(n)} className={n <= stars ? "on" : ""}>★</button>))}</div>
            <input className="fld" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea className="fld" rows={4} placeholder="Say what you liked, or what I should fix…" value={text} onChange={(e) => setText(e.target.value)} />
            <button className="btn" onClick={submit}>{state === "sending" ? "Sending…" : "Send feedback"}</button>
            {state === "error" && <p className="small" style={{ color: "#C62828" }}>Could not send. Please try again.</p>}
          </>)}
        </div>
      </div>
    </section>
  );
}
