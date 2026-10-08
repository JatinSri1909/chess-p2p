"use client";

import { useState, useEffect } from "react";
import { Chess, Move, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import Pusher from "pusher-js";
import { sendMove } from "@/lib/moves";

const chess = new Chess();

function ChessBoard({ onMove, roomId, playerSide, userId }: {
  onMove?: (move: Move) => void;
  roomId: string;
  playerSide: 'white' | 'black';
  userId: string;
}) {
  const [winner, setWinner] = useState<string | null>(null);
  const [position, setPosition] = useState(chess.fen());
  const [gameInstance] = useState(() => new Chess());

  // Reset game when roomId changes
  useEffect(() => {
    gameInstance.reset();
    setPosition(gameInstance.fen());
    setWinner(null);
  }, [roomId, gameInstance]);

  // Subscribe to the room's move channel
  useEffect(() => {
    if (!roomId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe(`room-${roomId}`);

    channel.bind('opponentMove', (data: { senderId: string; move: Move }) => {
      if (data.senderId === userId) return; // ignore our own echoed move

      gameInstance.move(data.move);
      setPosition(gameInstance.fen());
      onMove?.(data.move);

      if (gameInstance.isCheckmate()) {
        setWinner(gameInstance.turn() === 'w' ? 'Black' : 'White');
      }
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`room-${roomId}`);
      pusher.disconnect();
    };
  }, [roomId, userId, onMove, gameInstance]);

  const isPlayerTurn = gameInstance.turn() === (playerSide === 'white' ? 'w' : 'b');

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    if (!isPlayerTurn || winner) return false;

    const movingPiece = gameInstance.get(sourceSquare as Square);

    const isPawnPromotion =
      movingPiece?.type === 'p' &&
      ((movingPiece.color === 'w' && targetSquare[1] === '8') ||
       (movingPiece.color === 'b' && targetSquare[1] === '1'));

    try {
      const move = gameInstance.move({
        from: sourceSquare as Square,
        to: targetSquare as Square,
        promotion: isPawnPromotion ? piece.charAt(1).toLowerCase() as 'q' | 'r' | 'b' | 'n' : undefined
      });

      if (move) {
        sendMove(roomId, userId, move);
        setPosition(gameInstance.fen());
        onMove?.(move);

        if (gameInstance.isCheckmate()) {
          setWinner(gameInstance.turn() === 'w' ? 'Black' : 'White');
        }
        return true;
      }
    } catch (error) {
      console.error("Invalid move:", error);
    }
    return false;
  }

  return (
    <div className="relative w-full pt-[100%]">
      <div className="absolute inset-0 overflow-hidden rounded-md">
        <Chessboard
          position={position}
          onPieceDrop={onDrop}
          boardOrientation={playerSide}
          customDarkSquareStyle={{ backgroundColor: 'hsl(var(--primary) / 0.5)' }}
          customLightSquareStyle={{ backgroundColor: 'hsl(var(--foreground) / 0.78)' }}
          showPromotionDialog={true}
          areArrowsAllowed={false}
        />

        {winner && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="mx-4 w-80 max-w-full rounded-xl border border-border bg-card p-6 text-center shadow-2xl shadow-black/40">
              <h2 className="text-2xl font-semibold tracking-tight">
                <span className="text-primary">{winner}</span> wins!
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">Checkmate. Hit Next Player to find a new opponent.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChessBoard;
