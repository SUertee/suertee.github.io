// data/projects.ts

export type Project = {
  id: string
  name: string
  role: string
  period: string
  techStack: string[]
  shortDescription: string
  highlights: string[]
  link?: string
}

export const projects: Project[] = [
  {
    id: "ai-game",
    name: "AI Game-based Project Management Learning Platform",
    role: "Full Stack Developer & AI Tester",
    period: "Aug 2025 – Oct 2025",
    techStack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Supabase", "Ollama", "Docker"],
    shortDescription:
      "AI-driven project-management learning game with role-based personas and automated feedback.",
    highlights: [
      "Built a 4-layer architecture (React/Vite, Express backend, Supabase PostgreSQL, Ollama AI layer).",
      "Implemented persona-based AI teammate chat and automated task evaluation using local LLM.",
      "Designed normalised PostgreSQL schema and used Dockerised Postgres for end-to-end API testing."
    ],
    link: "https://github.com/your-username/ai-game" // TODO: 换成真实链接或先删掉
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
      "Built React calendar UI and Node.js APIs, reducing planning time by ~45%."
    ]
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
      "Set up GitHub-based CI/CD and managed sprints and acceptance criteria in Jira."
    ]
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
      "Performed PACT analysis, card sorting, low-fidelity prototyping, and usability testing."
    ]
  }
]
