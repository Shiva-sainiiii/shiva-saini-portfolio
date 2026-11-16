// Native <details>: JS ki zaroorat nahi, Google ko poora text HTML me milta hai.
export default function Faq({ items }) {
  return (
    <div className="faq">
      {items.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
    </div>
  );
}
