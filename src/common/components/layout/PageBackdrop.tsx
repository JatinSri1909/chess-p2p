// Faint chessboard checker plus a soft primary glow behind the top of a page.
// Shared by the landing page and the /game page so they read as one product.
const checker = {
  backgroundImage:
    "linear-gradient(45deg, hsl(var(--foreground) / 0.04) 25%, transparent 25%, transparent 75%, hsl(var(--foreground) / 0.04) 75%), linear-gradient(45deg, hsl(var(--foreground) / 0.04) 25%, transparent 25%, transparent 75%, hsl(var(--foreground) / 0.04) 75%)",
  backgroundSize: "72px 72px",
  backgroundPosition: "0 0, 36px 36px",
  maskImage: "radial-gradient(ellipse 70% 100% at 50% 0%, black 20%, transparent 75%)",
  WebkitMaskImage: "radial-gradient(ellipse 70% 100% at 50% 0%, black 20%, transparent 75%)",
} as const;

export default function PageBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[44rem]"
        style={checker}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(ellipse_60%_50%_at_75%_30%,hsl(var(--primary)/0.14),transparent)]"
      />
    </>
  );
}
