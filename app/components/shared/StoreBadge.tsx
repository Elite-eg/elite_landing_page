import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StoreBadgeTone = "dark" | "light";

export interface StoreBadgeProps {
  href: string;
  /** Small line above the label ("Download on", a domain, ...). */
  caption: string;
  label: string;
  /** Logo shown before the text (Apple / Google Play / a product mark). */
  logo: ReactNode;
  /** "dark" on navy (footer), "light" on white or surface-alt sections. */
  tone?: StoreBadgeTone;
}

const TONE_CLASSES: Record<StoreBadgeTone, { badge: string; caption: string; label: string }> = {
  dark: {
    badge: "border-surface/20 bg-surface/5 hover:border-surface/40 hover:bg-surface/10 focus-visible:ring-offset-ink-900",
    caption: "text-content-dark",
    label: "text-surface",
  },
  light: {
    badge: "border-edge bg-surface hover:border-primary/30 hover:bg-surface-alt",
    caption: "text-content",
    label: "text-primary",
  },
};

/** External link badge with a logo, a caption and a label, as in the v4 footer store buttons. */
export function StoreBadge({ href, caption, label, logo, tone = "dark" }: StoreBadgeProps) {
  const styles = TONE_CLASSES[tone];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group/store inline-flex items-center gap-2.5 rounded-lg border py-1.5 pe-3.5 ps-2.5 transition duration-200 ease-out-brand",
        styles.badge
      )}
    >
      <span
        aria-hidden
        className="flex size-6 shrink-0 items-center justify-center transition-transform duration-300 ease-out-brand group-hover/store:scale-110 motion-reduce:transform-none [&>*]:size-full"
      >
        {logo}
      </span>
      <span className="flex flex-col items-start">
        <span className={cn("text-[0.625rem] leading-tight", styles.caption)}>{caption}</span>
        <span className={cn("text-caption font-semibold leading-tight", styles.label)}>{label}</span>
      </span>
    </a>
  );
}
