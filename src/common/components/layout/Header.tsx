import Link from "next/link";
import { cn } from "@/common/libs/utils";

export interface HeaderProps {
  status?: string;
  matchFound?: boolean;
}

export default function Header({ status = "idle", matchFound = false }: HeaderProps) {
  const getDotColor = () => {
    if (matchFound) return "bg-primary";
    switch (status.toLowerCase()) {
      case "connecting":
        return "bg-yellow-500";
      case "waiting":
        return "bg-blue-500";
      case "connected":
      case "matched":
        return "bg-primary";
      default:
        return "bg-muted-foreground";
    }
  };

  return (
    <nav
      className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6"
      aria-label="Main"
    >
      <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
        <span
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-md bg-primary text-lg leading-none text-primary-foreground"
        >
          ♞
        </span>
        Chess P2P
      </Link>

      <div
        role="status"
        className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium"
      >
        <span
          className={cn(
            "h-2 w-2 animate-pulse rounded-full motion-reduce:animate-none",
            getDotColor()
          )}
        />
        <span className={matchFound ? "text-foreground" : "capitalize text-muted-foreground"}>
          {matchFound ? "Match found!" : status}
        </span>
      </div>
    </nav>
  );
}
