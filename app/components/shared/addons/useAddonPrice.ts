"use client";

import { useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCountry } from "@/app/store/useCountry";
import type { AddonPrice } from "@/lib/addons";
import type { AppLocale } from "@/lib/constants";
import { intlLocale } from "@/lib/locale";

/**
 * Formats an add-on's price in the visitor's currency ("1,200 ج.م", or "Free"). Follows the header country
 * switcher as soon as it changes.
 */
export function useAddonPrice() {
  const t = useTranslations("addons.price");
  const locale = useLocale() as AppLocale;
  const { country } = useCountry();

  return useCallback(
    (price: AddonPrice) =>
      price === null
        ? t("free")
        : t("amount", {
            amount: new Intl.NumberFormat(intlLocale(locale)).format(price[country.code]),
            symbol: country.currencySymbol[locale],
          }),
    [t, locale, country]
  );
}
