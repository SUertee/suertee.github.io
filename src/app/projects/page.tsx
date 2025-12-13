"use client";

import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  projects,
  localizeProject,
  projectsCopy,
  Project,
} from "@/data/projects";

type ScatterLayout = { x: number; y: number; rotate: number };
type DragOffset = { x: number; y: number };

const scatterLayouts: ScatterLayout[] = [
  { x: -180, y: -120, rotate: -8 },
  { x: -50, y: -20, rotate: -3 },
  { x: 220, y: -90, rotate: 6 },
  { x: -150, y: 90, rotate: 5 },
];

const stackOffsets = [-4, -2, 2, 6, -6];
const fallbackAccent = "#8b5cf6";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthMap: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

export default function ProjectsPage() {
  const { language } = useLanguage();
  const localizedProjects = useMemo(
    () => projects.map((p) => localizeProject(p, language)),
    [language]
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isUnpacked, setIsUnpacked] = useState(false);
  const [stageReady, setStageReady] = useState(false);
  const [hasDealt, setHasDealt] = useState(false);
  const [viewMode, setViewMode] = useState<"scatter" | "timeline">("scatter");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scatterScale, setScatterScale] = useState(1);
  const [dragOffsets, setDragOffsets] = useState<Record<string, DragOffset>>(
    {}
  );
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineScrollRaf = useRef<number | null>(null);
  const timelineInterruptedRef = useRef(false);
  const dragState = useRef<{
    id: string | null;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  }>({
    id: null,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  });
  const isDraggingRef = useRef(false);
  const skipClickRef = useRef(false);
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

  useEffect(() => {
    const openTimer = setTimeout(() => setIsUnpacked(true), 180);
    return () => clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    const computeScale = () => {
      const w = window.innerWidth;
      if (w < 480) return 0.6;
      if (w < 640) return 0.7;
      if (w < 820) return 0.8;
      if (w < 1024) return 0.9;
      return 1;
    };
    const handler = () => setScatterScale(computeScale());
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const current = dragState.current;
      if (!current.id) return;
      const deltaX = e.clientX - current.startX;
      const deltaY = e.clientY - current.startY;
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        isDraggingRef.current = true;
      }
      setDragOffsets((prev) => ({
        ...prev,
        [current.id as string]: {
          x: current.baseX + deltaX,
          y: current.baseY + deltaY,
        },
      }));
    };

    const handleUp = () => {
      if (isDraggingRef.current) {
        skipClickRef.current = true;
      }
      isDraggingRef.current = false;
      dragState.current.id = null;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  if (!localizedProjects.length) return null;

  const monthIndexFromPeriod = (period?: string, takeEnd = false) => {
    if (!period) return null;
    const parts = period.split("–").map((p) => p.trim());
    const target = takeEnd && parts[1] ? parts[1] : parts[0];
    const [mon, yr] = target.split(/\s+/);
    const month = monthMap[mon as keyof typeof monthMap];
    const year = Number(yr);
    if (Number.isNaN(year) || month === undefined) return null;
    return year * 12 + month;
  };

  const formatMonthYear = (monthIndex: number | null) => {
    if (monthIndex === null) return "";
    const year = Math.floor(monthIndex / 12);
    const month = monthIndex % 12;
    return monthNames[month];
  };

  const selectedProject = selectedId
    ? localizedProjects.find((p) => p.id === selectedId) ?? null
    : null;
  const copy = projectsCopy[language];
  const accent = selectedProject?.accent ?? fallbackAccent;

  const sortedProjects = useMemo(() => {
    return [...localizedProjects].sort((a, b) => {
      const endA = monthIndexFromPeriod(a.period, true) ?? 0;
      const endB = monthIndexFromPeriod(b.period, true) ?? 0;
      return endB - endA;
    });
  }, [localizedProjects]);

  const timelineMeta = useMemo(() => {
    const paddingMonths = 1;
    const endMonths = sortedProjects
      .map((p) => monthIndexFromPeriod(p.period, true))
      .filter((v): v is number => v !== null);
    const startMonths = sortedProjects
      .map((p) => monthIndexFromPeriod(p.period, false))
      .filter((v): v is number => v !== null);
    if (!endMonths.length || !startMonths.length) {
      const currentYear = new Date().getFullYear();
      return {
        minMonth: currentYear * 12,
        maxMonth: currentYear * 12,
        monthSpan: 12,
        minYear: currentYear,
        maxYear: currentYear,
        ticks: [currentYear],
      };
    }
    const forcedMin = 2024 * 12; // Jan 2024
    const forcedMax = 2025 * 12 + 11; // Dec 2025
    const minMonth = Math.max(
      0,
      Math.min(...startMonths, forcedMin) - paddingMonths
    );
    const maxMonth = Math.max(...endMonths, forcedMax) + paddingMonths;
    const monthSpan = Math.max(1, maxMonth - minMonth + 1);
    const minYear = Math.floor(minMonth / 12);
    const maxYear = Math.floor(maxMonth / 12);
    const tickStartYear = Math.max(minYear, Math.floor(forcedMin / 12));
    const tickEndYear = Math.max(maxYear, Math.floor(forcedMax / 12));
    const ticks = Array.from(
      { length: tickEndYear - tickStartYear + 1 },
      (_, i) => tickStartYear + i
    );
    return { minMonth, maxMonth, monthSpan, minYear, maxYear, ticks };
  }, [sortedProjects]);

  const timelineWidth = useMemo(
    () => Math.max(900, timelineMeta.monthSpan * 90),
    [timelineMeta.monthSpan]
  );

  useEffect(() => {
    if (viewMode !== "timeline") return;
    if (!timelineRef.current || !sortedProjects.length) return;
    if (timelineScrollRaf.current) {
      cancelAnimationFrame(timelineScrollRaf.current);
      timelineScrollRaf.current = null;
    }
    timelineInterruptedRef.current = false;

    const firstProject = sortedProjects[0];
    const endIdx = monthIndexFromPeriod(firstProject.period, true);
    if (endIdx === null) return;
    const cardLeft =
      ((endIdx - timelineMeta.minMonth) / timelineMeta.monthSpan) *
      timelineWidth;

    const start = 0;
    const target = Math.max(0, cardLeft - 24);
    if (!Number.isFinite(start) || !Number.isFinite(target)) return;

    const container = timelineRef.current;
    container.scrollTo({ left: start, behavior: "auto" });
    const duration = 16800;
    const startTime = performance.now();
    const animate = (now: number) => {
      if (timelineInterruptedRef.current) return;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = start + (target - start) * eased;
      container.scrollLeft = next;
      if (progress < 1) {
        timelineScrollRaf.current = requestAnimationFrame(animate);
      }
    };
    timelineScrollRaf.current = requestAnimationFrame(animate);
    return () => {
      if (timelineScrollRaf.current) {
        cancelAnimationFrame(timelineScrollRaf.current);
        timelineScrollRaf.current = null;
      }
    };
  }, [sortedProjects, timelineMeta, timelineWidth, viewMode]);

  useEffect(() => {
    if (viewMode !== "timeline") return;
    const el = timelineRef.current;
    if (!el) return;
    const stopAnimation = () => {
      timelineInterruptedRef.current = true;
      if (timelineScrollRaf.current) {
        cancelAnimationFrame(timelineScrollRaf.current);
        timelineScrollRaf.current = null;
      }
    };
    el.addEventListener("wheel", stopAnimation, { passive: true });
    el.addEventListener("pointerdown", stopAnimation);
    el.addEventListener("touchstart", stopAnimation, { passive: true });

    return () => {
      el.removeEventListener("wheel", stopAnimation);
      el.removeEventListener("pointerdown", stopAnimation);
      el.removeEventListener("touchstart", stopAnimation);
    };
  }, [viewMode]);

  const handlePick = (project: Project) => {
    setSelectedId(project.id);
    setIsUnpacked(true);
    requestAnimationFrame(() => {
      if (detailRef.current) {
        detailRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

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
          <div
            className={`scatter-stage ${stageReady ? "is-ready" : ""} ${
              isUnpacked ? "is-open" : ""
            }`}
            onMouseEnter={() => setIsUnpacked(true)}
            onMouseLeave={() => setIsUnpacked(false)}
            onTouchStart={() => setIsUnpacked(true)}
          >
            <div
              className={`folder-stack ${isUnpacked ? "is-open" : ""}`}
              style={
                {
                  ["--folder-scale" as string]: scatterScale * 1.25,
                } as CSSProperties
              }
            >
              <div className="folder-backdrop" />
              <div className="folder-tab" />
              <div className="folder-cover">
                <span className="folder-dot" />
              </div>
            </div>

            {localizedProjects.map((project, idx) => {
              const scatter = scatterLayouts[idx % scatterLayouts.length];
              const stackOffset = stackOffsets[idx % stackOffsets.length];
              const dragOffset = dragOffsets[project.id] ?? { x: 0, y: 0 };
              const staggerDelay = `${idx * 70}ms`;
              const dealOffset = idx % 2 === 0 ? -16 : 16;
              const transform = isUnpacked
                ? `translate(calc(-50% + ${
                    scatter.x * scatterScale + dragOffset.x
                  }px), calc(-50% + ${
                    scatter.y * scatterScale + dragOffset.y
                  }px)) rotate(${scatter.rotate}deg) scale(${scatterScale})`
                : `translate(calc(-50% + ${
                    stackOffset * scatterScale
                  }px), calc(-50% - ${idx * 3 * scatterScale}px)) rotate(${
                    stackOffset * 0.6
                  }deg) scale(${0.9 * scatterScale})`;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => {
                    if (skipClickRef.current || isDraggingRef.current) {
                      skipClickRef.current = false;
                      return;
                    }
                    handlePick(project);
                  }}
                  onMouseDown={(e) => {
                    dragState.current = {
                      id: project.id,
                      startX: e.clientX,
                      startY: e.clientY,
                      baseX: dragOffsets[project.id]?.x ?? 0,
                      baseY: dragOffsets[project.id]?.y ?? 0,
                    };
                    isDraggingRef.current = false;
                    setIsUnpacked(true);
                  }}
                  style={
                    {
                      ["--card-transform" as string]: transform,
                      ["--stagger-delay" as string]: staggerDelay,
                      ["--deal-offset" as string]: `${dealOffset}px`,
                      zIndex: 50 + (localizedProjects.length - idx),
                      ["--project-accent" as string]:
                        project.accent ?? fallbackAccent,
                    } as CSSProperties
                  }
                  className={`scatter-card ${isUnpacked ? "is-open" : ""} ${
                    selectedId === project.id ? "is-active" : ""
                  }`}
                >
                  <div className="scatter-card-top">
                    <span className="scatter-dot" />
                    <span className="scatter-title">
                      {project.bookmarkLabel ?? project.name}
                    </span>
                    <span className="scatter-period">{project.period}</span>
                  </div>
                  <p className="scatter-role">{project.role}</p>
                  <div className="scatter-tags">
                    {project.techStack.slice(0, 3).map((stack) => (
                      <span key={stack} className="scatter-tag">
                        {stack}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="timeline-graph is-entering" ref={timelineRef}>
            {(() => {
              const monthSpan = timelineMeta.monthSpan;
              const widthPx = timelineWidth;
              const axisY = 60;
              const lineY = axisY + 10;
              const cardsY = axisY + 80;
              return (
                <div
                  className="timeline-rail"
                  style={{
                    width: `${widthPx}px`,
                    height: `${cardsY + 220}px`,
                  }}
                >
                  <div className="timeline-axis" style={{ top: `${axisY}px` }}>
                    {timelineMeta.ticks.map((year) => {
                      const yearMonth = year * 12;
                      const positionPercent =
                        ((yearMonth - timelineMeta.minMonth) / monthSpan) * 100;
                      return (
                        <div
                          key={year}
                          className="timeline-tick"
                          style={{ left: `${positionPercent}%` }}
                        >
                          <span className="timeline-tick-line" />
                          <span className="timeline-tick-label">{year}</span>
                        </div>
                      );
                    })}
                  </div>

                  {sortedProjects.map((project, idx) => {
                    const startIdx = monthIndexFromPeriod(
                      project.period,
                      false
                    );
                    const endIdx = monthIndexFromPeriod(project.period, true);
                    if (startIdx === null || endIdx === null) return null;
                    const startPx =
                      ((startIdx - timelineMeta.minMonth) / monthSpan) *
                      widthPx;
                    const endPx =
                      ((endIdx - timelineMeta.minMonth) / monthSpan) * widthPx;
                    const segmentLeft = Math.max(0, Math.min(startPx, endPx));
                    const segmentWidth = Math.max(
                      80,
                      Math.abs(endPx - startPx)
                    );
                    const cardLeft = endPx;
                    const midPx = segmentLeft + segmentWidth / 2;
                    const showLine =
                      hoveredId === project.id || selectedId === project.id;

                    return (
                      <div key={project.id} className="timeline-item">
                        {showLine && (
                          <div
                            className="timeline-segment"
                            style={
                              {
                                left: `${segmentLeft}px`,
                                width: `${segmentWidth}px`,
                                top: `${lineY}px`,
                                ["--project-accent" as string]:
                                  project.accent ?? fallbackAccent,
                              } as CSSProperties
                            }
                          />
                        )}
                        {showLine && (
                          <>
                            <div
                              className="timeline-segment-label"
                              style={
                                {
                                  left: `${segmentLeft}px`,
                                  top: `${lineY - 10}px`,
                                  ["--project-accent" as string]:
                                    project.accent ?? fallbackAccent,
                                } as CSSProperties
                              }
                            >
                              {formatMonthYear(startIdx)}
                            </div>
                            <div
                              className="timeline-segment-label"
                              style={
                                {
                                  left: `${segmentLeft + segmentWidth}px`,
                                  top: `${lineY - 10}px`,
                                  ["--project-accent" as string]:
                                    project.accent ?? fallbackAccent,
                                } as CSSProperties
                              }
                            >
                              {formatMonthYear(endIdx)}
                            </div>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() => handlePick(project)}
                          className={`timeline-card ${
                            selectedId === project.id ? "is-active" : ""
                          }`}
                          onMouseEnter={() => setHoveredId(project.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          style={
                            {
                              left: `${cardLeft}px`,
                              top: `${cardsY}px`,
                              ["--project-accent" as string]:
                                project.accent ?? fallbackAccent,
                            } as CSSProperties
                          }
                        >
                          <div className="timeline-meta">
                            <span className="timeline-dot" />
                            <span className="timeline-period">
                              {project.period}
                            </span>
                          </div>
                          <div className="timeline-body">
                            <div className="timeline-title">
                              {project.bookmarkLabel ?? project.name}
                            </div>
                            <div className="timeline-role">{project.role}</div>
                            <div className="timeline-tags">
                              {project.techStack.slice(0, 4).map((stack) => (
                                <span key={stack} className="timeline-tag">
                                  {stack}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="timeline-index">{idx + 1}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
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
