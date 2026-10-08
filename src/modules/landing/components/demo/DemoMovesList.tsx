"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/common/libs/utils";
import { DemoFrame } from "../../types/landing.types";

export interface DemoMovesListProps {
  played: DemoFrame[];
  ply: number;
}

/**
 * Elementary moves list displaying scripted demo moves with auto-scroll
 */
export default function DemoMovesList({ played, ply }: DemoMovesListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [ply]);

  return (
    <div className="flex h-44 flex-col rounded-lg border border-border bg-muted p-3 lg:h-auto lg:flex-1">
      <h2 className="text-sm font-semibold">Moves</h2>
      <div className="relative mt-2 min-h-0 flex-1">
        <div
          ref={scrollRef}
          className="scrollbar-thin absolute inset-0 overflow-y-auto pr-1"
        >
          <div className="grid grid-cols-2 gap-x-2 text-sm tabular-nums">
            {played.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "animate-fade-in py-1 motion-reduce:animate-none",
                  i % 2 === 0 ? "text-yellow-100" : "text-gray-300",
                  i === ply - 1 && "font-semibold"
                )}
              >
                {i % 2 === 0 && <span className="mr-1.5">{i / 2 + 1}.</span>}
                {m.san}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
