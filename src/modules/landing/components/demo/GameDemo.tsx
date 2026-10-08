"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { buttonVariants } from "@/common/components/ui";
import { cn } from "@/common/libs/utils";
import DemoVideoTile from "./DemoVideoTile";
import DemoBoard from "./DemoBoard";
import DemoMovesList from "./DemoMovesList";
import DemoStatusBadge from "./DemoStatusBadge";
import {
  PLAYER_IMAGES,
  DEMO_FRAMES,
  DEMO_TIMING,
} from "../../constants/demo.constants";

const LAST_INDEX = DEMO_FRAMES.length - 1;

/**
 * Modular GameDemo coordinator showcasing animated match preview
 */
export default function GameDemo() {
  const [ply, setPly] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Play the game one ply at a time, pause on checkmate, then loop
  useEffect(() => {
    if (reduceMotion) {
      setPly(LAST_INDEX);
      return;
    }
    const delay =
      ply === 0
        ? DEMO_TIMING.startPauseMs
        : ply === LAST_INDEX
        ? DEMO_TIMING.endPauseMs
        : DEMO_TIMING.moveMs;

    const timer = setTimeout(() => {
      setPly((p) => (p >= LAST_INDEX ? 0 : p + 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [ply, reduceMotion]);

  const frame = DEMO_FRAMES[ply];
  const played = DEMO_FRAMES.slice(1, ply + 1);
  const finished = ply === LAST_INDEX;
  const whiteToMove = ply % 2 === 0;

  return (
    <figure className="mx-auto w-full max-w-4xl text-left">
      <div
        aria-hidden
        className="rounded-xl border border-border bg-card/60 p-3 shadow-2xl shadow-black/40 backdrop-blur sm:p-4"
      >
        <DemoStatusBadge finished={finished} />

        <div className="grid gap-3 lg:grid-cols-[1fr_1.9fr_1fr] lg:gap-4">
          {/* Video call + Next Player */}
          <div className="flex flex-col gap-3">
            <div className="grid flex-grow grid-cols-2 content-start gap-3 lg:grid-cols-1">
              <DemoVideoTile
                label="Opponent"
                src={PLAYER_IMAGES.opponent}
                active={!finished && !whiteToMove}
              />
              <DemoVideoTile
                label="You"
                src={PLAYER_IMAGES.you}
                active={!finished && whiteToMove}
              />
            </div>
            <div className={cn(buttonVariants({ size: "sm" }), "h-10 w-full gap-1 text-sm")}>
              Next Player
              <ChevronRight />
            </div>
          </div>

          {/* Chessboard */}
          <DemoBoard frame={frame} ply={ply} reduceMotion={reduceMotion} />

          {/* Moves + New Match */}
          <div className="flex flex-col gap-3">
            <DemoMovesList played={played} ply={ply} />
            <div
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "h-10 w-full gap-1 text-sm"
              )}
            >
              <Plus />
              New Match
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        A preview of a Chess P2P match: a video call with an opponent, a chessboard where pieces
        move on their own, and a list of moves that grows as the game goes on.
      </figcaption>
    </figure>
  );
}
