"use client";

import { useState, useEffect, useRef } from "react";
import { Match, MatchStatus } from "../types/matchmaking.types";
import { MATCHMAKING_POLL_INTERVAL_MS } from "../constants/matchmaking.constants";

export interface UseMatchmakingReturn {
  status: MatchStatus;
  match: Match | null;
  roomId: string | null;
  playerSide: "white" | "black" | null;
  findMatch: (userId: string) => Promise<void>;
}

/**
 * Custom hook to manage matchmaking state and polling
 */
export function useMatchmaking(): UseMatchmakingReturn {
  const [status, setStatus] = useState<MatchStatus>("idle");
  const [match, setMatch] = useState<Match | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerSide, setPlayerSide] = useState<"white" | "black" | null>(null);
  const pollingInterval = useRef<NodeJS.Timeout>();

  const findMatch = async (userId: string) => {
    setStatus("searching");
    setMatch(null); // Reset match state immediately
    try {
      const response = await fetch("/api/matchmaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();

      if (data.match) {
        setMatch(data.match);
        setStatus("matched");
        setRoomId(data.match.roomId);
        setPlayerSide(data.match.playerSides[userId]);
      } else {
        setStatus("waiting");
        startPolling(userId);
      }
    } catch (error) {
      console.error("Matchmaking failed:", error);
      setStatus("error");
    }
  };

  const startPolling = (userId: string) => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
    }

    pollingInterval.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/matchmaking?userId=${userId}`);
        const data = await response.json();

        if (data.match) {
          setMatch(data.match);
          setStatus("matched");
          setRoomId(data.match.roomId);
          setPlayerSide(data.match.playerSides[userId]);
          if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
          }
        } else if (data.status === "reset") {
          setMatch(null);
          setStatus("searching");
          setRoomId(null);
          setPlayerSide(null);
          if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
          }
          setTimeout(() => findMatch(userId), 1000);
        } else if (!data.match && status === "matched") {
          setMatch(null);
          setStatus("searching");
          setRoomId(null);
          setPlayerSide(null);
          findMatch(userId);
        }
      } catch (error) {
        console.error("Polling failed:", error);
      }
    }, MATCHMAKING_POLL_INTERVAL_MS);
  };

  useEffect(() => {
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  return { status, match, roomId, playerSide, findMatch };
}
