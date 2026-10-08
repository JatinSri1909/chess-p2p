import { Plus } from "lucide-react";
import { Button } from "@/common/components/ui";
import { cn } from "@/common/libs/utils";

export interface NewMatchButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function NewMatchButton({
  onClick,
  disabled = false,
  className,
}: NewMatchButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={cn("h-12 w-full text-lg lg:h-[4rem]", className)}
    >
      <Plus className="mr-2 !h-6 !w-6 lg:!h-8 lg:!w-8" />
      <span className="lg:text-[2rem]">New Match</span>
    </Button>
  );
}
