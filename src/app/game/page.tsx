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

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <PageBackdrop />
      <div className="relative z-10 flex flex-col flex-grow">
        <Header status={status} matchFound={!!match} />

        <main className="flex-grow flex items-center justify-center pb-3 px-0 sm:px-4">
          <div className="bg-card/40 border-2 border-border rounded-lg w-full max-w-[1400px]">
            {/* Grid layout for video call, chessboard, and moves list */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,2.1fr,1fr] gap-3 lg:gap-4 p-2 sm:p-4 lg:p-6 h-full">

              {/* Video call and Next Player button */}
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <VideoCall
                    userId={userId}
                    remoteUserId={remoteUserId}
                  />
                </div>
                <Button
                  onClick={handleNextPlayer}
                  className="mt-4 h-12 w-full text-lg lg:h-[4rem] lg:text-[2rem]"
                >
                  <ChevronRight className="mr-2 !h-6 !w-6 lg:!h-8 lg:!w-8" />
                  <span>Next Player</span>
                </Button>
              </div>

              {/* Chessboard component */}
              <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
                <ChessBoard
                  key={gameKey}
                  onMove={handleMove}
                  roomId={roomId}
                  playerSide={playerSide}
                  userId={userId}
                />
              </div>

              {/* Moves list and action buttons */}
              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto">
                  <MovesList moves={moves} />
                </div>
                <div className="grid grid-cols-1 gap-2 lg:flex lg:flex-col mt-4">
                  <Button
                    variant="outline"
                    onClick={handleNewMatch}
                    className="h-12 w-full text-lg lg:h-[4rem]"
                  >
                    <Plus className="mr-2 !h-6 !w-6 lg:!h-8 lg:!w-8" />
                    <span className="lg:text-[2rem]">New Match</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
