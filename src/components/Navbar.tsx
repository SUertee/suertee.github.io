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
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm text-neutral-100">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            aria-label="Toggle language"
          >
            {language === "en" ? "中文" : "EN"}
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-sm transition hover:border-white/30 hover:bg-white/10"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold text-black">
              HX
            </span>
            <span>Harry Xu</span>
          </Link>
        </div>

        <div className="flex gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "rounded-full px-4 py-2 text-sm transition " +
                  (active
                    ? "bg-white text-black"
                    : "text-neutral-200 hover:bg-white/10 hover:text-white")
                }
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
