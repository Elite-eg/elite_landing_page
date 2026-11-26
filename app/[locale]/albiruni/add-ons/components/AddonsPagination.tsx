"use client";

import { Pagination } from "@/app/components/shared/pagination/Pagination";
import { ADDONS_PAGE_SIZE, addonsStoreHref } from "@/lib/addons";
import { ADDONS_RESULTS_ID } from "../data/addonsStoreData";
import { useAddonsQuery } from "../hooks/useAddonsQuery";

export interface AddonsPaginationProps {
  pageCount: number;
  /** Results for the whole query. */
  total: number;
}

/**
 * The shared Pagination on the store's URL query: a page click swaps the results in place (the pill moves at once,
 * from the optimistic query) and scrolls back up to them.
 */
export function AddonsPagination({ pageCount, total }: AddonsPaginationProps) {
  const { query, setQuery } = useAddonsQuery();

  return (
    <Pagination
      page={query.page}
      pageCount={pageCount}
      getHref={(page) => addonsStoreHref({ ...query, page })}
      onPageChange={(page) => setQuery({ page })}
      scrollTargetId={ADDONS_RESULTS_ID}
      total={total}
      pageSize={ADDONS_PAGE_SIZE}
      className="mt-6"
    />
  );
}
