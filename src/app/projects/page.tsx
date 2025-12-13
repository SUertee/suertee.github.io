"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { ScatterView } from "@/components/projects/ScatterView";
import { TimelineView } from "@/components/projects/TimelineView";
import { useLanguage } from "@/context/LanguageContext";
import {
  Project,
  localizeProject,
  projects,
  projectsCopy,
} from "@/data/projects";

const fallbackAccent = "#8b5cf6";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const localizedProjects = useMemo(
    () => projects.map((p) => localizeProject(p, language)),
    [language]
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stageReady, setStageReady] = useState(false);
  const [viewMode, setViewMode] = useState<"scatter" | "timeline">("scatter");
  const detailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!localizedProjects.some((p) => p.id === selectedId)) {
      setSelectedId(null);
    }
  }, [localizedProjects, selectedId]);

  useEffect(() => {
    const timer = setTimeout(() => setStageReady(true), 80);
    return () => clearTimeout(timer);
  }, []);

  if (!localizedProjects.length) return null;

  const handlePick = (project: Project) => {
    setSelectedId(project.id);
    requestAnimationFrame(() => {
      if (detailRef.current) {
        detailRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  const selectedProject = selectedId
    ? localizedProjects.find((p) => p.id === selectedId) ?? null
    : null;
  const copy = projectsCopy[language];
  const accent = selectedProject?.accent ?? fallbackAccent;

  return (
    <div className={`projects-page ${stageReady ? "is-mounted" : ""}`}>
      <header
        className="projects-header reveal-block"
        style={{ ["--reveal-delay" as string]: "0ms" }}
      >
        <div className="projects-lede">
          <p className="projects-kicker">Projects</p>
          <h1 className="projects-title">{copy.title}</h1>
          <p className="projects-intro">{copy.intro}</p>
        </div>
      </header>

      <section
        className={`projects-folder reveal-block ${
          viewMode === "timeline" ? "is-timeline-entry" : ""
        }`}
        style={{ ["--reveal-delay" as string]: "140ms" }}
      >
        <div className="view-toggle">
          <button
            type="button"
            className={
              viewMode === "scatter"
                ? "view-toggle-btn is-active"
                : "view-toggle-btn"
            }
            onClick={() => setViewMode("scatter")}
          >
            {language === "en" ? "Scatter" : "散开视图"}
          </button>
          <button
            type="button"
            className={
              viewMode === "timeline"
                ? "view-toggle-btn is-active"
                : "view-toggle-btn"
            }
            onClick={() => setViewMode("timeline")}
          >
            {language === "en" ? "Timeline" : "时间线"}
          </button>
        </div>

        {viewMode === "scatter" ? (
          <ScatterView
            projects={localizedProjects}
            selectedId={selectedId}
            onSelect={handlePick}
            stageReady={stageReady}
            fallbackAccent={fallbackAccent}
          />
        ) : (
          <TimelineView
            projects={localizedProjects}
            selectedId={selectedId}
            onSelect={handlePick}
            fallbackAccent={fallbackAccent}
          />
        )}
      </section>

      {selectedProject && (
        <section
          className="project-showcase is-visible reveal-block"
          style={
            {
              ["--project-accent" as string]: accent,
              ["--reveal-delay" as string]: "280ms",
            } as CSSProperties
          }
          ref={detailRef}
        >
          <div className="project-copy is-visible">
            <div className="project-selected-pill">
              {language === "en" ? "Selected project" : "已选择项目"}
            </div>
            <p className="project-meta">
              {selectedProject.period} · {selectedProject.role}
            </p>
            <h2 className="project-headline">{selectedProject.name}</h2>
            <p className="project-description">
              {selectedProject.shortDescription}
            </p>

            <ul className="project-highlights">
              {selectedProject.highlights.map((highlight, idx) => (
                <li key={idx} className="project-highlight">
                  <span className="project-highlight-dot" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="project-links">
              <div className="project-tags">
                {selectedProject.techStack.slice(0, 6).map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  {language === "en" ? "View on GitHub →" : "前往 GitHub →"}
                </a>
              )}
            </div>
          </div>

          <div className="project-media is-visible">
            <div className="project-media-frame">
              <div className="project-media-header">
                <span className="project-media-pill">
                  {selectedProject?.mediaType === "video"
                    ? language === "en"
                      ? "Project video"
                      : "项目视频"
                    : language === "en"
                    ? "Project image"
                    : "项目图片"}
                </span>
                <span className="project-media-label">
                  {selectedProject?.mediaLabel ??
                    selectedProject?.name ??
                    (language === "en" ? "Select a project" : "请选择项目")}
                </span>
              </div>

              <div className="project-media-display">
                {selectedProject?.mediaType === "video" &&
                selectedProject.mediaSrc ? (
                  <video
                    className="project-media-asset"
                    src={selectedProject.mediaSrc}
                    poster={selectedProject.mediaPoster}
                    controls
                    playsInline
                    loop
                    muted
                  />
                ) : selectedProject?.mediaSrc ? (
                  <img
                    className="project-media-asset"
                    src={selectedProject.mediaSrc}
                    alt={selectedProject.mediaLabel ?? selectedProject.name}
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="media-window">
                      <div className="media-play">
                        <span>▶</span>
                      </div>
                      <div className="media-bars">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                    <div className="media-pip">
                      <span />
                      <span />
                    </div>
                  </>
                )}
              </div>

              <p className="project-media-caption">
                {selectedProject?.mediaLabel ??
                  selectedProject?.shortDescription ??
                  (language === "en"
                    ? "Choose a project to preview its image or video."
                    : "选择一个项目以预览图片或视频。")}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
