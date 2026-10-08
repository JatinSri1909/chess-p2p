'use client';

import { Chessboard } from 'react-chessboard';
import { User } from 'lucide-react';

/**
 * A static preview of what a match looks like, using the same board the
 * game page uses. It is not interactive: pieces can't be dragged, and the
 * position is a fixed Ruy Lopez after 3. Bb5. Every colour comes from the
 * theme variables in globals.css.
 */

const FEN = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3';

const MOVES = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'] as const;

const lastMoveRing = {
  boxShadow: 'inset 0 0 0 3px hsl(var(--primary))',
};

function Player({ name, side, active }: { name: string; side: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-secondary text-muted-foreground">
        <User className="h-4 w-4" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-medium">{name}</span>
        <span className="block text-xs text-muted-foreground">
          {side}
          {active && <span className="text-primary"> · to move</span>}
        </span>
      </span>
    </div>
  );
}

export default function LandingBoard() {
  return (
    <figure className="w-full max-w-[30rem]">
      <div className="rounded-xl border border-border bg-card p-3 shadow-2xl shadow-black/40 sm:p-4">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 font-medium">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
            Match found!
          </span>
          <span className="text-muted-foreground">Preview</span>
        </div>

        <div className="mb-3">
          <Player name="Opponent" side="Black" active />
        </div>

        <div className="overflow-hidden rounded-md" aria-hidden>
          <Chessboard
            id="landing-preview"
            position={FEN}
            arePiecesDraggable={false}
            allowDragOutsideBoard={false}
            animationDuration={0}
            customDarkSquareStyle={{ backgroundColor: 'hsl(var(--primary) / 0.5)' }}
            customLightSquareStyle={{ backgroundColor: 'hsl(var(--foreground) / 0.78)' }}
            customSquareStyles={{ f1: lastMoveRing, b5: lastMoveRing }}
          />
        </div>

        <div className="mt-3 flex items-end justify-between gap-4">
          <Player name="You" side="White" />
          <p className="pb-0.5 text-right text-xs text-muted-foreground">
            {MOVES.map((m, i) => (
              <span key={m + i}>
                {i % 2 === 0 && <span className="opacity-60">{i / 2 + 1}. </span>}
                <span className={i === MOVES.length - 1 ? 'font-semibold text-primary' : ''}>
                  {m}
                </span>{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
      <figcaption className="sr-only">
        A chess match in progress between you and an opponent, shown as a preview.
      </figcaption>
    </figure>
  );
}