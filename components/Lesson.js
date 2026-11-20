// `backtick` wale hisse ko inline code bana deta hai
const rich = (t) => t.split("`").map((s, i) => (i % 2 ? <code key={i}>{s}</code> : s));

export default function Lesson({ blocks }) {
  return (
    <div className="lesson">
      {blocks.map(([t, a, c], i) => {
        if (t === "h") return <h2 key={i}>{a}</h2>;
        if (t === "p") return <p key={i}>{rich(a)}</p>;
        if (t === "ul") return <ul key={i}>{a.map((x) => <li key={x}>{rich(x)}</li>)}</ul>;
        if (t === "note") return <p key={i} className="callout">{rich(a)}</p>;
        if (t === "task") return <div key={i} className="task"><b>Try it yourself</b><p>{rich(a)}</p></div>;
        if (t === "code") return <div key={i} className="code"><span className="code-l">{a}</span><pre><code>{c}</code></pre></div>;
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
