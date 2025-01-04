"use client";

import { useState, useEffect } from "react";
import { Chess, Move, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import io from 'socket.io-client';
import { Socket } from "socket.io-client";

const chess = new Chess();

function ChessBoard({ onMove, roomId, playerSide }: { 
  onMove?: (move: Move) => void; 
  roomId: string; 
  playerSide: 'white' | 'black' 
}) {
  const [winner, setWinner] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [position, setPosition] = useState(chess.fen());
  const [gameInstance] = useState(() => new Chess());

  // Reset game when roomId changes
  useEffect(() => {
    gameInstance.reset();
    setPosition(gameInstance.fen());
    setWinner(null);
  }, [roomId, gameInstance]);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.emit('joinRoom', roomId);

    newSocket.on('opponentMove', (moveData) => {
      gameInstance.move(moveData);
      setPosition(gameInstance.fen());
      onMove?.(moveData);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, onMove, gameInstance]);

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
        socket?.emit('playerMove', { roomId, move });
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
      <div className="absolute inset-0">
        <Chessboard 
          position={position}
          onPieceDrop={onDrop}
          boardOrientation={playerSide}
          customBoardStyle={{
            borderRadius: '0.5rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
          showPromotionDialog={true}
          areArrowsAllowed={false}
        />
        
        {winner && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm z-20 rounded-lg">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white w-80 max-w-full mx-4 sm:mx-auto">
              <h2 className="text-2xl font-bold mb-4">{winner} wins!</h2>
              <p className="mb-4">Congratulations to the winner!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChessBoard;
