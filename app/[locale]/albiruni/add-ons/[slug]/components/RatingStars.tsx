import { FiStar } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  /** Out of 5; rounded to whole stars. */
  rating: number;
  size?: "sm" | "md";
}

const STARS = [1, 2, 3, 4, 5] as const;

/** Five stars, filled orange up to the rating (Figma "stars"). Decorative: callers give the rating as text. */
export function RatingStars({ rating, size = "md" }: RatingStarsProps) {
  const filled = Math.round(rating);

  return (
    <span aria-hidden="true" className="inline-flex gap-0.5">
      {STARS.map((star) => (
        <FiStar
          key={star}
          className={cn("fill-current", size === "sm" ? "size-3" : "size-3.5", star <= filled ? "text-secondary" : "text-edge")}
        />
      ))}
    </span>
  );
}
