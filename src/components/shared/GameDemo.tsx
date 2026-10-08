'use client';

import { useEffect, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { ChevronRight, Plus, User } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * A miniature, self-playing version of the /game page for the landing hero:
 * two video tiles, the board and a moves list, all driven by one scripted game.
 * It is decorative, so nothing in it is interactive.
 */

// Swap these for any image URLs you like. If one fails to load, the tile falls
// back to a plain avatar icon.
const PLAYER_IMAGES = {
  you: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=70',
  opponent: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=480&q=70',
} as const;

// Morphy vs. Duke of Brunswick and Count Isouard, "The Opera Game" (Paris, 1858).
const GAME =
  'e4 e5 Nf3 d6 d4 Bg4 dxe5 Bxf3 Qxf3 dxe5 Bc4 Nf6 Qb3 Qe7 Nc3 c6 Bg5 b5 Nxb5 cxb5 Bxb5+ Nbd7 O-O-O Rd8 Rxd7 Rxd7 Rd1 Qe6 Bxd7+ Nxd7 Qb8+ Nxb8 Rd8#'.split(
    ' ',
  );

interface Frame {
  fen: string;
  san: string;
  from: string;
  to: string;
}

// Position after every ply, computed once. Frame 0 is the starting position.
const FRAMES: Frame[] = (() => {
  const chess = new Chess();
  const frames: Frame[] = [{ fen: chess.fen(), san: '', from: '', to: '' }];
  for (const san of GAME) {
    const move = chess.move(san);
    frames.push({ fen: chess.fen(), san: move.san, from: move.from, to: move.to });
  }
  return frames;
})();

const LAST = FRAMES.length - 1;
const MOVE_MS = 1000;
const START_PAUSE_MS = 1400;
const END_PAUSE_MS = 4000;

const ring = { boxShadow: 'inset 0 0 0 3px hsl(var(--primary))' };

function VideoTile({
  label,
  src,
  active,
}: {
  label: string;
  src: string;
  active: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-full pt-[75%]">
      <div
        className={cn(
          'absolute inset-0 overflow-hidden rounded-md border bg-secondary transition-colors duration-300',
          active ? 'border-primary' : 'border-border',
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
              'h-1.5 w-1.5 rounded-full',
              active ? 'animate-pulse bg-primary motion-reduce:animate-none' : 'bg-muted-foreground',
            )}
          />
          {label}
        </span>
      </div>
    </div>
  );
}

export default function GameDemo() {
  const [ply, setPly] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [visible, setVisible] = useState(false); // false while hidden below the lg breakpoint
  const scrollRef = useRef<HTMLDivElement>(null);

  // The hero hides this below the lg breakpoint, so don't animate while hidden.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    setVisible(query.matches);
    const onChange = (e: MediaQueryListEvent) => setVisible(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Play the game one ply at a time, pause on the checkmate, then start over.
  useEffect(() => {
    if (!visible) return;
    if (reduceMotion) {
      setPly(LAST);
      return;
    }
    const delay = ply === 0 ? START_PAUSE_MS : ply === LAST ? END_PAUSE_MS : MOVE_MS;
    const timer = setTimeout(() => setPly((p) => (p >= LAST ? 0 : p + 1)), delay);
    return () => clearTimeout(timer);
  }, [ply, reduceMotion, visible]);

  // Keep the latest move in view inside the list (never scrolls the page).
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [ply]);

  const frame = FRAMES[ply];
  const played = FRAMES.slice(1, ply + 1);
  const finished = ply === LAST;
  const whiteToMove = ply % 2 === 0;

  return (
    <figure className="mx-auto w-full max-w-4xl text-left">
      <div
        aria-hidden
        className="rounded-xl border border-border bg-card/60 p-3 shadow-2xl shadow-black/40 backdrop-blur sm:p-4"
      >
        {/* Status row, like the pill in the /game header */}
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 font-medium">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
            {finished ? 'Checkmate · White wins' : 'Match found!'}
          </span>
          <span className="text-muted-foreground">Live preview</span>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_1.9fr_1fr] lg:gap-4">
          {/* Video call + Next Player */}
          <div className="order-2 flex flex-col gap-3 lg:order-1">
            <div className="grid flex-grow grid-cols-2 content-start gap-3 lg:grid-cols-1">
              <VideoTile label="Opponent" src={PLAYER_IMAGES.opponent} active={!finished && !whiteToMove} />
              <VideoTile label="You" src={PLAYER_IMAGES.you} active={!finished && whiteToMove} />
            </div>
            <div className={cn(buttonVariants({ size: 'sm' }), 'h-10 w-full gap-1 text-sm')}>
              Next Player
              <ChevronRight />
            </div>
          </div>

          {/* Board */}
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-md">
              <Chessboard
                id="hero-demo"
                position={frame.fen}
                arePiecesDraggable={false}
                areArrowsAllowed={false}
                animationDuration={ply === 0 || reduceMotion ? 0 : 300}
                customDarkSquareStyle={{ backgroundColor: 'hsl(var(--primary) / 0.5)' }}
                customLightSquareStyle={{ backgroundColor: 'hsl(var(--foreground) / 0.78)' }}
                customSquareStyles={frame.from ? { [frame.from]: ring, [frame.to]: ring } : {}}
              />
            </div>
          </div>

          {/* Moves + New Match */}
          <div className="order-3 flex flex-col gap-3">
            <div className="flex h-44 flex-col rounded-lg border border-border bg-muted p-3 lg:h-auto lg:flex-1">
              <h2 className="text-sm font-semibold">Moves</h2>
              {/* Absolutely positioned so a long game scrolls here instead of
                  stretching the card taller than the board. */}
              <div className="relative mt-2 min-h-0 flex-1">
                <div
                  ref={scrollRef}
                  className="scrollbar-thin absolute inset-0 overflow-y-auto pr-1"
                >
                  <div className="grid grid-cols-2 gap-x-2 text-sm tabular-nums">
                    {played.map((m, i) => (
                      <div
                        key={i}
                        className={cn(
                          'animate-fade-in py-1 motion-reduce:animate-none',
                          i % 2 === 0 ? 'text-yellow-100' : 'text-gray-300',
                          i === ply - 1 && 'font-semibold',
                        )}
                      >
                        {i % 2 === 0 && <span className="mr-1.5">{i / 2 + 1}.</span>}
                        {m.san}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'h-10 w-full gap-1 text-sm')}>
              <Plus />
              New Match
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        A preview of a Chess P2P match: a video call with an opponent, a chessboard where pieces
        move on their own, and a list of moves that grows as the game goes on.
      </figcaption>
    </figure>
  );
}
