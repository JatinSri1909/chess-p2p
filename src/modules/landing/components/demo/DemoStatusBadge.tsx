export interface DemoStatusBadgeProps {
  finished: boolean;
}

/**
 * Elementary status pill for demo showcase
 */
export default function DemoStatusBadge({ finished }: DemoStatusBadgeProps) {
  return (
    <div className="mb-3 flex items-center justify-between text-xs">
      <span className="flex items-center gap-2 font-medium">
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
        {finished ? "Checkmate · White wins" : "Match found!"}
      </span>
      <span className="text-muted-foreground">Live preview</span>
    </div>
  );
}
