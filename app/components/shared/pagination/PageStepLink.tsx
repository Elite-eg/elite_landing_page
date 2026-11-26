"use client";

import type { MouseEvent } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface PageStepLinkProps {
  direction: "previous" | "next";
  label: string;
  href: string;
  /** First page (previous) or last page (next): shown dimmed, so the track keeps its width. */
  disabled: boolean;
  /** Handles the click in place; without it the link navigates. */
  onSelect?: () => void;
}

const STEP_CLASSES =
  "group flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-caption font-medium transition-colors duration-200";

/** "Previous" / "Next" at the ends of the pagination track. The chevron points the way (mirrored in RTL) and nudges on hover. */
export function PageStepLink({ direction, label, href, disabled, onSelect }: PageStepLinkProps) {
  const isNext = direction === "next";
  const Icon = isNext ? FiChevronRight : FiChevronLeft;
  const icon = (
    <Icon
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 transition-transform duration-200 ease-out-brand rtl:-scale-x-100",
        !disabled &&
          (isNext
            ? "group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            : "group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5")
      )}
    />
  );
  const content = isNext ? (
    <>
      {label}
      {icon}
    </>
  ) : (
    <>
      {icon}
      {label}
    </>
  );

  if (disabled) {
    return (
      <span role="link" aria-disabled="true" className={cn(STEP_CLASSES, "cursor-not-allowed text-content/40")}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      scroll={onSelect ? false : undefined}
      rel={isNext ? "next" : "prev"}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        if (!onSelect) return;
        event.preventDefault();
        onSelect();
      }}
      className={cn(STEP_CLASSES, "text-ink-700 hover:bg-surface-alt hover:text-primary")}
    >
      {content}
    </Link>
  );
}
