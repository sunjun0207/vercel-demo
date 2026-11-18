"use client";

import { useEffect, useState } from "react";

const storageKey = "vercel-demo-todos";

export default function TodosPage() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, ready]);

  function addItem(event) {
    event.preventDefault();
    const title = text.trim();
    if (!title) return;
    setItems((current) => [
      { id: crypto.randomUUID(), title, done: false },
      ...current,
    ]);
    setText("");
  }

  const remaining = items.filter((item) => !item.done).length;

  return (
    <section className="stack">
      <div className="page-head">
        <p className="kicker">02 待办</p>
        <h1>先记下来，再划掉。</h1>
        <p className="lede">这些待办只保存在当前浏览器，刷新后还在。</p>
      </div>
      <form className="row" onSubmit={addItem}>
        <input
          type="text"
          value={text}
          maxLength={80}
          placeholder="例如：把演示链接发给同事"
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">添加</button>
      </form>
      <p className="meta">
        {items.length === 0 ? "还没有事项" : `还剩 ${remaining} 项未完成`}
      </p>
      {items.length === 0 ? (
        <div className="panel empty">写下一件今天要做的事。</div>
      ) : (
        <ul className="list">
          {items.map((item) => (
            <li className={item.done ? "todo done" : "todo"} key={item.id}>
              <input
                type="checkbox"
                checked={item.done}
                aria-label={`完成：${item.title}`}
                onChange={() =>
                  setItems((current) =>
                    current.map((entry) =>
                      entry.id === item.id ? { ...entry, done: !entry.done } : entry
                    )
                  )
                }
              />
              <span>{item.title}</span>
              <button
                className="ghost"
                type="button"
                onClick={() =>
                  setItems((current) => current.filter((entry) => entry.id !== item.id))
                }
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
