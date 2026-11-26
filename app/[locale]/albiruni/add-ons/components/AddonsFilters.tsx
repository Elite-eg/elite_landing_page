"use client";

import { useTranslations } from "next-intl";
import {
  ADDON_PRICE_FILTERS,
  ADDON_RATING_FILTERS,
  ADDON_SECTORS,
  ADDON_SORTS,
  ALBIRUNI_VERSIONS,
  type AddonDeveloper,
} from "@/lib/addons";
import { useAddonsQuery } from "../hooks/useAddonsQuery";
import { FilterMenu } from "./FilterMenu";

export interface AddonsFiltersProps {
  /** Developer menu options. */
  developers: AddonDeveloper[];
}

/** Price, sector, compatibility, developer and rating filters, then the sort menu (Figma toolbar order). */
export function AddonsFilters({ developers }: AddonsFiltersProps) {
  const t = useTranslations("addons.filters");
  const tSectors = useTranslations("nav.sectorsItems");
  const { query, setQuery } = useAddonsQuery();
  const all = { value: "all" as const, label: t("all") };

  return (
    <div role="group" aria-label={t("label")} className="flex flex-wrap gap-2">
      <FilterMenu
        label={t("price.label")}
        value={query.price}
        options={ADDON_PRICE_FILTERS.map((value) => ({ value, label: t(`price.options.${value}`) }))}
        onChange={(price) => setQuery({ price })}
        alwaysShowValue
      />
      <FilterMenu
        label={t("sector")}
        value={query.sector}
        options={[all, ...ADDON_SECTORS.map((value) => ({ value, label: tSectors(value) }))]}
        onChange={(sector) => setQuery({ sector })}
      />
      <FilterMenu
        label={t("version")}
        value={query.version}
        options={[all, ...ALBIRUNI_VERSIONS.map((value) => ({ value, label: value }))]}
        onChange={(version) => setQuery({ version })}
      />
      <FilterMenu
        label={t("developer")}
        value={query.developer}
        options={[all, ...developers.map(({ id, name }) => ({ value: id, label: name }))]}
        onChange={(developer) => setQuery({ developer })}
      />
      <FilterMenu
        label={t("rating.label")}
        value={query.rating}
        options={ADDON_RATING_FILTERS.map((value) => ({ value, label: t(`rating.options.${value}`) }))}
        onChange={(rating) => setQuery({ rating })}
      />
      <FilterMenu
        label={t("sort.label")}
        value={query.sort}
        options={ADDON_SORTS.map((value) => ({ value, label: t(`sort.options.${value}`) }))}
        onChange={(sort) => setQuery({ sort })}
        alwaysShowValue
      />
    </div>
  );
}
