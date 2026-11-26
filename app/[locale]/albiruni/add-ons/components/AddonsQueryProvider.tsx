"use client";

import { useCallback, useMemo, useOptimistic, useTransition, type ReactNode } from "react";
import { useRouter } from "@/i18n/navigation";
import { addonsStoreHref, type AddonsQuery } from "@/lib/addons";
import { AddonsQueryContext } from "../hooks/useAddonsQuery";

export interface AddonsQueryProviderProps {
  /** The query the server rendered the results for (read from the URL). */
  query: AddonsQuery;
  children: ReactNode;
}

/**
 * The store's query lives in the URL, so a filtered view can be shared and crawled and the server fetches its
 * results. A change replaces the URL without scrolling; controls show the new value at once (optimistic) while the
 * results load (`isPending`).
 */
export function AddonsQueryProvider({ query, children }: AddonsQueryProviderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticQuery, setOptimisticQuery] = useOptimistic(query);

  const setQuery = useCallback(
    (patch: Partial<AddonsQuery>) => {
      const next: AddonsQuery = { ...optimisticQuery, page: 1, ...patch };
      startTransition(() => {
        setOptimisticQuery(next);
        router.replace(addonsStoreHref(next), { scroll: false });
      });
    },
    [optimisticQuery, router, setOptimisticQuery]
  );

  const value = useMemo(() => ({ query: optimisticQuery, setQuery, isPending }), [optimisticQuery, setQuery, isPending]);

  return <AddonsQueryContext.Provider value={value}>{children}</AddonsQueryContext.Provider>;
}
