import { ChevronRight } from "lucide-react";
import { Button } from "@/common/components/ui";
import { cn } from "@/common/libs/utils";

export interface NextPlayerButtonProps {
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  className?: string;
}

export default function NextPlayerButton({
  onClick,
  disabled = false,
  className,
}: NextPlayerButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn("h-12 w-full text-lg lg:h-[4rem] lg:text-[2rem]", className)}
    >
      <ChevronRight className="mr-2 !h-6 !w-6 lg:!h-8 lg:!w-8" />
      <span>Next Player</span>
    </Button>
  );
}
