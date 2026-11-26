/** A page number, or a gap ("…") between non-adjacent pages. */
export type PaginationItem = number | "gap";

/**
 * Pages to show: the first and last, and the current one with its neighbours; gaps stand for the pages between.
 * 1 of 3 → [1, 2, 3]; 5 of 10 → [1, "gap", 4, 5, 6, "gap", 10].
 */
export function paginationItems(page: number, pageCount: number): PaginationItem[] {
  const pages = [...new Set([1, page - 1, page, page + 1, pageCount])]
    .filter((value) => value >= 1 && value <= pageCount)
    .sort((a, b) => a - b);

  return pages.flatMap((value, index) => {
    const previous = pages[index - 1];
    if (previous === undefined || value - previous === 1) return [value];
    // A gap of one page shows that page instead of "…".
    return value - previous === 2 ? [previous + 1, value] : ["gap" as const, value];
  });
}
