"use client";
import { useState } from "react";

export default function Quiz({ items }) {
  const [ans, setAns] = useState({});
  const right = Object.entries(ans).filter(([i, j]) => items[i][2] === j).length;
  return (
    <div className="quiz">
      {items.map(([q, opts, ok, why], i) => {
        const pick = ans[i];
        const done = pick !== undefined;
        return (
          <div key={q} className="qz">
            <p className="qq"><b>{i + 1}.</b> {q}</p>
            <div className="qo">
              {opts.map((o, j) => (
                <button type="button" key={o} disabled={done}
                  className={`qb${done && j === ok ? " ok" : ""}${done && j === pick && j !== ok ? " bad" : ""}`}
                  onClick={() => setAns({ ...ans, [i]: j })}>{o}</button>
              ))}
            </div>
            {done && <p className="qw"><b>{pick === ok ? "Correct. " : "Not quite. "}</b>{why}</p>}
          </div>
        );
      })}
      {Object.keys(ans).length === items.length && <p className="qs">Score: {right} of {items.length}</p>}
    </div>
  );
}
