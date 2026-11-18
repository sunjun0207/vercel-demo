"use client";

import { useEffect, useState } from "react";

export default function TimerPage() {
  const [seconds, setSeconds] = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");

  return (
    <section className="stack">
      <div className="page-head">
        <p className="kicker">05 倒计时 · v1.1.0</p>
        <h1>给这件事留一点时间。</h1>
      </div>
      <div className="panel stack">
        <div className="preview">
          <strong>
            {minutes}:{secs}
          </strong>
        </div>
        <label className="slider">
          设定 {seconds} 秒
          <input
            type="range"
            min="10"
            max="300"
            step="10"
            value={seconds}
            disabled={running}
            onChange={(event) => {
              const next = Number(event.target.value);
              setSeconds(next);
              setRemaining(next);
            }}
          />
        </label>
        <div className="row">
          <button type="button" onClick={() => setRunning((current) => !current)} disabled={remaining === 0}>
            {running ? "暂停" : "开始"}
          </button>
          <button
            className="ghost"
            type="button"
            onClick={() => {
              setRunning(false);
              setRemaining(seconds);
            }}
          >
            归零
          </button>
        </div>
      </div>
    </section>
  );
}
