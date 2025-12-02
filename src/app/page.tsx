"use client";

import { useLanguage } from "@/context/LanguageContext";

const copy = {
  en: {
    headline: "Hi, I'm Harry Xu",
    wave: "👋",
    currently: "Currently",
    currentCompany: "University of Sydney",
    currentRole:
      "Final year Bachelor of Advanced Computing student, majoring in Software Development.",
    currentStatus: "Open to internships and full-time opportunities",
    previousTitle:
      "Previously: AI calendar app · Secure access platform · Project management learning tool",
    // network:
    //   "Community builder with 3000+ students & developers networked through events and meetups.",
    creator:
      "Creator of side projects that blend Java backends, TypeScript frontends, and LLM features.",
    socials: [
      { label: "GitHub", href: "https://github.com/suertee", icon: "🐙" },
      {
        label: "LinkedIn",
        href: "",
        icon: "💼",
      },
      { label: "Twitter", href: "", icon: "🐦" },
      { label: "Email", href: "", icon: "✉️" },
    ],
  },
  zh: {
    headline: "你好，我是徐嘉成",
    wave: "👋",
    currently: "目前在做",
    currentCompany: "悉尼大学",
    currentRole: "悉尼大学高级计算学士（软件开发方向）三年级学生。",
    urrentStatus: "寻找实习与全职机会",
    previousTitle: "曾构建：AI 日历应用、安全访问平台、项目管理学习工具等。",
    creator: "喜欢把 Java 后端、TS 前端和 LLM 能力结合，做落地的小工具与产品。",
    socials: [
      { label: "GitHub", href: "https://github.com/suertee", icon: "🐙" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/your-profile",
        icon: "💼",
      },
      { label: "Twitter", href: "https://x.com", icon: "🐦" },
      { label: "邮箱", href: "mailto:hello@harryxu.dev", icon: "✉️" },
    ],
  },
};

export default function HomePage() {
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#080b15] via-[#0a0f24] to-black px-4 pb-16 pt-28 text-neutral-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-indigo-500/30 blur-[100px]" />
        <div className="absolute right-1/5 top-40 h-80 w-80 rounded-full bg-cyan-400/25 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10">
        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.25em] text-indigo-200">
            {language === "en" ? "Portfolio" : "作品集"}
          </p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            {content.headline}{" "}
            <span className="inline-block text-3xl md:text-4xl">
              {content.wave}
            </span>
          </h1>
        </div>

        <div className="space-y-3 text-base text-neutral-200 md:text-lg">
          <p className="flex items-center gap-2 font-semibold text-white">
            <span className="text-lg">🚀</span>
            <span>{content.currently}</span>
          </p>
          <p className="text-neutral-100">{content.currentRole}</p>
          <p className="text-indigo-200">{content.currentCompany}</p>
          <p className="text-sm text-neutral-300">{content.previousTitle}</p>
        </div>

        <div className="space-y-2 text-sm text-neutral-200 md:text-base">
          {/* <p>{content.network}</p> */}
          <p>{content.creator}</p>
        </div>

        <div
          id="contact"
          className="flex flex-wrap items-center gap-3 pt-2 text-sm text-neutral-100"
        >
          {content.socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 transition hover:border-white/30 hover:bg-white/10"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
