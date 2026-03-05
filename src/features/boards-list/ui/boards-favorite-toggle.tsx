import { StarIcon } from "lucide-react";
import { cn } from "@/shared/lib/css";

export function BoardsFavoriteToggle({
  isFavorite,
  onToggle,
}: {
  isFavorite?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="transition-colors hover:opacity-70"
    >
      <StarIcon
        className={cn(
          "w-5 h-5",
          isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400",
        )}
      />
    </button>
  );
}
