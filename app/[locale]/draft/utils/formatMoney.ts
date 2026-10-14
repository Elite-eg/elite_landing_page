import type { AppLocale } from "@/lib/constants";

/** Currency amount with Latin digits in both locales (matches the rest of the site). */
export function formatMoney(amount: number, currency: string, locale: AppLocale): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG-u-nu-latn" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
