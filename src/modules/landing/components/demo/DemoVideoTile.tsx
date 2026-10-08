"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/common/libs/utils";

export interface DemoVideoTileProps {
  label: string;
  src: string;
  active: boolean;
  className?: string;
}

/**
 * Elementary video tile for demo hero showcase
 */
export default function DemoVideoTile({
  label,
  src,
  active,
  className,
}: DemoVideoTileProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative w-full pt-[75%]", className)}>
      <div
        className={cn(
          "absolute inset-0 overflow-hidden rounded-md border bg-secondary transition-colors duration-300",
          active ? "border-primary" : "border-border"
        )}
      >
        {failed ? (
          <div className="grid h-full w-full place-items-center">
            <User className="h-1/3 w-1/3 text-muted-foreground/60" aria-hidden />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            loading="lazy"
            draggable={false}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
        <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1.5 rounded bg-background/70 px-1.5 py-0.5 text-[11px] font-medium backdrop-blur">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              active ? "animate-pulse bg-primary motion-reduce:animate-none" : "bg-muted-foreground"
            )}
          />
          {label}
        </span>
      </div>
    </div>
  );
}
