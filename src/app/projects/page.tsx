"use client";

import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";
import { projects, localizeProject, projectsCopy } from "@/data/projects";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const copy = projectsCopy[language];

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-50">{copy.title}</h1>
        <p className="max-w-2xl text-sm text-neutral-300">{copy.intro}</p>
      </header>

      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={localizeProject(project, language)}
          />
        ))}
      </div>
    </div>
  );
}
