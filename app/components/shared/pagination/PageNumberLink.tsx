"use client";

import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { layoutTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface PageNumberLinkProps {
  /** Already-formatted page number. */
  label: string;
  /** Accessible name ("Page 2"). */
  ariaLabel: string;
  href: string;
  isCurrent: boolean;
  /** Shared by every page link of one Pagination, so the navy pill glides from the old page to the new one. */
  indicatorId: string;
  /** Handles the click in place; without it the link navigates. */
  onSelect?: () => void;
}

/**
 * One page number in the pagination track. The current one sits on the navy pill; its number turns white 100ms in,
 * as the pill arrives (like FilterPills).
 */
export function PageNumberLink({ label, ariaLabel, href, isCurrent, indicatorId, onSelect }: PageNumberLinkProps) {
  return (
    <Link
      href={href}
      scroll={onSelect ? false : undefined}
      aria-label={ariaLabel}
      aria-current={isCurrent ? "page" : undefined}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        if (!onSelect && !isCurrent) return;
        event.preventDefault();
        if (!isCurrent) onSelect?.();
      }}
      className={cn(
        "relative grid size-10 place-items-center rounded-full text-caption font-medium transition-colors duration-200",
        isCurrent ? "text-surface delay-100" : "text-ink-700 hover:bg-surface-alt hover:text-primary"
      )}
    >
      {isCurrent && (
        <motion.span
          layoutId={indicatorId}
          transition={layoutTransition}
          aria-hidden="true"
          className="absolute inset-0 z-10 rounded-full bg-primary-dark shadow-card"
        />
      )}
      <span className="relative z-20">{label}</span>
    </Link>
  );
}
