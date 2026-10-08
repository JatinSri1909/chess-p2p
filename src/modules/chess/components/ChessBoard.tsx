"use client";

import { Chessboard } from "react-chessboard";
import { cn } from "@/common/libs/utils";
import { useChessGame } from "../hooks/useChessGame";
import { CHESS_BOARD_STYLES } from "../constants/chess.constants";
import GameOverModal from "./GameOverModal";
import { ChessBoardProps } from "../types/chess.types";

/**
 * Modular ChessBoard component combining game hook, chessboard view, and victory dialog
 */
export default function ChessBoard({
  onMove,
  roomId,
  playerSide,
  userId,
  className,
}: ChessBoardProps) {
  const { position, winner, onDrop, setWinner } = useChessGame({
    roomId,
    userId,
    playerSide,
    onMove,
  });

  return (
    <div className={cn("relative w-full pt-[100%]", className)}>
      <div className="absolute inset-0">
        <Chessboard
          position={position}
          onPieceDrop={onDrop}
          boardOrientation={playerSide}
          customDarkSquareStyle={CHESS_BOARD_STYLES.customDarkSquareStyle}
          customLightSquareStyle={CHESS_BOARD_STYLES.customLightSquareStyle}
          customBoardStyle={CHESS_BOARD_STYLES.customBoardStyle}
          showPromotionDialog={true}
          areArrowsAllowed={false}
        />

        <GameOverModal winner={winner} onClose={() => setWinner(null)} />
      </div>
    </div>
  );
}
