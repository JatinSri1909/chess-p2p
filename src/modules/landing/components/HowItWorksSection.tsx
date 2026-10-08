import { STEPS } from "../constants/landing.constants";

/**
 * Modular How It Works section explaining the 3 steps to play
 */
export default function HowItWorksSection() {
  return (
    <section className="border-t border-border py-20">
      <p className="text-xs font-medium uppercase tracking-widest text-primary">How it works</p>
      <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        From the homepage to your first move in three steps.
      </h2>

      <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative md:pr-6">
            <span className="text-sm font-semibold tabular-nums text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div aria-hidden className="mt-3 h-px w-full bg-border" />
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
