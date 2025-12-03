// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "#contact", key: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();

  const labels =
    language === "en"
      ? { projects: "Projects", about: "About", contact: "Contact" }
      : { projects: "项目", about: "关于", contact: "联系" };

  return (
    <header className="site-header">
      <nav className="site-nav">
        <div className="nav-left">
          <button
            type="button"
            onClick={toggleLanguage}
            className="lang-toggle"
            aria-label="Toggle language"
          >
            {language === "en" ? "中文" : "EN"}
          </button>

          <Link href="/" className="brand-pill">
            <span className="brand-avatar">HX</span>
            <span>Harry Xu</span>
          </Link>
        </div>

        <div className="nav-links">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={"nav-link " + (active ? "nav-link--active" : "")}
              >
                {labels[item.key as keyof typeof labels]}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
