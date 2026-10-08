import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/common/components/ui";
import { cn } from "@/common/libs/utils";

/**
 * Modular call to action section at the bottom of the landing page
 */
export default function CtaSection() {
  return (
    <section className="pb-24">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-14 text-center sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,hsl(var(--primary)/0.18),transparent)]"
        />
        <h2 className="relative text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready for your first game?
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
          Use a stable internet connection for the best experience.
        </p>
        <Link
          href="/game"
          className={cn(
            buttonVariants(),
            "group relative mt-8 h-12 gap-2 px-8 text-base font-semibold shadow-lg shadow-primary/20"
          )}
        >
          Start playing
          <ArrowRight
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
