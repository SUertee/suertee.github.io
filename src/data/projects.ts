// data/projects.ts
import { LanguageKey } from "./types";

export type Project = {
  id: string;
  name: string;
  role: string;
  period: string;
  techStack: string[];
  shortDescription: string;
  highlights: string[];
  link?: string;
  bookmarkLabel?: string;
  accent?: string;
  mediaType?: "image" | "video";
  mediaLabel?: string;
  mediaSrc?: string;
  mediaPoster?: string;
};

type Localized<T> = Record<LanguageKey, T>;

export const projects: Project[] = [
  {
    id: "ai-game",
    name: "AI Game-based Project Management Learning Platform",
    role: "Full Stack Developer & AI Tester",
    period: "Aug 2025 – Oct 2025",
    techStack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "Ollama",
      "Docker",
    ],
    shortDescription:
      "AI-driven project-management learning game with role-based personas and automated feedback.",
    highlights: [
      "Built a 4-layer architecture (React/Vite, Express backend, Supabase PostgreSQL, Ollama AI layer).",
      "Implemented persona-based AI teammate chat and automated task evaluation using local LLM.",
      "Designed normalised PostgreSQL schema and used Dockerised Postgres for end-to-end API testing.",
    ],
    link: "https://github.com/SUertee/AI-Game-Based-PM-Learning-Platform",
    bookmarkLabel: "AI Game",
    accent: "#a78bfa",
    mediaType: "video",
    mediaLabel: "Gameplay & evaluation walkthrough",
  },
  {
    id: "ai-calendar",
    name: "AI Calendar Web App",
    role: "Team Leader & Full Stack Developer",
    period: "Aug 2024 – Feb 2025",
    techStack: ["React", "Node.js", "LLaMA 3.2", "PostgreSQL"],
    shortDescription:
      "AI-powered personal scheduling engine that adapts plans based on user behaviour.",
    highlights: [
      "Designed a LLaMA 3.2-based scheduling engine for adaptive daily plans.",
      "Conducted 420+ interviews/surveys to produce URS/SRS and architecture diagrams.",
      "Built React calendar UI and Node.js APIs, reducing planning time by ~45%.",
    ],
    link: "", // No link provided
    bookmarkLabel: "AI Calendar",
    accent: "#34d399",
    mediaType: "image",
    mediaLabel: "Adaptive planner mock",
  },
  {
    id: "vsas",
    name: "Virtual Scroll Access System (VSAS)",
    role: "Full Stack Developer & System Tester",
    period: "Jul 2024 – Oct 2024",
    techStack: ["Java", "Spring Boot", "Django", "SQLite", "JUnit", "Mockito"],
    shortDescription:
      "Secure access-control system with RBAC and modular MVC architecture.",
    highlights: [
      "Implemented RBAC, session management, and REST API integration between Spring Boot and Django.",
      "Achieved 90%+ statement & branch coverage using JUnit + Mockito.",
      "Set up GitHub-based CI/CD and managed sprints and acceptance criteria in Jira.",
    ],
    link: "https://github.com/SUertee/Virtual-Scroll-Access-System",
    bookmarkLabel: "VSAS",
    accent: "#60a5fa",
    mediaType: "image",
    mediaLabel: "Access control dashboard",
  },
  {
    id: "chat-room",
    name: "Secure Chat Room Web App",
    role: "Team Leader & Full Stack Developer",
    period: "Apr 2024 – Jun 2024",
    techStack: ["Flask", "JavaScript", "JWT", "AES-GCM", "HTTPS"],
    shortDescription:
      "Secure messaging system with real-time features and accessibility in mind.",
    highlights: [
      "Implemented SHA-256 + salt password hashing, JWT auth, AES-GCM encryption and HTTPS with TLS.",
      "Added friend requests, multi-user chatrooms, persistent history, and role-based access control.",
      "Performed PACT analysis, card sorting, low-fidelity prototyping, and usability testing.",
    ],
    link: "https://github.com/SUertee/Chat_Room_Web_App",
    bookmarkLabel: "Chat Room",
    accent: "#f472b6",
    mediaType: "video",
    mediaLabel: "Secure messaging flow",
  },
];

export const projectsCopy: Localized<{
  title: string;
  intro: string;
}> = {
  en: {
    title: "Projects",
    intro:
      "Academic and personal projects covering full-stack web applications, and AI-powered systems.",
  },
  zh: {
    title: "项目",
    intro: "涵盖全栈 Web 应用和 AI 驱动系统的学术与个人项目。",
  },
};

type ProjectCopy = Partial<
  Pick<
    Project,
    "name" | "role" | "period" | "shortDescription" | "highlights" | "bookmarkLabel"
  >
>;

const projectOverrides: Record<
  string,
  Partial<Record<LanguageKey, ProjectCopy>>
> = {
  "ai-game": {
    zh: {
      name: "AI 游戏化项目管理学习平台",
      role: "全栈开发 & AI 测试",
      bookmarkLabel: "AI 游戏",
      shortDescription:
        "用 AI 人设队友和自动化评估机制，做成游戏方式的项目管理学习平台。",
      highlights: [
        "搭建 React/Vite + Express + Supabase PostgreSQL + Ollama 四层架构。",
        "实现人设化的 AI 队友聊天与本地 LLM 的自动任务评估。",
        "设计规范化 PostgreSQL 表结构，并用 Docker 化 Postgres 做端到端 API 测试。",
      ],
    },
  },
  "ai-calendar": {
    zh: {
      name: "AI 日历 Web 应用",
      role: "组长 & 全栈开发",
      bookmarkLabel: "AI 日历",
      shortDescription:
        "自适应调度引擎，依据用户行为动态调整计划，大幅减少排班时间。",
      highlights: [
        "设计基于 LLaMA 3.2 的调度引擎，生成可适应的日程计划。",
        "进行 420+ 调研与访谈，产出 URS/SRS 与架构图。",
        "搭建 React 日历 UI 与 Node.js API，使规划时间减少约 45%。",
      ],
    },
  },
  vsas: {
    zh: {
      name: "VSAS 虚拟滚动访问控制系统",
      role: "全栈开发 & 系统测试",
      bookmarkLabel: "VSAS",
      shortDescription:
        "具备 RBAC、REST 集成与高测试覆盖率的安全访问控制平台。",
      highlights: [
        "实现 RBAC、会话管理，并在 Spring Boot 与 Django 间进行 REST 集成。",
        "使用 JUnit + Mockito 实现 90%+ 语句与分支覆盖率。",
        "搭建 GitHub CI/CD，并在 Jira 中管理冲刺与验收标准。",
      ],
    },
  },
  "chat-room": {
    zh: {
      name: "安全聊天室 Web 应用",
      role: "组长 & 全栈开发",
      bookmarkLabel: "聊天室",
      shortDescription: "具备实时功能与可访问性的安全消息系统。",
      highlights: [
        "实现 SHA-256+Salt 密码哈希、JWT 认证、AES-GCM 加密以及 HTTPS/TLS。",
        "增加好友请求、多用户聊天室、历史记录、基于角色的访问控制等功能。",
        "进行 PACT 分析、卡片分类、低保真原型设计和可用性测试。",
      ],
    },
  },
};

export function localizeProject(
  project: Project,
  language: LanguageKey
): Project {
  const overrides = projectOverrides[project.id]?.[language];
  if (!overrides) return project;
  return {
    ...project,
    ...overrides,
  };
}
