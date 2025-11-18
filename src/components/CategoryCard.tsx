import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: LucideIcon;
  name: string;
  selected: boolean;
  onClick: () => void;
}

export const CategoryCard = ({ icon: Icon, name, selected, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 transition-all duration-300",
        "bg-card hover:shadow-md border-2",
        selected
          ? "border-primary shadow-glow scale-105"
          : "border-border hover:border-primary/50"
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            "rounded-xl p-4 transition-all duration-300",
            selected
              ? "bg-gradient-primary text-primary-foreground"
              : "bg-secondary text-foreground group-hover:bg-primary/10"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-medium text-sm text-foreground">{name}</span>
      </div>
      {selected && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent animate-pulse" />
      )}
    </button>
  );
};
