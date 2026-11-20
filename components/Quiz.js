"use client";
import { useEffect, useState } from "react";
import { saveQuiz } from "@/components/Progress";

export default function Quiz({ items, course, chapter }) {
  const [ans, setAns] = useState({});
  const right = Object.entries(ans).filter(([i, j]) => items[i][2] === j).length;
  const finished = Object.keys(ans).length === items.length;
  useEffect(() => { if (finished) saveQuiz(course, chapter, right, items.length); }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="quiz" id="quiz">
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
      {finished && (
        <p className="qs">Score: {right} of {items.length} <button type="button" className="linkbtn" onClick={() => setAns({})}>Try again</button></p>
      )}
    </div>
  );
}
