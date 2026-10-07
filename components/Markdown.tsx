import type { ReactNode } from "react";

// Chhota dependency-free markdown renderer: bold, italic, `code`, links, lists, headings, code blocks.
// HTML kabhi inject nahi hota (sirf React elements), isliye AI ke output se XSS ka darr nahi.
const INLINE = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)|(\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = new RegExp(INLINE.source, "g");
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    const key = out.length;
    if (m[1]) out.push(<code key={key} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-cyan-200">{t.slice(1, -1)}</code>);
    else if (m[2]) out.push(<strong key={key} className="font-semibold text-white">{inline(t.slice(2, -2))}</strong>);
    else if (m[3]) out.push(<em key={key}>{inline(t.slice(1, -1))}</em>);
    else {
      const link = t.match(/^\[([^\]]+)\]\((.+)\)$/)!;
      out.push(<a key={key} href={link[2]} target="_blank" rel="noreferrer" className="text-cyan-300 underline underline-offset-4">{link[1]}</a>);
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const isFence = (l: string) => l.trim().startsWith("```");
const isHead = (l: string) => /^#{1,6}\s+/.test(l);
const isList = (l: string) => /^\s*[*-]\s+/.test(l);
const isNum = (l: string) => /^\s*\d+[.)]\s+/.test(l);

export default function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r/g, "").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const key = blocks.length;
    if (!line.trim()) { i++; continue; }
    if (isFence(line)) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !isFence(lines[i])) code.push(lines[i++]);
      i++; // closing fence
      blocks.push(<pre key={key} className="overflow-x-auto rounded-lg bg-white/5 p-3 font-mono text-xs leading-relaxed text-white/90"><code>{code.join("\n")}</code></pre>);
    } else if (isHead(line)) {
      blocks.push(<p key={key} className="font-semibold text-white">{inline(line.replace(/^#{1,6}\s+/, ""))}</p>);
      i++;
    } else if (isList(line) || isNum(line)) {
      const ordered = isNum(line);
      const test = ordered ? isNum : isList;
      const items: string[] = [];
      while (i < lines.length && test(lines[i])) items.push(lines[i++].replace(/^\s*(?:[*-]|\d+[.)])\s+/, ""));
      const Tag = ordered ? "ol" : "ul";
      blocks.push(
        <Tag key={key} className={`space-y-1 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>
          {items.map((it, n) => <li key={n}>{inline(it)}</li>)}
        </Tag>
      );
    } else {
      const para: string[] = [];
      while (i < lines.length && lines[i].trim() && !isFence(lines[i]) && !isHead(lines[i]) && !isList(lines[i]) && !isNum(lines[i])) para.push(lines[i++]);
      blocks.push(<p key={key} className="whitespace-pre-wrap">{inline(para.join("\n"))}</p>);
    }
  }
  return <div className="space-y-3">{blocks}</div>;
}
