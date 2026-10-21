import type { AppLocale } from "@/lib/constants";
import { intlLocale } from "@/lib/locale";

/** Currency amount with Latin digits in both locales (matches the rest of the site). */
export function formatMoney(amount: number, currency: string, locale: AppLocale): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
