import { User } from 'lucide-react';

interface PlayerTagProps {
  name: string;
  side?: string;
  active?: boolean;
}

// Avatar + name + side, used above and below the board on the landing preview
// and on the /game page.
export default function PlayerTag({ name, side, active }: PlayerTagProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-secondary text-muted-foreground">
        <User className="h-4 w-4" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-medium">{name}</span>
        {side && (
          <span className="block text-xs text-muted-foreground">
            {side}
            {active && <span className="text-primary"> · to move</span>}
          </span>
        )}
      </span>
    </div>
  );
}
