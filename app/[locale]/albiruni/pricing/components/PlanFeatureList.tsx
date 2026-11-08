import { FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface PlanFeatureListProps {
  /** Already-translated lines. */
  features: string[];
  /** Lighter text and orange checks for the navy card. */
  featured?: boolean;
}

/** Checked list of what a plan includes. */
export function PlanFeatureList({ features, featured = false }: PlanFeatureListProps) {
  return (
    <ul className="flex flex-col gap-2.5">
      {features.map((feature) => (
        <li
          key={feature}
          className={cn("flex items-start gap-2.5 text-caption", featured ? "text-navy-100" : "text-ink-700")}
        >
          <FiCheck
            className={cn("mt-1 size-4 shrink-0", featured ? "text-secondary" : "text-success")}
            strokeWidth={2.6}
            aria-hidden="true"
          />
          {feature}
        </li>
      ))}
    </ul>
  );
}
