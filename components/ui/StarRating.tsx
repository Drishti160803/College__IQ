import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({ rating, size = "md", showValue = true, className }: StarRatingProps) {
  const sizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };
  const starSizes = { sm: 12, md: 14, lg: 16 };
  const filled = Math.floor(rating);
  const partial = rating % 1;

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          if (i < filled) return <Star key={i} fill="full" size={starSizes[size]} />;
          if (i === filled && partial >= 0.5) return <Star key={i} fill="half" size={starSizes[size]} />;
          return <Star key={i} fill="empty" size={starSizes[size]} />;
        })}
      </span>
      {showValue && (
        <span className={cn("font-semibold text-amber-600", sizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}

function Star({ fill, size }: { fill: "full" | "half" | "empty"; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      {fill === "half" && (
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M8 1.5l1.8 3.6 4 .58-2.9 2.83.68 4L8 10.27l-3.58 1.88.68-4L2.2 5.68l4-.58z"
        fill={fill === "full" ? "#f59e0b" : fill === "half" ? "url(#half)" : "#e2e8f0"}
      />
    </svg>
  );
}
