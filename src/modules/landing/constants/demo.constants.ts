import { Chess } from "chess.js";
import { DemoFrame } from "../types/landing.types";

export const PLAYER_IMAGES = {
  you: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=70",
  opponent: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=480&q=70",
} as const;

// Morphy vs. Duke of Brunswick and Count Isouard, "The Opera Game" (Paris, 1858).
export const OPERA_GAME_MOVES =
  "e4 e5 Nf3 d6 d4 Bg4 dxe5 Bxf3 Qxf3 dxe5 Bc4 Nf6 Qb3 Qe7 Nc3 c6 Bg5 b5 Nxb5 cxb5 Bxb5+ Nbd7 O-O-O Rd8 Rxd7 Rxd7 Rd1 Qe6 Bxd7+ Nxd7 Qb8+ Nxb8 Rd8#".split(
    " "
  );

// Precompute demo frames
export const DEMO_FRAMES: DemoFrame[] = (() => {
  const chess = new Chess();
  const frames: DemoFrame[] = [{ fen: chess.fen(), san: "", from: "", to: "" }];
  for (const san of OPERA_GAME_MOVES) {
    const move = chess.move(san);
    frames.push({ fen: chess.fen(), san: move.san, from: move.from, to: move.to });
  }
  return frames;
})();

export const DEMO_TIMING = {
  moveMs: 1000,
  startPauseMs: 1400,
  endPauseMs: 4000,
} as const;

export const DEMO_RING_STYLE = {
  boxShadow: "inset 0 0 0 3px hsl(var(--primary))",
} as const;
