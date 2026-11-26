"use client";

import { createContext, useContext } from "react";
import type { SectorKey } from "@/lib/sectors";

export interface SolutionsSector {
  /** The sector whose workday the page shows. */
  sector: SectorKey;
  setSector: (sector: SectorKey) => void;
}

export const SolutionsSectorContext = createContext<SolutionsSector | null>(null);

/** The sector picked in the solutions hero, shared with the "day in the life" flow (set by <SolutionsSectorProvider>). */
export function useSolutionsSector(): SolutionsSector {
  const value = useContext(SolutionsSectorContext);
  if (!value) throw new Error("useSolutionsSector must be used inside <SolutionsSectorProvider>");
  return value;
}
