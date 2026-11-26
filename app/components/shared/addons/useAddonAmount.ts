import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/lib/constants";
import { countryByCode, type CountryCode } from "@/lib/countries";
import { intlLocale } from "@/lib/locale";

/**
 * Formats an amount in a given country's currency ("1,368 ج.م" / "EGP 1,368"): order amounts, which stay in the
 * currency the customer paid in. Works in server and client components.
 */
export function useAddonAmount() {
  const t = useTranslations("addons.price");
  const locale = useLocale() as AppLocale;
  const formatNumber = new Intl.NumberFormat(intlLocale(locale)).format;

  return (amount: number, country: CountryCode) =>
    t("amount", { amount: formatNumber(amount), symbol: countryByCode(country).currencySymbol[locale] });
}
