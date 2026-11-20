import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const headingsOf = (blocks) => blocks.filter((b) => b[0] === "h").map((b) => ({ id: slug(b[1]), text: b[1] }));

// `code` aur [text](link) dono support karta hai
function rich(t) {
  return t.split("`").map((part, i) => {
    if (i % 2) return <code key={i}>{part}</code>;
    const out = []; let last = 0; const re = /\[([^\]]+)\]\(([^)]+)\)/g; let m;
    while ((m = re.exec(part))) {
      if (m.index > last) out.push(part.slice(last, m.index));
      const href = m[2];
      out.push(href.startsWith("http") ? <a key={m.index} className="ul2" href={href} target="_blank" rel="noreferrer">{m[1]}</a> : <Link key={m.index} className="ul2" href={href}>{m[1]}</Link>);
      last = m.index + m[0].length;
    }
    if (last < part.length) out.push(part.slice(last));
    return out.length ? <span key={i}>{out}</span> : part;
  });
}

export default function Lesson({ blocks, outs = {} }) {
  return (
    <div className="lesson">
      {blocks.map((b, i) => {
        const [t, a, c, o = {}] = b;
        if (t === "h") return <h2 key={i} id={slug(a)}>{a}</h2>;
        if (t === "p") return <p key={i}>{rich(a)}</p>;
        if (t === "ul") return <ul key={i}>{a.map((x) => <li key={x}>{rich(x)}</li>)}</ul>;
        if (t === "note") return <p key={i} className="callout">{rich(a)}</p>;
        if (t === "task") return <div key={i} className="task"><b>Try it yourself</b><p>{rich(a)}</p></div>;
        if (t === "code") {
          if (o.hide) return null;
          const out = outs[i] || o.out;
          return <CodeBlock key={i} lang={a} code={c} out={out} outLabel={o.outLabel} preview={a === "html" && !o.noPreview} height={o.height} />;
        }
        if (t === "table") return (
          <div key={i} className="tbl"><table>
            <thead><tr>{a.map((x) => <th key={x}>{x}</th>)}</tr></thead>
            <tbody>{c.map((r, k) => <tr key={k}>{r.map((x, m) => <td key={m}>{x}</td>)}</tr>)}</tbody>
          </table></div>
        );
        return null;
      })}
    </div>
  );
}
