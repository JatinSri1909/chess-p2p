import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    // Get current match data
    const matchKey = `match:${userId}`;
    const matchData = await redis.hgetall<Record<string, string>>(matchKey);

    if (matchData && Object.keys(matchData).length > 0) {
      // Get the other player's ID
      const otherPlayerId = matchData.player1 === userId ? matchData.player2 : matchData.player1;

      // Set reset flag for the other player
      await redis.set(`reset:${otherPlayerId}`, "true", { ex: 30 }); // Expires in 30 seconds

      // Delete both players' match data
      await redis.del(matchKey);
      await redis.del(`match:${otherPlayerId}`);

      // Delete any existing signaling data
      await redis.del(`signaling:${userId}`);
      await redis.del(`signaling:${otherPlayerId}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Match reset error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
