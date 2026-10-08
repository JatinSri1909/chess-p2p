export interface Match {
  player1: string;
  player2: string;
  roomId: string;
  playerSides: { [key: string]: "white" | "black" };
}

export type MatchStatus = "idle" | "searching" | "waiting" | "matched" | "error";

export interface MatchControlsProps {
  onNextPlayer: () => void | Promise<void>;
  onNewMatch: () => void;
  isPending?: boolean;
  className?: string;
}
