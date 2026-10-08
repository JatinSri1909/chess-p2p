import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { buttonVariants } from "@/common/components/ui";
import { cn } from "@/common/libs/utils";
import { REPO_URL } from "@/common/constants/navigation.constants";
import GameDemo from "./demo/GameDemo";

const rise = "animate-fade-up [animation-fill-mode:backwards] motion-reduce:animate-none";

/**
 * Modular Hero section for the landing page
 */
export default function HeroSection() {
  return (
    <section className="pb-24 pt-12 text-center sm:pt-20">
      <h1
        className={cn(
          rise,
          "mx-auto max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
        )}
      >
        Chess with a stranger.
        <br />
        <span className="text-primary">Face to face.</span>
      </h1>

      <p
        className={cn(rise, "mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground")}
        style={{ animationDelay: "90ms" }}
      >
        Press play and you are paired with the next player in the queue. A real board, a live
        video call, and no account to make.
      </p>

      <div
        className={cn(rise, "mt-9 flex flex-wrap items-center justify-center gap-3")}
        style={{ animationDelay: "180ms" }}
      >
        <Link
          href="/game"
          className={cn(
            buttonVariants(),
            "group h-12 gap-2 px-7 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
          )}
        >
          Start playing
          <ArrowRight
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 px-6 text-base")}
        >
          <Github aria-hidden />
          View source
        </a>
      </div>

      <p
        className={cn(rise, "mt-5 text-sm text-muted-foreground")}
        style={{ animationDelay: "260ms" }}
      >
        Free. Works in your browser. Allow camera access when asked.
      </p>

      <div className={cn(rise, "mt-14 sm:mt-16")} style={{ animationDelay: "340ms" }}>
        <GameDemo />
      </div>
    </section>
  );
}
