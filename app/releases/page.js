import { releases, version } from "../version";

export default function ReleasesPage() {
  return (
    <section className="stack">
      <div className="page-head">
        <p className="kicker">06 版本 · v{version}</p>
        <h1>三次发布，每次只多一件事。</h1>
        <p className="lede">当前页面是 {version}。下面按时间倒序列出已经发出去的版本。</p>
      </div>
      <ol className="list">
        {releases.map((item) => (
          <li className="todo" key={item.version}>
            <strong>v{item.version}</strong>
            <span>
              {item.title}。{item.text}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
