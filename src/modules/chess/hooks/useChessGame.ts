"use client";

import { useState, useEffect, useCallback } from "react";
import { Chess, Move, Square } from "chess.js";
import Pusher from "pusher-js";
import { sendMove } from "../libs/moves";

export interface UseChessGameOptions {
  roomId: string;
  userId: string;
  playerSide: "white" | "black";
  onMove?: (move: Move) => void;
}

export interface UseChessGameReturn {
  position: string;
  winner: string | null;
  isPlayerTurn: boolean;
  onDrop: (sourceSquare: string, targetSquare: string, piece: string) => boolean;
  resetGame: () => void;
  setWinner: (winner: string | null) => void;
}

/**
 * Custom hook encapsulating chess match rules, state, opponent synchronization, and turn validation
 */
export function useChessGame({
  roomId,
  userId,
  playerSide,
  onMove,
}: UseChessGameOptions): UseChessGameReturn {
  const [gameInstance] = useState(() => new Chess());
  const [position, setPosition] = useState(gameInstance.fen());
  const [winner, setWinner] = useState<string | null>(null);

  const resetGame = useCallback(() => {
    gameInstance.reset();
    setPosition(gameInstance.fen());
    setWinner(null);
  }, [gameInstance]);

  // Reset game whenever roomId changes
  useEffect(() => {
    resetGame();
  }, [roomId, resetGame]);

  // Subscribe to room moves via Pusher
  useEffect(() => {
    if (!roomId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe(`room-${roomId}`);

    channel.bind("opponentMove", (data: { senderId: string; move: Move }) => {
      if (data.senderId === userId) return; // Ignore own move

      gameInstance.move(data.move);
      setPosition(gameInstance.fen());
      onMove?.(data.move);

      if (gameInstance.isCheckmate()) {
        setWinner(gameInstance.turn() === "w" ? "Black" : "White");
      }
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`room-${roomId}`);
      pusher.disconnect();
    };
  }, [roomId, userId, onMove, gameInstance]);

  const isPlayerTurn = gameInstance.turn() === (playerSide === "white" ? "w" : "b");

  const onDrop = useCallback(
    (sourceSquare: string, targetSquare: string, piece: string): boolean => {
      if (!isPlayerTurn || winner) return false;

      const movingPiece = gameInstance.get(sourceSquare as Square);

      const isPawnPromotion =
        movingPiece?.type === "p" &&
        ((movingPiece.color === "w" && targetSquare[1] === "8") ||
          (movingPiece.color === "b" && targetSquare[1] === "1"));

      try {
        const move = gameInstance.move({
          from: sourceSquare as Square,
          to: targetSquare as Square,
          promotion: isPawnPromotion
            ? (piece.charAt(1).toLowerCase() as "q" | "r" | "b" | "n")
            : undefined,
        });

        if (move) {
          sendMove(roomId, userId, move);
          setPosition(gameInstance.fen());
          onMove?.(move);

          if (gameInstance.isCheckmate()) {
            setWinner(gameInstance.turn() === "w" ? "Black" : "White");
          }
          return true;
        }
      } catch (error) {
        console.error("Invalid move:", error);
      }

      return false;
    },
    [isPlayerTurn, winner, gameInstance, roomId, userId, onMove]
  );

  return {
    position,
    winner,
    isPlayerTurn,
    onDrop,
    resetGame,
    setWinner,
  };
}
