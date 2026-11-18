"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "首页" },
  { href: "/palette", label: "调色板" },
  { href: "/todos", label: "待办" },
  { href: "/echo", label: "回声" },
  { href: "/dice", label: "骰子" },
  { href: "/timer", label: "倒计时" },
  { href: "/releases", label: "版本" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={pathname === link.href ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
