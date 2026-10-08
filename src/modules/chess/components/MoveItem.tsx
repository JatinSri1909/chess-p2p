import { cn } from "@/common/libs/utils";
import { MoveItemProps } from "../types/chess.types";

/**
 * Elementary component representing a single chess move notation
 */
export default function MoveItem({ move, index }: MoveItemProps) {
  const isWhiteMove = index % 2 === 0;
  const moveNumber = Math.floor(index / 2 + 1);

  return (
    <div
      className={cn(
        "p-2 text-sm sm:text-base tabular-nums transition-colors",
        isWhiteMove ? "text-yellow-100" : "text-gray-300"
      )}
    >
      {isWhiteMove && <span className="mr-2 font-mono text-muted-foreground">{moveNumber}.</span>}
      <span className="font-medium">{move.san}</span>
    </div>
  );
}
