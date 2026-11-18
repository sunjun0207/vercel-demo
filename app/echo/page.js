"use client";

import { useState } from "react";

export default function EchoPage() {
  const [text, setText] = useState("你好，Vercel。");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/echo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!response.ok) {
        setResult(null);
        setError(data.error || "接口没有成功返回");
      } else {
        setResult(data);
      }
    } catch {
      setResult(null);
      setError("没有连上接口");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="stack">
      <div className="page-head">
        <p className="kicker">03 回声</p>
        <h1>把一句话送到服务端。</h1>
        <p className="lede">提交后会请求 /api/echo，页面展示接口返回的原文、字数和收到时间。</p>
      </div>
      <form className="stack" onSubmit={submit}>
        <textarea
          value={text}
          maxLength={280}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="row">
          <button type="submit" disabled={pending}>
            {pending ? "发送中…" : "发送"}
          </button>
          <p className="meta">{text.trim().length} / 280</p>
        </div>
      </form>
      {error ? <pre className="result error">{error}</pre> : null}
      {result ? <pre className="result">{JSON.stringify(result, null, 2)}</pre> : null}
    </section>
  );
}
