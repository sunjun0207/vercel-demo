import "./globals.css";
import Link from "next/link";
import { Fraunces, Outfit } from "next/font/google";
import Nav from "./nav";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "街角实验室",
  description: "跑在 Vercel 上的几个小演示",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className={`${display.variable} ${sans.variable}`}>
        <div className="shell">
          <header className="topbar">
            <Link className="brand" href="/">
              <span className="mark">街</span>
              街角实验室
            </Link>
            <Nav />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
