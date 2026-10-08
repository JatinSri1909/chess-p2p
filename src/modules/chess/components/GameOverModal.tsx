import { GameOverModalProps } from "../types/chess.types";

/**
 * Elementary modal shown when a checkmate or game end condition is triggered
 */
export default function GameOverModal({ winner, onClose }: GameOverModalProps) {
  if (!winner) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Game Over"
      className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-4 w-80 max-w-full rounded-xl border border-border bg-card p-6 text-center text-card-foreground shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="mb-2 block text-4xl">👑</span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{winner} wins!</h2>
        <p className="mt-2 text-sm text-muted-foreground">Congratulations to the winner!</p>
      </div>
    </div>
  );
}
