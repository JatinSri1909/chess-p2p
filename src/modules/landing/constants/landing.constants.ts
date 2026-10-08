import { FeatureItem, StepItem } from "../types/landing.types";

export const STEPS: readonly StepItem[] = [
  {
    title: "Press play",
    body: "No account and no form. You go straight into the queue.",
  },
  {
    title: "Get paired",
    body: "You are matched with another player and a live video call opens.",
  },
  {
    title: "Play, then move on",
    body: "Finish the game, or hit Next Player to find someone new.",
  },
] as const;

export const FEATURES: readonly FeatureItem[] = [
  {
    glyph: "\u265E\uFE0E", // knight
    title: "Instant pairing",
    body: "Like Omegle for chess players. Connect with a random opponent from anywhere in the world the moment one is waiting.",
    span: "md:col-span-4",
  },
  {
    glyph: "\u265F\uFE0E", // pawn
    title: "No sign-up",
    body: "Jump straight into the action. No registration needed.",
    span: "md:col-span-2",
  },
  {
    glyph: "\u265C\uFE0E", // rook
    title: "Face to face",
    body: "A peer-to-peer video call runs next to the board, so you play a person, not a username.",
    span: "md:col-span-2",
  },
  {
    glyph: "\u265B\uFE0E", // queen
    title: "All skill levels",
    body: "From beginners to masters, find your perfect match.",
    span: "md:col-span-2",
  },
  {
    glyph: "\u265D\uFE0E", // bishop
    title: "One click to the next game",
    body: "Not feeling this opponent? Move on without leaving the page.",
    span: "md:col-span-2",
  },
] as const;
