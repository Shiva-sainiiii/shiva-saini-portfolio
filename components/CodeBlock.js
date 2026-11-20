"use client";
import { useState } from "react";

const LABELS = { python: "Python", javascript: "JavaScript", html: "HTML", css: "CSS", bash: "Terminal", sql: "SQL", json: "JSON", prompt: "Prompt", text: "Text" };

// Poora HTML document ho to waisa hi, warna chhote fragment ko basic page me lapet do
const wrap = (c) =>
  /<html[\s>]/i.test(c)
    ? c
    : `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:system-ui,sans-serif;margin:16px;color:#111;background:#fff;line-height:1.5}</style></head><body>${c}</body></html>`;

export default function CodeBlock({ lang, code, out, outLabel, preview, height = 300 }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); }
    catch {
      const t = document.createElement("textarea");
      t.value = code; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); } catch {}
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="code">
      <div className="code-h">
        <span className="code-l">{LABELS[lang] || lang}</span>
        <button type="button" className="copy" onClick={copy} aria-label={`Copy ${LABELS[lang] || lang} code`}>{copied ? "Copied ✓" : "Copy"}</button>
      </div>
      <pre><code>{code}</code></pre>
      {preview && (
        <div className="out">
          <div className="out-h">Output: live preview</div>
          <iframe title="Live preview of the example" sandbox="allow-scripts" srcDoc={wrap(code)} loading="lazy" style={{ height }} />
        </div>
      )}
      {out && (
        <div className="out">
          <div className="out-h">{outLabel || "Output"}</div>
          <pre><code>{out}</code></pre>
        </div>
      )}
    </div>
  );
}
