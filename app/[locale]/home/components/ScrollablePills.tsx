import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ScrollablePillsProps {
  children: ReactNode;
  className?: string;
}

/**
 * Centres a segmented pill track; on phones, where it is wider than the screen, it scrolls sideways from edge to
 * edge instead (auto margins drop to 0 on overflow, so the start of the track stays reachable).
 */
export function ScrollablePills({ children, className }: ScrollablePillsProps) {
  return (
    <div className={cn("-mx-4 overflow-x-auto px-4 py-1 sm:mx-0 sm:px-1", className)}>
      <div className="mx-auto w-max">{children}</div>
    </div>
  );
}
