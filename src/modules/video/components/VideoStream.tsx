import { useEffect, useRef } from "react";
import { cn } from "@/common/libs/utils";
import PlayerPlaceholder from "./PlayerPlaceholder";
import { VideoStreamProps } from "../types/video.types";

/**
 * Elementary component to display a WebRTC video stream with custom orientation and label
 */
export default function VideoStream({
  stream,
  label,
  isMirrored = true,
  isMuted = false,
  className,
}: VideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return <PlayerPlaceholder label={label} className={className} />;
  }

  return (
    <div className={cn("relative w-full pt-[75%]", className)}>
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isMuted}
          style={isMirrored ? { transform: "scaleX(-1)" } : undefined}
          className="h-full w-full rounded-lg bg-gray-700 object-cover"
        />
      </div>
    </div>
  );
}
