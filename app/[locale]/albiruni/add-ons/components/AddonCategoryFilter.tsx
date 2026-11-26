"use client";

import { useLocale, useTranslations } from "next-intl";
import { FilterPills } from "@/app/components/shared/FilterPills";
import type { AddonCategory } from "@/lib/addons";
import { intlLocale } from "@/lib/locale";
import { CATEGORY_OPTIONS } from "../data/addonsStoreData";
import { useAddonsQuery } from "../hooks/useAddonsQuery";

export interface AddonCategoryFilterProps {
  /** Results per category for the current search and filters. */
  counts: Record<AddonCategory | "all", number>;
}

/** Category pills with their counts (Figma "Category chips"): the shared bordered filter pills. */
export function AddonCategoryFilter({ counts }: AddonCategoryFilterProps) {
  const t = useTranslations("addons.categories");
  const locale = useLocale();
  const { query, setQuery } = useAddonsQuery();
  const formatCount = new Intl.NumberFormat(intlLocale(locale)).format;

  return (
    <FilterPills
      options={CATEGORY_OPTIONS}
      value={query.category}
      onChange={(category) => setQuery({ category })}
      label={t("label")}
      size="md"
      getLabel={(option) => (
        <span className="inline-flex items-center gap-2">
          {t(option)}
          <span className="font-normal opacity-70">{formatCount(counts[option])}</span>
        </span>
      )}
    />
  );
}
