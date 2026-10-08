import { User } from "lucide-react";
import { cn } from "@/common/libs/utils";
import { PlayerPlaceholderProps } from "../types/video.types";

/**
 * Elementary placeholder component when video stream is absent
 */
export default function PlayerPlaceholder({ label, className }: PlayerPlaceholderProps) {
  return (
    <div className={cn("relative w-full pt-[75%]", className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-border bg-muted p-3 lg:p-6">
        <User className="h-1/3 w-1/3 text-muted-foreground" aria-hidden />
        <span className="mt-2 text-sm text-muted-foreground lg:mt-4 lg:text-lg">{label}</span>
      </div>
    </div>
  );
}
