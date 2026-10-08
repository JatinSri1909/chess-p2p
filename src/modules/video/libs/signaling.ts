import { SignalingMessage } from "../types/video.types";

/**
 * Send a signaling message to the server for WebRTC handshake
 */
export async function sendSignal(message: SignalingMessage): Promise<void> {
  try {
    const response = await fetch("/api/signaling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Signaling error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to send signal:", error);
    throw error;
  }
}

/**
 * Poll for incoming signaling messages destined for a given recipient
 */
export async function pollSignals(userId: string): Promise<SignalingMessage[]> {
  try {
    const response = await fetch(`/api/signaling?recipientId=${userId}`);

    if (!response.ok) {
      throw new Error(`Polling error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error("Failed to poll signals:", error);
    return [];
  }
}
