"use client";

import { useLanguage } from "@/context/LanguageContext";

const copy = {
  en: {
    headline: "Hi, I'm Jiacheng Xu",
    wave: "👋",
    currently: "Currently",
    currentCompany: "University of Sydney",
    currentLocation: "Studying in University of Sydney",
    currentRole:
      "Final year Bachelor of Advanced Computing student, majoring in Software Development.",
    currentStatus: "Open to internships and full-time opportunities",
    previousTitle:
      "Previously: AI calendar app · Secure access platform · Project management learning tool",
    creator:
      "Creator of side projects that blend Java backends, TypeScript frontends, and LLM features.",
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/suertee",
        icon: "/icons/github.svg",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jiacheng-xu-12316424b/",
        icon: "/icons/linkedin.svg",
      },
      {
        label: "Email",
        href: "mailto:suerte.668@gmail.com",
        icon: "/icons/email.svg",
      },
    ],
  },
  zh: {
    headline: "你好，我是徐嘉成",
    wave: "👋",
    currently: "目前在做",
    currentCompany: "悉尼大学",
    currentLocation: "就读于悉尼大学",
    currentRole: "高级计算学士（软件开发方向）在读学生。",
    currentStatus: "寻找实习与全职机会",
    previousTitle: "曾构建：AI 日历应用、安全访问平台、项目管理学习工具等。",
    creator: "喜欢把 Java 后端、TS 前端和 LLM 能力结合，做落地的小工具与产品。",
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/suertee",
        icon: "/icons/github.svg",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jiacheng-xu-12316424b/",
        icon: "/icons/linkedin.svg",
      },
      {
        label: "邮箱",
        href: "mailto:suerte.668@gmail.com",
        icon: "/icons/email.svg",
      },
    ],
  },
} as const;

export default function HomePage() {
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <section className="hero-section">
      {/* Background glows */}
      <div className="hero-bg">
        <div className="hero-bg-orb hero-bg-orb--left" />
        <div className="hero-bg-orb hero-bg-orb--right" />
        <div className="hero-bg-radial" />
        <div className="hero-bg-fade" />
      </div>

      {/* Main card */}
      <div className="hero-card">
        <header className="hero-header">
          <h1 className="hero-title">
            {content.headline} <span className="hero-wave">{content.wave}</span>
          </h1>
        </header>

        <div className="hero-meta">
          <div className="hero-meta-row">
            <div className="hero-current">
              <span className="hero-rocket">🚀</span>
              <span>{content.currently}</span>
            </div>
            <div className="hero-location">{content.currentLocation}</div>
          </div>

          <p className="hero-role">{content.currentRole}</p>
          <p className="hero-previous">{content.previousTitle}</p>
        </div>

        <p className="hero-creator">{content.creator}</p>

        <div id="contact" className="hero-socials">
          {content.socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="hero-social-pill"
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.label}
                  className="hero-social-icon"
                />
              )}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
