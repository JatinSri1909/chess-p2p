/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Header, Footer, PageBackdrop } from "@/common/components/layout";
import { useMatchmaking, NextPlayerButton, NewMatchButton } from "@/modules/matchmaking";
import { ChessBoard, MovesList, type Move } from "@/modules/chess";
import { VideoCall } from "@/modules/video";

export default function GamePage() {
  // State for tracking game moves
  const [moves, setMoves] = useState<Move[]>([]);
  const [gameKey, setGameKey] = useState(0); // Key to force chess board reset

  // Unique user identifier
  const [userId] = useState(() => uuidv4());

  // Matchmaking status and details
  const { status, match, findMatch } = useMatchmaking();

  // Match details
  const roomId = match?.roomId || "";
  const playerSide = (match?.playerSides[userId] as "white" | "black") || "white";
  const remoteUserId = match ? (match.player1 === userId ? match.player2 : match.player1) : null;

  // Initiate matchmaking on component mount
  useEffect(() => {
    findMatch(userId);
  }, [userId]);

  // Handle a new move made on the chessboard
  const handleMove = useCallback((move: Move) => {
    setMoves((prev) => [...prev, move]);
  }, []);

  // Handle Next Player button click
  const handleNextPlayer = async () => {
    setMoves([]); // Clear moves
    setGameKey((prev) => prev + 1); // Force chess board reset

    try {
      // Reset match state before finding new player
      await fetch("/api/matchmaking/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      // Wait a brief delay to ensure cleanup
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Start finding new player
      findMatch(userId);
    } catch (error) {
      console.error("Error resetting match:", error);
    }
  };

  // Handle New Match button click
  const handleNewMatch = () => {
    setMoves([]); // Clear moves
    setGameKey((prev) => prev + 1); // Force chess board reset
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <PageBackdrop />
      <div className="relative z-10 flex flex-grow flex-col">
        <Header status={status} matchFound={!!match} />

        <main className="flex flex-grow items-center justify-center px-0 pb-3 sm:px-4">
          <div className="w-full max-w-[1400px] rounded-lg border-2 border-border bg-card/40">
            {/* Grid layout for video call, chessboard, and moves list */}
            <div className="grid h-full grid-cols-1 gap-3 p-2 sm:p-4 lg:grid-cols-[1.2fr,2.1fr,1fr] lg:gap-4 lg:p-6">
              {/* Video call and Next Player button */}
              <div className="flex h-full flex-col">
                <div className="flex-grow">
                  <VideoCall userId={userId} remoteUserId={remoteUserId} />
                </div>
                <NextPlayerButton onClick={handleNextPlayer} className="mt-4" />
              </div>

              {/* Chessboard component */}
              <div className="flex min-h-[300px] items-center justify-center sm:min-h-[400px] lg:min-h-[500px]">
                <ChessBoard
                  key={gameKey}
                  onMove={handleMove}
                  roomId={roomId}
                  playerSide={playerSide}
                  userId={userId}
                />
              </div>

              {/* Moves list and New Match button */}
              <div className="flex h-full flex-col">
                <div className="flex-grow overflow-y-auto">
                  <MovesList moves={moves} />
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2 lg:flex lg:flex-col">
                  <NewMatchButton onClick={handleNewMatch} />
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
