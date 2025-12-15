"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { useMemo } from "react";

type FluidCursorProps = {
  fluidColor?: string;
  backgroundColor?: string;
  showBackground?: boolean;
  blend?: number;
  intensity?: number;
  force?: number;
  distortion?: number;
  radius?: number;
  curl?: number;
  swirl?: number;
  velocityDissipation?: number;
  densityDissipation?: number;
  pressure?: number;
  rainbow?: boolean;
};

/**
 * Full-screen fluid cursor overlay.
 * Pointer events are disabled so the rest of the UI stays interactive.
 */
export default function FluidCursor({
  // Tuned for a bright, watery overlay.
  fluidColor = "#04121a",
  backgroundColor = "#6be7ff",
  showBackground = false,
  blend = 0,
  intensity = 4,
  force = 3,
  distortion = 1.05,
  radius = 0.06,
  curl = 9,
  swirl = 6,
  velocityDissipation = 0.99,
  densityDissipation = 0.98,
  pressure = 0.9,
  rainbow = false,
}: FluidCursorProps) {
  const eventSource =
    typeof window !== "undefined" ? (document.body as HTMLElement) : undefined;

  const style = useMemo(
    () => ({
      position: "fixed" as const,
      inset: 0,
      width: "100vw",
      height: "100vh",
      pointerEvents: "none" as const,
      zIndex: 40, // above nav/sections; still ignores pointer events
    }),
    []
  );

  return (
    <Canvas
      style={style}
      gl={{ antialias: true, alpha: true }}
      eventSource={eventSource}
      eventPrefix="client"
    >
      <EffectComposer>
        <Fluid
          fluidColor={fluidColor}
          backgroundColor={backgroundColor}
          showBackground={showBackground}
          blend={blend}
          intensity={intensity}
          force={force}
          distortion={distortion}
          radius={radius}
          curl={curl}
          swirl={swirl}
          velocityDissipation={velocityDissipation}
          densityDissipation={densityDissipation}
          pressure={pressure}
          rainbow={rainbow}
        />
      </EffectComposer>
    </Canvas>
  );
}
