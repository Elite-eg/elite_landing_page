"use client";

import { createContext, useContext } from "react";
import type { AddonsQuery } from "@/lib/addons";

export interface AddonsQueryState {
  /** The query the controls show: it changes at once, before the new results arrive. */
  query: AddonsQuery;
  /** Applies a change. Anything but a page change goes back to the first page. */
  setQuery: (patch: Partial<AddonsQuery>) => void;
  /** True while the results for the new query load. */
  isPending: boolean;
}

export const AddonsQueryContext = createContext<AddonsQueryState | null>(null);

/** The store's search, category, filters, sort and page, set by <AddonsQueryProvider>. */
export function useAddonsQuery(): AddonsQueryState {
  const state = useContext(AddonsQueryContext);
  if (!state) throw new Error("useAddonsQuery must be used inside <AddonsQueryProvider>");
  return state;
}
