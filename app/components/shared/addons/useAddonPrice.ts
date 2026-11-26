"use client";

import { useTranslations } from "next-intl";
import { useCountry } from "@/app/store/useCountry";
import type { AddonPrice } from "@/lib/addons";
import { useAddonAmount } from "./useAddonAmount";

/**
 * Formats an add-on's price in the visitor's currency ("1,200 ج.م", or "Free"). Follows the header country
 * switcher as soon as it changes.
 */
export function useAddonPrice() {
  const t = useTranslations("addons.price");
  const { country } = useCountry();
  const formatAmount = useAddonAmount();

  return (price: AddonPrice) => (price === null ? t("free") : formatAmount(price[country.code], country.code));
}
