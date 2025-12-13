"use client";

import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Project } from "@/data/projects";

type ScatterLayout = { x: number; y: number; rotate: number };
type DragOffset = { x: number; y: number };

const scatterLayouts: ScatterLayout[] = [
  { x: -180, y: -120, rotate: -8 },
  { x: -50, y: -20, rotate: -3 },
  { x: 220, y: -90, rotate: 6 },
  { x: -150, y: 90, rotate: 5 },
];

const stackOffsets = [-4, -2, 2, 6, -6];

type ScatterViewProps = {
  projects: Project[];
  selectedId: string | null;
  onSelect: (project: Project) => void;
  stageReady: boolean;
  fallbackAccent: string;
};

export function ScatterView({
  projects,
  selectedId,
  onSelect,
  stageReady,
  fallbackAccent,
}: ScatterViewProps) {
  const [isUnpacked, setIsUnpacked] = useState(false);
  const [scatterScale, setScatterScale] = useState(1);
  const [dragOffsets, setDragOffsets] = useState<Record<string, DragOffset>>(
    {}
  );
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

  const scatterProjects = useMemo(() => projects, [projects]);

  return (
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

      {scatterProjects.map((project, idx) => {
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
              onSelect(project);
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
                zIndex: 50 + (projects.length - idx),
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
  );
}
