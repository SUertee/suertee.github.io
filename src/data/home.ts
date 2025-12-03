import { LanguageKey } from "./types";

type Localized<T> = Record<LanguageKey, T>;

export const homeCopy: {
  hero: Localized<{
    headline: string;
    wave: string;
    currently: string;
    currentLocation: string;
    currentRole: string;
    previousTitle: string;
    creator: string;
    arrowLabel: string;
    socials: { label: string; href: string; icon: string }[];
  }>;
  about: Localized<{
    title: string;
    subtitle: string;
    paragraphs: string[];
    facts: string[];
    cta: string;
  }>;
  education: Localized<{
    title: string;
    subtitle: string;
    items: {
      school: string;
      degree: string;
      period: string;
      details: string;
      status: "current" | "past";
    }[];
  }>;
  featuredProjects: Localized<{
    title: string;
    subtitle: string;
    cta: string;
  }>;
} = {
  hero: {
    en: {
      headline: "Hi, I'm Jiacheng Xu",
      wave: "👋",
      currently: "Currently",
      currentLocation: "Studying in University of Sydney",
      currentRole:
        "Final year Bachelor of Advanced Computing student, majoring in Software Development.",
      previousTitle:
        "Previously: AI calendar app · Secure access platform · Project management learning tool.",
      creator:
        "I enjoy building reliable backend services, clean APIs, and web applications with practical AI features.",
      arrowLabel: "Scroll to about section",
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
      currentLocation: "就读于悉尼大学",
      currentRole: "高级计算学士（软件开发方向）在读学生。",
      previousTitle: "曾参与：AI 日历应用、安全访问平台、项目管理学习工具等项目。",
      creator: "喜欢从后端到前端把系统完整搭建起来，并把 LLM 能力融合到实际产品中。",
      arrowLabel: "滑动查看下方内容",
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
  },
  about: {
    en: {
      title: "About me",
      subtitle: "A quick snapshot of who I am and the foundation I'm building on.",
      paragraphs: [
        "I'm Jiacheng (Harry) Xu, a Bachelor of Advanced Computing student at The University of Sydney, majoring in Software Development.",
        "I like building end-to-end products that combine clean backend design, usable frontends, and practical AI features.",
        "I have experience with Java, Python, TypeScript/React, Node.js, PostgreSQL, and testing/CI tools like JUnit, Mockito, Jest, and GitHub Actions.",
      ],
      facts: [
        "Location: Sydney, Australia",
        "Degree: Bachelor of Advanced Computing (2026 expected)",
        "Interests: Photography, hiking, fitness, reading, singing",
      ],
      cta: "Jump to projects",
    },
    zh: {
      title: "关于我",
      subtitle: "我是谁，以及我正在累积的知识与经验。",
      paragraphs: [
        "我是徐嘉成（Harry），悉尼大学高级计算学士（软件开发方向）在读。",
        "喜欢做端到端的产品：既有扎实的后端架构，也有好用的前端体验，并结合 AI 能力。",
        "熟悉 Java、Python、TypeScript/React、Node.js、PostgreSQL，以及 JUnit、Mockito、Jest、GitHub Actions 等测试与 CI 工具。",
      ],
      facts: ["地点：悉尼，澳大利亚", "学位：高级计算学士（预计 2026）", "兴趣：摄影、徒步、健身、阅读、唱歌"],
      cta: "跳到项目",
    },
  },
  education: {
    en: {
      title: "Education",
      subtitle: "Timeline from HSC to my current degree.",
      items: [
        {
          school: "The University of Sydney",
          degree: "Bachelor of Advanced Computing (Software Development)",
          period: "2023 – Present",
          details:
            "Algorithms, software construction, databases, distributed systems, cloud computing, HCI studio.",
          status: "current",
        },
        {
          school: "Sydney High School",
          degree: "HSC (Accelerated Mathematics & Physics)",
          period: "2017 – 2022",
          details:
            "Extension 2 Mathematics, Physics, and Chemistry with a focus on problem solving and scientific communication.",
          status: "past",
        },
      ],
    },
    zh: {
      title: "教育背景",
      subtitle: "从 HSC 到目前本科阶段的时间线。",
      items: [
        {
          school: "悉尼大学",
          degree: "高级计算学士（软件开发方向）",
          period: "2023 – 至今",
          details: "算法、软件构建、数据库、分布式系统、云计算、人机交互工作室等。",
          status: "current",
        },
        {
          school: "悉尼男子高中",
          degree: "HSC（高数与物理加速）",
          period: "2017 – 2022",
          details: "高等数学、物理与化学，强调问题求解与科学表达。",
          status: "past",
        },
      ],
    },
  },
  featuredProjects: {
    en: {
      title: "Projects",
      subtitle: "Selected work that blends AI, backend systems, and product thinking.",
      cta: "View all projects",
    },
    zh: {
      title: "项目",
      subtitle: "结合 AI、后端系统与产品思维的一些作品。",
      cta: "查看全部项目",
    },
  },
} as const;
