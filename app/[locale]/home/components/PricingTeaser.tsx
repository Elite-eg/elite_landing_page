"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CountrySwitcher } from "@/app/components/shared/country/CountrySwitcher";
import { FilterPills } from "@/app/components/shared/FilterPills";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import type { AppLocale } from "@/lib/constants";
import { COUNTRIES } from "@/lib/countries";
import { intlLocale } from "@/lib/locale";
import { PRICING_PLANS, PRICING_SECTORS, type SectorKey } from "../../albiruni/pricing/data/pricingData";
import { ScrollablePills } from "./ScrollablePills";
import { TeaserPlanCard } from "./TeaserPlanCard";

const SECTOR_KEYS = PRICING_SECTORS.map((sector) => sector.key);

/**
 * Sector pills, the visitor's country (detected, changeable), the three plans and the footnote. Prices follow the
 * country at once; the chosen sector goes with the free-trial link.
 */
export function PricingTeaser() {
  const t = useTranslations("home.pricing");
  const tSectors = useTranslations("nav.sectorsItems");
  const locale = useLocale() as AppLocale;
  const [sector, setSector] = useState<SectorKey>(SECTOR_KEYS[0]);
  const countries = new Intl.ListFormat(intlLocale(locale), { type: "disjunction" }).format(
    COUNTRIES.map((country) => `${country.name[locale]} (${country.currencySymbol[locale]})`)
  );

  return (
    <div className="flex flex-col items-center gap-10">
      <Reveal className="flex w-full flex-col items-center gap-5 sm:gap-10">
        <ScrollablePills className="self-stretch">
          <FilterPills
            options={SECTOR_KEYS}
            value={sector}
            onChange={setSector}
            getLabel={(key) => tSectors(key)}
            label={t("sectorLabel")}
            size="segmented"
          />
        </ScrollablePills>
        <CountrySwitcher variant="field" />
      </Reveal>

      <RevealGroup className="grid w-full gap-5 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <Reveal key={plan.key} inGroup className="h-full">
            <TeaserPlanCard plan={plan} sector={sector} />
          </Reveal>
        ))}
      </RevealGroup>

      <p className="text-balance text-center text-xs text-ink-400">{t("note", { countries })}</p>
    </div>
  );
}
