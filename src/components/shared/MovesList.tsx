import { Move } from "chess.js";
import { useEffect, useRef } from "react";

// Interface for component props
interface MovesListProps {
  moves: Move[];
}

// MovesList component displays a list of chess moves and auto-scrolls on update
export default function MovesList({ moves }: MovesListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when new moves are added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [moves]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-lg flex-grow mb-4 p-4">
        <h2 className="text-lg font-semibold mb-2 sticky top-0 bg-[hsl(var(--muted))]">
          Moves
        </h2>
        <div
          ref={scrollRef}
          className="overflow-y-auto h-[10vh] sm:h-[15vh] md:h-[35vh] lg:h-[45vh] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 pr-2"
        >
          <div className="grid grid-cols-2 gap-2">
            {moves.map((move, index) => (
              <div
                key={index}
                className={`p-2 text-sm sm:text-base ${
                  index % 2 === 0 ? "text-yellow-100" : "text-gray-300"
                }`}
              >
                {index % 2 === 0 && (
                  <span className="mr-2">{Math.floor(index / 2 + 1)}.</span>
                )}
                {move.san}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}