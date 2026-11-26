"use client";

import { useTranslations } from "next-intl";
import { FilterPills } from "@/app/components/shared/FilterPills";
import { SECTOR_KEYS } from "@/lib/sectors";
import { useSolutionsSector } from "../hooks/useSolutionsSector";

/** Hero sector pills (Figma "Industry tabs"): picks the workday the flow below shows. Arrow keys move the choice. */
export function SectorTabs() {
  const t = useTranslations("solutions.hero");
  const tSectors = useTranslations("nav.sectorsItems");
  const { sector, setSector } = useSolutionsSector();

  return (
    <FilterPills
      options={SECTOR_KEYS}
      value={sector}
      onChange={setSector}
      getLabel={(key) => tSectors(key)}
      label={t("sectorsLabel")}
      size="glass"
    />
  );
}
