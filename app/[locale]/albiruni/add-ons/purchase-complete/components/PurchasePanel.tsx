import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PurchasePanelProps {
  /** Id of the title, which names the section. */
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/** One white card of the page (Figma "Download" / "Order"): 24px title, then its content. */
export function PurchasePanel({ id, title, children, className }: PurchasePanelProps) {
  return (
    <section
      aria-labelledby={id}
      className={cn("flex flex-col gap-4 rounded-3xl border border-edge bg-surface p-6 sm:p-8", className)}
    >
      <h2 id={id} className="text-h3 text-body">
        {title}
      </h2>
      {children}
    </section>
  );
}
