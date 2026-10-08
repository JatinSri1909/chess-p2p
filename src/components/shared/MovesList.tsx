import { Move } from "chess.js";
import { useEffect, useRef } from "react";

interface MovesListProps {
  moves: Move[];
}

// Lists the moves played so far as numbered pairs and keeps the latest in view.
export default function MovesList({ moves }: MovesListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [moves]);

  // Group into [white, black] pairs.
  const rows: Move[][] = [];
  for (let i = 0; i < moves.length; i += 2) rows.push(moves.slice(i, i + 2));

  return (
    <div className="flex h-64 flex-col rounded-xl border border-border bg-card p-4 shadow-2xl shadow-black/40 lg:h-auto lg:flex-1">
      <p className="text-xs font-medium uppercase tracking-widest text-primary">Moves</p>

      {/* The scroller is absolutely positioned so a long game scrolls here
          instead of stretching the whole row taller than the board. */}
      <div className="relative mt-3 min-h-0 flex-1">
        <div
          ref={scrollRef}
          className="scrollbar-thin absolute inset-0 overflow-y-auto pr-2"
        >
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No moves yet.</p>
          ) : (
            <ol className="text-sm tabular-nums">
              {rows.map((pair, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[2rem_1fr_1fr] gap-2 border-b border-border/60 py-1.5 last:border-b-0"
                >
                  <span className="text-muted-foreground">{i + 1}.</span>
                  <span className="font-medium">{pair[0].san}</span>
                  <span className="font-medium text-muted-foreground">{pair[1]?.san}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
