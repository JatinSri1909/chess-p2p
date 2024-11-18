import { Move } from "chess.js";
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

interface MovesListProps {
  moves: Move[];
}

export default function MovesList({ moves }: MovesListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [moves]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-700 border border-gray-600 rounded-lg flex-grow mb-4 p-4">
        <h2 className="text-lg font-semibold mb-2 sticky top-0 bg-gray-700">
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
      <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col">
        <Button className="mb-2 bg-green-600 hover:bg-green-700 text-white aspect-square lg:aspect-auto w-full">
          <Play className="mr-2" style={{ width: "32px", height: "32px" }} />
          <span className="hidden lg:inline text-[2rem]">Play Match</span>
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white aspect-square lg:aspect-auto w-full">
          <Plus className="mr-2" style={{ width: "32px", height: "32px" }} />
          <span className="hidden lg:inline text-[2rem]">New Match</span>
        </Button>
      </div>
    </div>
  );
}
