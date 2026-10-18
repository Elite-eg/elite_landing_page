import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "primary" | "secondary" | "accent" | "neutral" | "glass";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  icon?: ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/15 text-secondary-dark",
  accent: "bg-accent/10 text-accent",
  neutral: "bg-surface-muted text-content",
  glass: "border border-white/25 bg-white/15 text-white backdrop-blur-md",
};

const SIZE_CLASSES = {
  sm: "gap-1 rounded-md px-2 py-0.5 text-[11px]",
  md: "gap-1.5 rounded-lg px-3 py-1 text-xs",
} as const;

export function Badge({ children, variant = "primary", size = "md", icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center font-bold leading-tight",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
    >
      {icon && (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
