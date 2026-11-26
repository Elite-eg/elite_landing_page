"use client";

import { useCallback, useMemo, useOptimistic, useTransition, type ReactNode } from "react";
import { useRouter } from "@/i18n/navigation";
import { solutionsSectorHref, type SectorKey } from "@/lib/sectors";
import { SolutionsSectorContext } from "../hooks/useSolutionsSector";

export interface SolutionsSectorProviderProps {
  /** The sector named in the URL (`?sector=`), read by the server; distribution when none. */
  sector: SectorKey;
  children: ReactNode;
}

/**
 * The sector picked in the hero, for the sections below it. It lives in the URL, so a sector card (home or this
 * page) opens the page on its sector and a picked sector can be shared. A tab replaces the URL without scrolling and
 * shows the new sector at once (optimistic) while the page re-renders.
 */
export function SolutionsSectorProvider({ sector, children }: SolutionsSectorProviderProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [optimisticSector, setOptimisticSector] = useOptimistic(sector);

  const setSector = useCallback(
    (next: SectorKey) => {
      startTransition(() => {
        setOptimisticSector(next);
        router.replace(solutionsSectorHref(next), { scroll: false });
      });
    },
    [router, setOptimisticSector]
  );

  const value = useMemo(() => ({ sector: optimisticSector, setSector }), [optimisticSector, setSector]);

  return <SolutionsSectorContext.Provider value={value}>{children}</SolutionsSectorContext.Provider>;
}
