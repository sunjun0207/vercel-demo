"use client";

import { useState } from "react";

const faces = ["一", "二", "三", "四", "五", "六"];

export default function DicePage() {
  const [value, setValue] = useState(1);
  const [history, setHistory] = useState([]);

  function roll() {
    const next = Math.floor(Math.random() * 6) + 1;
    setValue(next);
    setHistory((current) => [next, ...current].slice(0, 5));
  }

  return (
    <section className="stack">
      <div className="page-head">
        <p className="kicker">04 骰子 · v1.0.0</p>
        <h1>掷一下，看看几点。</h1>
      </div>
      <div className="panel stack">
        <div className="preview dice-face">
          <strong>{faces[value - 1]}</strong>
        </div>
        <div className="row">
          <button type="button" onClick={roll}>
            掷骰子
          </button>
          <p className="meta">当前点数 {value}</p>
        </div>
        <p className="meta">
          {history.length === 0 ? "还没有记录" : `最近：${history.join("、")}`}
        </p>
      </div>
    </section>
  );
}
