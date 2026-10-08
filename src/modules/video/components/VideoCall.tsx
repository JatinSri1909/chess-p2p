import { useEffect, useRef } from "react";
import { cn } from "@/common/libs/utils";
import { useWebRTC } from "../hooks/useWebRTC";
import VideoStream from "./VideoStream";
import { VideoCallProps } from "../types/video.types";

/**
 * Modular video call coordinator for local and remote streams
 */
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
    <div className={cn("grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:gap-4", className)}>
      <VideoStream
        stream={localStream}
        label="You"
        isMirrored={true}
        isMuted={true}
      />
      <VideoStream
        stream={remoteStream}
        label="Opponent"
        isMirrored={false}
        isMuted={false}
      />
    </div>
  );
}
