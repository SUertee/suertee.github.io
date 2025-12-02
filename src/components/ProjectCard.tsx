// components/ProjectCard.tsx
import { Project } from "@/data/projects";

type Props = {
  project: Project;
  compact?: boolean;
};

export default function ProjectCard({ project, compact }: Props) {
  return (
    <div className="group rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-neutral-50">
          {project.name}
        </h3>
        <span className="text-xs text-neutral-400">{project.period}</span>
      </div>
      <p className="mt-1 text-xs text-indigo-300">{project.role}</p>

      <p className="mt-2 text-sm text-neutral-300">
        {project.shortDescription}
      </p>

      <div className="mt-3 flex flex-wrap gap-1">
        {project.techStack.slice(0, compact ? 4 : 8).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-neutral-800 px-2 py-0.5 text-[11px] text-neutral-200"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 8 && !compact && (
          <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-[11px] text-neutral-400">
            +{project.techStack.length - 8} more
          </span>
        )}
      </div>

      {!compact && (
        <ul className="mt-3 space-y-1.5 text-sm text-neutral-300">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1 h-[6px] w-[6px] flex-shrink-0 rounded-full bg-indigo-400" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-xs font-medium text-indigo-300 hover:text-indigo-200"
        >
          View on GitHub →
        </a>
      )}
    </div>
  );
}
