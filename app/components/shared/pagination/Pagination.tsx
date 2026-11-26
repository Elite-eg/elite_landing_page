"use client";

import { useId } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { intlLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { PageNumberLink } from "./PageNumberLink";
import { PageStepLink } from "./PageStepLink";
import { paginationItems } from "./paginationItems";

export interface PaginationProps {
  /** Current page (1-based), on the navy pill. Pass the page just picked to move the pill before the new items load. */
  page: number;
  pageCount: number;
  /** URL of a page: every page is a real link (crawlable, opens in a new tab). */
  getHref: (page: number) => string;
  /**
   * Handles a click in place (e.g. updates the page's query) instead of navigating to `getHref`. The page then stays
   * where it is, or scrolls to `scrollTargetId`.
   */
  onPageChange?: (page: number) => void;
  /** With `onPageChange`: id of the element to scroll back up to (the top of the list). */
  scrollTargetId?: string;
  /** Items in all pages; with `pageSize`, shows "Showing 1–9 of 12" under the track. */
  total?: number;
  pageSize?: number;
  /** Accessible name of the nav (default "Results pages"). */
  label?: string;
  className?: string;
}

/**
 * Shared pagination: one white track with Previous / Next at its ends (dimmed on the first / last page) and the page
 * numbers between them (first, last, the current one and its neighbours, "…" for the rest). The navy pill glides to
 * the chosen page. On phones the numbers give way to "Page 2 of 5", so the track always fits. Renders nothing for a
 * single page.
 *
 * @example
 * <Pagination page={page} pageCount={pageCount} getHref={(p) => `${ROUTES.x}?page=${p}`} total={total} pageSize={9} />
 */
export function Pagination({
  page,
  pageCount,
  getHref,
  onPageChange,
  scrollTargetId,
  total,
  pageSize,
  label,
  className,
}: PaginationProps) {
  const t = useTranslations("pagination");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const indicatorId = useId();

  if (pageCount <= 1) return null;

  const format = new Intl.NumberFormat(intlLocale(locale)).format;
  const current = Math.min(Math.max(page, 1), pageCount);
  const selectHandler = (target: number) =>
    onPageChange &&
    (() => {
      onPageChange(target);
      if (scrollTargetId) {
        document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  const divider = <li aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-edge" />;

  return (
    <nav aria-label={label ?? t("label")} className={cn("flex flex-col items-center gap-3", className)}>
      <ul className="isolate flex items-center gap-1 rounded-full border border-edge bg-surface p-1.5 shadow-card">
        <li>
          <PageStepLink
            direction="previous"
            label={t("previous")}
            href={getHref(Math.max(current - 1, 1))}
            disabled={current <= 1}
            onSelect={selectHandler(current - 1)}
          />
        </li>
        {divider}

        {paginationItems(current, pageCount).map((item, index) =>
          item === "gap" ? (
            <li key={`gap-${index}`} aria-hidden="true" className="hidden size-10 place-items-center text-ink-400 sm:grid">
              …
            </li>
          ) : (
            <li key={item} className="hidden sm:block">
              <PageNumberLink
                label={format(item)}
                ariaLabel={t("page", { page: format(item) })}
                href={getHref(item)}
                isCurrent={item === current}
                indicatorId={indicatorId}
                onSelect={selectHandler(item)}
              />
            </li>
          )
        )}
        <li className="px-2 text-caption font-medium text-body sm:hidden">
          <motion.span key={current} variants={fadeIn} initial="hidden" animate="visible" className="block whitespace-nowrap">
            {t("pageOf", { page: format(current), count: format(pageCount) })}
          </motion.span>
        </li>

        {divider}
        <li>
          <PageStepLink
            direction="next"
            label={t("next")}
            href={getHref(Math.min(current + 1, pageCount))}
            disabled={current >= pageCount}
            onSelect={selectHandler(current + 1)}
          />
        </li>
      </ul>

      {total !== undefined && pageSize !== undefined && (
        <p className="text-xs text-content">
          {t("range", {
            from: format((current - 1) * pageSize + 1),
            to: format(Math.min(current * pageSize, total)),
            total: format(total),
          })}
        </p>
      )}
    </nav>
  );
}
