"use client";

import { useLocale, useTranslations } from "next-intl";
import { InfoTile } from "@/app/components/shared/tiles/InfoTile";
import { useCountry } from "@/app/store/useCountry";
import type { AppLocale } from "@/lib/constants";
import { COUNTRIES, type Country } from "@/lib/countries";
import { intlLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { isPricedPlan, type PlanKey, type PricedPlanKey } from "../../albiruni/pricing/data/pricingData";
import { monthlyCommission, PARTNER_COMMISSION_PERCENT } from "../data/partnersData";

export interface CommissionTileProps {
  plan: PlanKey;
}

/**
 * A plan's commission (Figma "Commission" tile): the rate in orange (or "by agreement" in navy for enterprise),
 * the plan, then the amount per client a month: the visitor's currency first, then the other countries'
 * ("300 ج.م شهرياً عن كل عميل · أو 60 ر.س"). Follows the header country switcher.
 */
export function CommissionTile({ plan }: CommissionTileProps) {
  const t = useTranslations("partners.commission");
  const tPricing = useTranslations("albiruniPricing");
  const locale = useLocale() as AppLocale;
  const { country } = useCountry();

  const money = (inCountry: Country, pricedPlan: PricedPlanKey) =>
    tPricing("money", {
      amount: new Intl.NumberFormat(intlLocale(locale)).format(monthlyCommission(inCountry.code, pricedPlan)),
      symbol: inCountry.currencySymbol[locale],
    });

  const amountsPerClient = (pricedPlan: PricedPlanKey) =>
    [
      t("perClient", { amount: money(country, pricedPlan) }),
      ...COUNTRIES.filter(({ code }) => code !== country.code).map((other) =>
        t("orAmount", { amount: money(other, pricedPlan) })
      ),
    ].join(" · ");

  const { figure, figureClassName, text } = isPricedPlan(plan)
    ? {
        figure: t("rate", { rate: PARTNER_COMMISSION_PERCENT }),
        figureClassName: "text-secondary-dark",
        text: amountsPerClient(plan),
      }
    : { figure: t("byAgreement"), figureClassName: "text-primary-dark", text: t("byAgreementText") };

  return (
    <InfoTile
      tone="muted"
      lead={<p className={cn("font-heading text-h2", figureClassName)}>{figure}</p>}
      title={t(`plans.${plan}`)}
      text={text}
    />
  );
}
