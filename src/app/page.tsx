import Link from 'next/link';
import { ArrowRight, Github, SkipForward, UserX, Users, Video, Zap } from 'lucide-react';
import Footer from '@/components/shared/Footer';
import GameDemo from '@/components/shared/GameDemo';
import PageBackdrop from '@/components/shared/PageBackdrop';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const REPO_URL = 'https://github.com/JatinSri1909/chess-p2p';

const STEPS = [
  {
    title: 'Press play',
    body: 'No account and no form. You go straight into the queue.',
  },
  {
    title: 'Get paired',
    body: 'You are matched with another player and a live video call opens.',
  },
  {
    title: 'Play, then move on',
    body: 'Finish the game, or hit Next Player to find someone new.',
  },
] as const;

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant pairing',
    body: 'Like Omegle for chess players. Connect with a random opponent from anywhere in the world the moment one is waiting.',
    span: 'md:col-span-4',
  },
  {
    icon: UserX,
    title: 'No sign-up',
    body: 'Jump straight into the action. No registration needed.',
    span: 'md:col-span-2',
  },
  {
    icon: Video,
    title: 'Face to face',
    body: 'A peer-to-peer video call runs next to the board, so you play a person, not a username.',
    span: 'md:col-span-2',
  },
  {
    icon: Users,
    title: 'All skill levels',
    body: 'From beginners to masters, find your perfect match.',
    span: 'md:col-span-2',
  },
  {
    icon: SkipForward,
    title: 'One click to the next game',
    body: 'Not feeling this opponent? Move on without leaving the page.',
    span: 'md:col-span-2',
  },
] as const;

const rise = 'animate-fade-up [animation-fill-mode:backwards] motion-reduce:animate-none';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background">
      <PageBackdrop />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Nav */}
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
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-9 gap-2 px-3')}
            >
              <Github aria-hidden />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <Link
              href="/game"
              className={cn(buttonVariants({ size: 'sm' }), 'h-9 px-4 text-sm font-semibold')}
            >
              Play now
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="pb-24 pt-12 text-center sm:pt-20">
          <h1
            className={cn(
              rise,
              'mx-auto max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl',
            )}
          >
            Chess with a stranger.
            <br />
            <span className="text-primary">Face to face.</span>
          </h1>

          <p
            className={cn(rise, 'mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground')}
            style={{ animationDelay: '90ms' }}
          >
            Press play and you are paired with the next player in the queue. A real board, a live
            video call, and no account to make.
          </p>

          <div
            className={cn(rise, 'mt-9 flex flex-wrap items-center justify-center gap-3')}
            style={{ animationDelay: '180ms' }}
          >
            <Link
              href="/game"
              className={cn(
                buttonVariants(),
                'group h-12 gap-2 px-7 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30',
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
              className={cn(buttonVariants({ variant: 'outline' }), 'h-12 gap-2 px-6 text-base')}
            >
              <Github aria-hidden />
              View source
            </a>
          </div>

          <p
            className={cn(rise, 'mt-5 text-sm text-muted-foreground')}
            style={{ animationDelay: '260ms' }}
          >
            Free. Works in your browser. Allow camera access when asked.
          </p>

          <div className={cn(rise, 'mt-14 sm:mt-16')} style={{ animationDelay: '340ms' }}>
            <GameDemo />
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-border py-20">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">How it works</p>
          <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            From the homepage to your first move in three steps.
          </h2>

          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative md:pr-6">
                <span className="text-sm font-semibold tabular-nums text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div aria-hidden className="mt-3 h-px w-full bg-border" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section className="pb-20">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">Why play here</p>
          <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Built to get you playing, not signing up.
          </h2>

          <ul className="mt-12 grid gap-4 md:grid-cols-6">
            {FEATURES.map(({ icon: Icon, title, body, span }) => (
              <li
                key={title}
                className={cn(
                  'group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40',
                  span,
                )}
              >
                <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-secondary text-primary transition-colors group-hover:border-primary/40">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Closing call to action */}
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
                'group relative mt-8 h-12 gap-2 px-8 text-base font-semibold shadow-lg shadow-primary/20',
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
      </div>

      <Footer />
    </main>
  );
}