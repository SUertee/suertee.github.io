import { useEffect, useState } from "react";

/**
 * Shared responsive scale hook for project cards (scatter + timeline).
 * Initializes from the current window size so cards render at the correct
 * scale on first paint (avoids post-mount shrinking).
 */
export function useProjectScale() {
  const computeScale = () => {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w < 480) return 0.6;
    if (w < 640) return 0.7;
    if (w < 820) return 0.8;
    if (w < 1024) return 0.9;
    return 1;
  };

  const [scale, setScale] = useState(() => computeScale());

  useEffect(() => {
    const handler = () => setScale(computeScale());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return scale;
}
