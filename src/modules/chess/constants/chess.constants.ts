export const CHESS_BOARD_STYLES = {
  customDarkSquareStyle: { backgroundColor: "hsl(var(--primary) / 0.5)" },
  customLightSquareStyle: { backgroundColor: "hsl(var(--foreground) / 0.78)" },
  customBoardStyle: {
    borderRadius: "0.5rem",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
  },
} as const;
