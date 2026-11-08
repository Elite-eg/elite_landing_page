"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/app/components/shared/Badge";
import { FilterPills } from "@/app/components/shared/FilterPills";
import { BILLING_CYCLES, YEARLY_DISCOUNT, type BillingCycle } from "../data/pricingData";
import { usePricingConfig } from "../hooks/usePricingConfig";

/** Yearly / monthly switch (Figma "Billing toggle"); the yearly pill carries the "Save 20%" chip. */
export function BillingToggle() {
  const t = useTranslations("albiruniPricing.billing");
  const { billing, setBilling } = usePricingConfig();

  const getLabel = (cycle: BillingCycle) =>
    cycle === "yearly" ? (
      <span className="inline-flex items-center gap-2">
        {t("yearly")}
        <Badge variant="brand" size="sm" className="rounded-full font-medium">
          {t("save", { percent: Math.round(YEARLY_DISCOUNT * 100) })}
        </Badge>
      </span>
    ) : (
      t("monthly")
    );

  return (
    <FilterPills
      options={BILLING_CYCLES}
      value={billing}
      onChange={setBilling}
      getLabel={getLabel}
      label={t("label")}
      size="segmented"
    />
  );
}
