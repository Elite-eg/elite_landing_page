import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DetailItem {
  label: string;
  value: ReactNode;
  /** Highlights the row (e.g. a total). */
  emphasis?: boolean;
  /** Render the value left-to-right (IBANs, references, emails). */
  ltr?: boolean;
}

interface DetailListProps {
  items: DetailItem[];
  className?: string;
}

/** Label / value rows used by the order summary and result screens. */
export function DetailList({ items, className }: DetailListProps) {
  return (
    <dl className={cn("divide-y divide-edge", className)}>
      {items.map(({ label, value, emphasis, ltr }) => (
        <div key={label} className="flex items-center justify-between gap-4 py-3">
          <dt className={cn("text-caption", emphasis ? "font-bold text-primary" : "text-content")}>{label}</dt>
          <dd
            dir={ltr ? "ltr" : undefined}
            className={cn("text-end font-semibold", emphasis ? "text-lg font-bold text-secondary-dark" : "text-caption text-body")}
          >
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
