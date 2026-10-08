import FeatureCard from "./FeatureCard";
import { FEATURES } from "../constants/landing.constants";

/**
 * Modular Features section displaying the feature grid
 */
export default function FeaturesSection() {
  return (
    <section className="pb-20">
      <p className="text-xs font-medium uppercase tracking-widest text-primary">Why play here</p>
      <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        Built to get you playing, not signing up.
      </h2>

      <ul className="mt-12 grid gap-4 md:grid-cols-6">
        {FEATURES.map(({ glyph, title, body, span }) => (
          <FeatureCard key={title} glyph={glyph} title={title} body={body} className={span} />
        ))}
      </ul>
    </section>
  );
}
