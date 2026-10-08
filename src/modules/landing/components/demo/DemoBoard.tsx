"use client";

import { Chessboard } from "react-chessboard";
import { DemoFrame } from "../../types/landing.types";
import { DEMO_RING_STYLE } from "../../constants/demo.constants";

export interface DemoBoardProps {
  frame: DemoFrame;
  ply: number;
  reduceMotion: boolean;
}

/**
 * Elementary board component for the hero demo animation
 */
export default function DemoBoard({ frame, ply, reduceMotion }: DemoBoardProps) {
  return (
    <div className="overflow-hidden rounded-md">
      <Chessboard
        id="hero-demo"
        position={frame.fen}
        arePiecesDraggable={false}
        areArrowsAllowed={false}
        animationDuration={ply === 0 || reduceMotion ? 0 : 300}
        customDarkSquareStyle={{ backgroundColor: "hsl(var(--primary) / 0.5)" }}
        customLightSquareStyle={{ backgroundColor: "hsl(var(--foreground) / 0.78)" }}
        customSquareStyles={
          frame.from
            ? {
                [frame.from]: DEMO_RING_STYLE,
                [frame.to]: DEMO_RING_STYLE,
              }
            : {}
        }
      />
    </div>
  );
}
