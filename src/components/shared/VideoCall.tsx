import { User } from "lucide-react";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useEffect, useRef } from "react";

// Component to display a video stream with a label
function VideoStream({
  stream,
  label,
}: {
  stream: MediaStream | null;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return <PlayerPlaceholder label={label} />;
  }

  return (
    <div className="relative w-full pt-[75%]">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={label === "You"}
          style={{ transform: "scaleX(-1)" }}
          className="w-full h-full object-cover rounded-lg bg-gray-700"
        />
      </div>
    </div>
  );
}

// Placeholder component when no video stream is available
function PlayerPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative w-full pt-[75%]">
      <div className="absolute inset-0 bg-muted border border-border rounded-lg p-6 flex flex-col items-center justify-center">
        <User className="w-1/3 h-1/3 text-muted-foreground" />
        <span className="mt-4 text-lg text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

// Main VideoCall component managing local and remote streams
interface VideoCallProps {
  userId: string;
  remoteUserId: string | null;
  className?: string;
}

export default function VideoCall({ userId, remoteUserId, className }: VideoCallProps) {
  const { localStream, remoteStream, resetConnection } = useWebRTC(userId, remoteUserId);
  const prevRemoteUserId = useRef<string | null>(null);

  useEffect(() => {
    // Only reset if we had a previous connection and now don't have one
    if (prevRemoteUserId.current && !remoteUserId) {
      resetConnection();
    }
    prevRemoteUserId.current = remoteUserId;
  }, [remoteUserId, resetConnection]);

  return (
    <div className={`flex flex-col gap-4 ${className || ""}`}>
      <VideoStream stream={localStream} label="You" />
      <VideoStream stream={remoteStream} label="Opponent" />
    </div>
  );
}