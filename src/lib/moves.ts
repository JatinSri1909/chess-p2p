/* eslint-disable @typescript-eslint/no-explicit-any */

// Function to broadcast a move to the room via the server
export async function sendMove(roomId: string, senderId: string, move: any): Promise<void> {
  try {
    const response = await fetch('/api/moves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, senderId, move }),
    });

    if (!response.ok) {
      throw new Error(`Move send error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to send move:', error);
    throw error;
  }
}
