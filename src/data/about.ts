import { LanguageKey } from "./types";

type Localized<T> = Record<LanguageKey, T>;

export const aboutCopy: Localized<{
  title: string;
  intro: string[];
  factsTitle: string;
  facts: string[];
}> = {
  en: {
    title: "About me",
    intro: [
      "I'm Harry Xu, a third-year Bachelor of Advanced Computing student at the University of Sydney, majoring in Software Development.",
      "I enjoy building end-to-end solutions that combine clean backend design, usable frontends, and practical AI features.",
      "Recently, I've been working on an AI-driven project management learning platform, an AI calendar web app powered by LLaMA, and a secure virtual access control system using Java Spring Boot.",
      "I'm comfortable working with Java, Python, JavaScript/TypeScript, React, Node.js, PostgreSQL, and testing/CI tools like JUnit, Mockito, Jest, and GitHub Actions. I enjoy collaborating in agile teams and learning from real-world feedback.",
    ],
    factsTitle: "Quick facts",
    facts: [
      "Location: Sydney, Australia",
      "Degree: Bachelor of Advanced Computing (2026 expected)",
      "Interests: Photography, hiking, fitness, reading, singing",
    ],
  },
  zh: {
    title: "关于我",
    intro: [
      "我是徐嘉成（Harry），悉尼大学高级计算学士（软件开发方向）三年级在读。",
      "我喜欢从后端到前端完成端到端的解决方案，兼顾干净的后端设计、好用的前端体验和实用的 AI 能力。",
      "最近在做 AI 驱动的项目管理学习平台、基于 LLaMA 的 AI 日历应用，以及用 Java Spring Boot 的安全访问控制系统。",
      "熟悉 Java、Python、JavaScript/TypeScript、React、Node.js、PostgreSQL，以及 JUnit、Mockito、Jest、GitHub Actions 等测试/CI 工具，喜欢在敏捷团队中合作并从真实反馈中快速迭代。",
    ],
    factsTitle: "快速信息",
    facts: ["地点：悉尼，澳大利亚", "学位：高级计算学士（预计 2026）", "兴趣：摄影、徒步、健身、阅读、唱歌"],
  },
};
