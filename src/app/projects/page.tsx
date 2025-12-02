// app/projects/page.tsx
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-50">Projects</h1>
        <p className="max-w-2xl text-sm text-neutral-300">
          Academic and personal projects covering full-stack web applications,
          and AI-powered systems.
        </p>
      </header>

      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
