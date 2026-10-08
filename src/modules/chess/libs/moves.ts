import { Move } from "chess.js";

/**
 * Broadcast a chess move to the room participants via the moves API
 */
export async function sendMove(
  roomId: string,
  senderId: string,
  move: Move
): Promise<void> {
  try {
    const response = await fetch("/api/moves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, senderId, move }),
    });

    if (!response.ok) {
      throw new Error(`Move send error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to send move:", error);
    throw error;
  }
}
