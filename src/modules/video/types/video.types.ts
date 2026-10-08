/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SignalingMessage {
  type: "offer" | "answer" | "candidate";
  senderId: string;
  data: any;
}

export interface VideoCallProps {
  userId: string;
  remoteUserId: string | null;
  className?: string;
}

export interface VideoStreamProps {
  stream: MediaStream | null;
  label: string;
  isMirrored?: boolean;
  isMuted?: boolean;
  className?: string;
}

export interface PlayerPlaceholderProps {
  label: string;
  className?: string;
}
