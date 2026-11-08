"use client";

import { useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCountry } from "@/app/store/useCountry";
import type { AppLocale } from "@/lib/constants";
import { intlLocale } from "@/lib/locale";
import { planMonthlyPrice, type PricedPlanKey } from "../data/pricingData";
import { usePricingConfig } from "./usePricingConfig";

/**
 * Formats a plan's monthly price in the visitor's currency for the chosen billing cycle ("4,500 ج.م").
 * Follows the header country switcher and the billing toggle as soon as either changes.
 */
export function usePlanPrice() {
  const t = useTranslations("albiruniPricing");
  const locale = useLocale() as AppLocale;
  const { country } = useCountry();
  const { billing } = usePricingConfig();

  return useCallback(
    (plan: PricedPlanKey) =>
      t("money", {
        amount: new Intl.NumberFormat(intlLocale(locale)).format(planMonthlyPrice(country.code, plan, billing)),
        symbol: country.currencySymbol[locale],
      }),
    [t, locale, country, billing]
  );
}
