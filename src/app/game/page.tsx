/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from 'react';
import { Move } from 'chess.js';
import { v4 as uuidv4 } from 'uuid';
import { useMatchmaking } from '@/hooks/useMatchmaking';
import VideoCall from '@/components/shared/VideoCall';
import ChessBoard from '@/components/shared/ChessBoard';
import MovesList from '@/components/shared/MovesList';
import { Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import PageBackdrop from '@/components/shared/PageBackdrop';
import PlayerTag from '@/components/shared/PlayerTag';

export default function GamePage() {
  // State for tracking game moves
  const [moves, setMoves] = useState<Move[]>([]);
  const [gameKey, setGameKey] = useState(0); // Add key to force chess board reset
  
  // Unique user identifier
  const [userId] = useState(() => uuidv4());
  
  // Matchmaking status and details
  const { status, match, findMatch } = useMatchmaking();

  // Ensure match exists before destructuring
  const roomId = match?.roomId || '';
  const playerSide = match?.playerSides[userId] as "white" | "black";
  const remoteUserId = match ? (match.player1 === userId ? match.player2 : match.player1) : null;

  // Initiate matchmaking on component mount
  useEffect(() => {
    findMatch(userId);
  }, [userId]);

  // Handle a new move made on the chessboard
  const handleMove = (move: Move) => {
    setMoves(prev => [...prev, move]);
  };

  // Handle Next Player button click
  const handleNextPlayer = async () => {
    setMoves([]); // Clear moves
    setGameKey(prev => prev + 1); // Force chess board reset
    
    try {
      // Reset match state before finding new player
      await fetch('/api/matchmaking/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      // Wait a bit longer to ensure cleanup
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Start finding new player
      findMatch(userId);
    } catch (error) {
      console.error('Error resetting match:', error);
    }
  };

  // Handle New Match button click
  const handleNewMatch = () => {
    setMoves([]); // Clear moves
    setGameKey(prev => prev + 1); // Force chess board reset
  };

  const opponentSide = playerSide ? (playerSide === 'white' ? 'Black' : 'White') : undefined;
  const ownSide = playerSide ? (playerSide === 'white' ? 'White' : 'Black') : undefined;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <PageBackdrop />

      <div className="relative flex flex-1 flex-col">
        <Header status={status} matchFound={!!match} />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-2 sm:px-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]">
            {/* Video call and Next Player */}
            <div className="flex flex-col gap-4">
              <div className="flex-grow rounded-xl border border-border bg-card p-3 shadow-2xl shadow-black/40 sm:p-4">
                <VideoCall userId={userId} remoteUserId={remoteUserId} />
              </div>
              <Button
                onClick={handleNextPlayer}
                className="h-12 w-full gap-2 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
              >
                Next Player
                <ChevronRight aria-hidden />
              </Button>
            </div>

            {/* Chessboard */}
            <div className="self-start rounded-xl border border-border bg-card p-3 shadow-2xl shadow-black/40 sm:p-4">
              <div className="mb-3">
                <PlayerTag name="Opponent" side={opponentSide} />
              </div>
              <ChessBoard
                key={gameKey}
                onMove={handleMove}
                roomId={roomId}
                playerSide={playerSide}
                userId={userId}
              />
              <div className="mt-3">
                <PlayerTag name="You" side={ownSide} />
              </div>
            </div>

            {/* Moves list and New Match */}
            <div className="flex flex-col gap-4">
              <MovesList moves={moves} />
              <Button
                variant="outline"
                onClick={handleNewMatch}
                className="h-12 w-full gap-2 text-base"
              >
                <Plus aria-hidden />
                New Match
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
