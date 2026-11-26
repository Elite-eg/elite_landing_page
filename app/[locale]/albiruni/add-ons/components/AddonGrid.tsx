"use client";

import { LearnCardGrid } from "@/app/components/shared/learn/LearnCardGrid";
import type { AddonSummary } from "@/lib/addons";
import { cn } from "@/lib/utils";
import { useAddonsQuery } from "../hooks/useAddonsQuery";
import { AddonCard } from "./AddonCard";

export interface AddonGridProps {
  items: AddonSummary[];
  filterKey: string;
}

/** The result cards in the shared filterable grid (cards swap when the results change); faded while new ones load. */
export function AddonGrid({ items, filterKey }: AddonGridProps) {
  const { isPending } = useAddonsQuery();

  return (
    <div aria-busy={isPending || undefined} className={cn("transition-opacity duration-200", isPending && "opacity-60")}>
      <LearnCardGrid
        items={items}
        filterKey={filterKey}
        getKey={(addon) => addon.slug}
        renderItem={(addon) => <AddonCard addon={addon} />}
        className="sm:grid-cols-2 lg:grid-cols-3"
      />
    </div>
  );
}
