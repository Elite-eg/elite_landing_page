import { FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";

export type PlanFeatureMarker = "check" | "circle";

export interface PlanFeatureListProps {
  /** Already-translated lines. */
  features: string[];
  /** Lighter text and orange checks for the navy card. */
  featured?: boolean;
  /** "check" = bare check (pricing), "circle" = white check in a green disc (add-on page, Figma "Check/…"). */
  marker?: PlanFeatureMarker;
}

/** Checked list of what a plan or an add-on includes (Albiruni pricing, home pricing teaser, add-on page). */
export function PlanFeatureList({ features, featured = false, marker = "check" }: PlanFeatureListProps) {
  return (
    <ul className="flex flex-col gap-2.5">
      {features.map((feature) => (
        <li
          key={feature}
          className={cn("flex items-start gap-2.5 text-caption", featured ? "text-navy-100" : "text-ink-700")}
        >
          {marker === "circle" ? (
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success text-surface" aria-hidden="true">
              <FiCheck className="size-3" strokeWidth={3} />
            </span>
          ) : (
            <FiCheck
              className={cn("mt-1 size-4 shrink-0", featured ? "text-secondary" : "text-success")}
              strokeWidth={2.6}
              aria-hidden="true"
            />
          )}
          {feature}
        </li>
      ))}
    </ul>
  );
}
