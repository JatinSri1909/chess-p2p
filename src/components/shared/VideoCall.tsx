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
      <div className="absolute inset-0 overflow-hidden rounded-md border border-border bg-secondary">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={label === "You"}
          style={{ transform: "scaleX(-1)" }}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-2 left-2 rounded-md bg-background/70 px-2 py-0.5 text-xs font-medium backdrop-blur">
          {label}
        </span>
      </div>
    </div>
  );
}

// Placeholder component when no video stream is available
function PlayerPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative w-full pt-[75%]">
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md border border-border bg-secondary p-6">
        <User className="h-1/3 w-1/3 text-muted-foreground/60" aria-hidden />
        <span className="mt-3 text-sm font-medium text-muted-foreground">{label}</span>
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
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      <VideoStream stream={localStream} label="You" />
      <VideoStream stream={remoteStream} label="Opponent" />
    </div>
  );
}