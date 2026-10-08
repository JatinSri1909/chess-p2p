import { useEffect, useRef } from "react";
import { cn } from "@/common/libs/utils";
import MoveItem from "./MoveItem";
import { MovesListProps } from "../types/chess.types";

/**
 * Modular MovesList component with auto-scrolling container and elementary move items
 */
export default function MovesList({ moves, className }: MovesListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [moves]);

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="mb-4 flex flex-grow flex-col rounded-lg border border-border bg-muted p-4">
        <h2 className="sticky top-0 bg-muted pb-2 text-lg font-semibold tracking-tight">
          Moves
        </h2>
        <div
          ref={scrollRef}
          className="scrollbar-thin h-[10vh] flex-1 overflow-y-auto pr-2 scrollbar-track-transparent scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 sm:h-[15vh] md:h-[35vh] lg:h-[45vh]"
        >
          <div className="grid grid-cols-2 gap-2">
            {moves.map((move, index) => (
              <MoveItem key={`${move.san}-${index}`} move={move} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
