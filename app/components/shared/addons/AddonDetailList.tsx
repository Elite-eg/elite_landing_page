import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AddonDetailItem {
  label: string;
  value: ReactNode;
  /** The row that sums up the list (an order's total): stronger label, bigger value. */
  emphasis?: boolean;
}

export interface AddonDetailListProps {
  items: AddonDetailItem[];
  className?: string;
}

/**
 * Label / value rows (Figma "Row/…"): muted label on the start side, value on the end side.
 * Add-on page facts, order summary, My purchases cards.
 */
export function AddonDetailList({ items, className }: AddonDetailListProps) {
  return (
    <dl className={cn("flex flex-col gap-3 text-caption", className)}>
      {items.map(({ label, value, emphasis }) => (
        <div key={label} className="flex items-baseline justify-between gap-3">
          <dt className={emphasis ? "font-medium text-body" : "text-content"}>{label}</dt>
          <dd className={cn("text-end text-body", emphasis ? "font-heading text-lg font-semibold" : "font-medium")}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
