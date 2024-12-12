/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from 'react';
import { Move } from 'chess.js';
import { v4 as uuidv4 } from 'uuid';
import { useMatchmaking } from '@/hooks/useMatchmaking';
import VideoCall from '@/components/shared/VideoCall';
import ChessBoard from '@/components/shared/ChessBoard';
import MovesList from '@/components/shared/MovesList';
import { Play, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function GamePage() {
  // State for tracking game moves
  const [moves, setMoves] = useState<Move[]>([]);
  
  // Unique user identifier
  const [userId] = useState(() => uuidv4());
  
  // Matchmaking status and details
  const { status, match, findMatch } = useMatchmaking();

  // Ensure match exists before destructuring
  const roomId = match?.roomId || '';
  const playerSide = match?.playerSides[userId] as "white" | "black";

  // Initiate matchmaking on component mount
  useEffect(() => {
    findMatch(userId);
  }, [userId]);

  // Handle a new move made on the chessboard
  const handleMove = (move: Move) => {
    setMoves(prev => [...prev, move]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header status={status} matchFound={!!match} />
      
      <main className="flex-grow flex items-center justify-center pb-2 px-2 sm:px-4 lg:px-[1rem] mb-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-auto w-full max-w-[90vw] max-h-[100vh] lg:overflow-hidden">
          {/* Grid layout for video call, chessboard, and moves list */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,2.1fr,1fr] gap-3 lg:gap-4 p-4 lg:p-6 h-full">
            
            {/* Video call and Next Player button */}
            <div className="flex flex-col">
              <VideoCall 
                userId={userId}
                remoteUserId={match ? (match.player1 === userId ? match.player2 : match.player1) : null}
              />
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white aspect-square lg:aspect-auto w-full text-[2rem]">
                <ChevronRight
                  className="mr-2"
                  style={{ width: "32px", height: "32px" }}
                />
                <span className="hidden lg:inline">Next Player</span>
              </Button>
            </div>
            
            {/* Chessboard component */}
            <div className="flex items-center justify-center">
              <ChessBoard onMove={handleMove} roomId={roomId} playerSide={playerSide} />
            </div>
            
            {/* Moves list and action buttons */}
            <div className="flex flex-col">
              <MovesList moves={moves} />
              <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col mt-4">
                <Button className="mb-2 bg-green-600 hover:bg-green-700 text-white aspect-square lg:aspect-auto w-full">
                  <Play className="mr-2" style={{ width: "32px", height: "32px" }} />
                  <span className="hidden lg:inline text-[2rem]">Play Match</span>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white aspect-square lg:aspect-auto w-full">
                  <Plus className="mr-2" style={{ width: "32px", height: "32px" }} />
                  <span className="hidden lg:inline text-[2rem]">New Match</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}