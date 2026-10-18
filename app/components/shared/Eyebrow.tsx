import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps {
  children: ReactNode;
  /** "dark" renders on navy backgrounds. */
  tone?: "light" | "dark";
  className?: string;
}

/** Small orange pill shown above hero and section titles. */
export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-caption font-bold",
        tone === "dark" ? "bg-white/10 text-secondary" : "bg-secondary/10 text-secondary-dark",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-secondary" aria-hidden="true" />
      {children}
    </p>
  );
}
