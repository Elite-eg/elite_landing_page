import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "./constants";

/** Narrows a route param to a supported locale. Anything else falls back to the default (Arabic). */
export function toAppLocale(value: string | undefined): AppLocale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}

/**
 * Intl locale for numbers, money and dates. Digits stay Latin in both languages,
 * so the server and the browser render exactly the same string.
 */
export function intlLocale(locale: string): string {
  return locale === "ar" ? "ar-EG-u-nu-latn" : "en-US";
}

/** Localized name of an ISO 4217 currency ("EGP" → "جنيه مصري" / "Egyptian Pound"), so countries need no extra text. */
export function currencyName(currency: string, locale: string): string {
  return new Intl.DisplayNames([intlLocale(locale)], { type: "currency" }).of(currency) ?? currency;
}
