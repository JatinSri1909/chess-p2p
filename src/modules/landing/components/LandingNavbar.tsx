import Link from "next/link";
import { Github } from "lucide-react";
import { buttonVariants } from "@/common/components/ui";
import { cn } from "@/common/libs/utils";
import { REPO_URL } from "@/common/constants/navigation.constants";

/**
 * Elementary top navbar for the landing page
 */
export default function LandingNavbar() {
  return (
    <nav className="flex items-center justify-between py-5" aria-label="Main">
      <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
        <span
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-md bg-primary text-lg leading-none text-primary-foreground"
        >
          ♞
        </span>
        Chess P2P
      </Link>
      <div className="flex items-center gap-1">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-9 gap-2 px-3")}
        >
          <Github aria-hidden />
          <span className="hidden sm:inline">GitHub</span>
        </a>
        <Link
          href="/game"
          className={cn(buttonVariants({ size: "sm" }), "h-9 px-4 text-sm font-semibold")}
        >
          Play now
        </Link>
      </div>
    </nav>
  );
}
