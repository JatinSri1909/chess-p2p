'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  glyph: string;
  title: string;
  body: string;
  className?: string;
}

/**
 * A card for the "Why play here" grid. On devices that can hover, the green to
 * black noisy gradient fades in on hover. On touch devices there is no hover,
 * so the same effect is shown while the card is in the middle band of the
 * screen as the page is scrolled.
 */
export default function FeatureCard({ glyph, title, body, className }: FeatureCardProps) {
  const ref = useRef<HTMLLIElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: none)').matches) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '-35% 0px -35% 0px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      data-active={inView}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border p-6 transition-colors duration-300 hover:border-primary/40 data-[active=true]:border-primary/40',
        className,
      )}
    >
      <span
        aria-hidden
        className="feature-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-[active=true]:opacity-100 motion-reduce:transition-none"
      />

      <div className="relative">
        {/* Heading and glyph sit at opposite ends of the card */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <span
            aria-hidden
            className="-mt-1 block text-4xl leading-none text-primary transition-colors duration-300 group-hover:text-foreground group-data-[active=true]:text-foreground"
          >
            {glyph}
          </span>
        </div>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}
