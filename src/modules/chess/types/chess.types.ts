import { Move } from "chess.js";

export type { Move } from "chess.js";

export interface ChessBoardProps {
  onMove?: (move: Move) => void;
  roomId: string;
  playerSide: "white" | "black";
  userId: string;
  className?: string;
}

export interface GameOverModalProps {
  winner: string | null;
  onClose?: () => void;
}

export interface MovesListProps {
  moves: Move[];
  className?: string;
}

export interface MoveItemProps {
  move: Move;
  index: number;
}
