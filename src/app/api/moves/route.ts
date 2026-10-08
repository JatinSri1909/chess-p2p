import { NextRequest, NextResponse } from "next/server";
import pusher from "@/common/libs/pusher-server";

// Handle POST requests to broadcast a move to the room
export async function POST(req: NextRequest) {
  try {
    const { roomId, senderId, move } = await req.json();

    if (!roomId) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    await pusher.trigger(`room-${roomId}`, "opponentMove", { senderId, move });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Move broadcast error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
