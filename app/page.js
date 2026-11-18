import Link from "next/link";

const demos = [
  {
    href: "/palette",
    index: "01",
    title: "调色板",
    text: "拖动色相、饱和度和明度，马上看到配色和十六进制色值。",
  },
  {
    href: "/todos",
    index: "02",
    title: "待办清单",
    text: "加上今天要做的事，勾选或删掉。内容留在这台浏览器里。",
  },
  {
    href: "/echo",
    index: "03",
    title: "回声接口",
    text: "写一句话发给服务端，接口会原样返回，并带上收到的时间。",
  },
  {
    href: "/dice",
    index: "04",
    title: "骰子",
    text: "掷出 1 到 6，页面留下最近五次结果。这是 1.0.0。",
  },
  {
    href: "/timer",
    index: "05",
    title: "倒计时",
    text: "设定 10 到 300 秒，开始、暂停或归零。这是 1.1.0。",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="panel">
          <p className="kicker">Vercel demo</p>
          <h1>1.1.0，给骰子加上倒计时。</h1>
          <p className="lede">
            这是街角实验室。调色、记事和一次真实的接口往返，都放在同一台站点上，用来确认部署已经可以访问。
          </p>
        </div>
        <aside className="ticket">
          <div className="ticket-inner">
            <p className="kicker">今日票根</p>
            <strong>可以点，可以改，可以发出去。</strong>
            <p className="meta">静态页面加一个服务端接口。</p>
          </div>
        </aside>
      </section>
      <section className="grid">
        {demos.map((demo) => (
          <Link className="card" href={demo.href} key={demo.href}>
            <div className="index">{demo.index}</div>
            <h2>{demo.title}</h2>
            <p>{demo.text}</p>
            <span>打开 →</span>
          </Link>
        ))}
      </section>
    </>
  );
}
