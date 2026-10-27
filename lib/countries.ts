import type { LocalizedText } from "./constants";

/**
 * Countries the site serves: the single source of everything that changes with the visitor's country.
 * The header switcher lists them, and useCountry() (app/store/useCountry.ts) hands the chosen one to any component:
 * names, currency, phone fields (dial code, number format and check) and checkout (VAT, payment methods) all follow it
 * the moment the visitor switches.
 *
 * Adding a country = one line in COUNTRIES, texts in both languages included (like COMPANY_INFO). The phone error
 * message is shared (`validation.mobileInvalid`) and filled in from the line. Only the DRAFT checkout also needs a
 * sample price and bank account for it (draft/data/checkoutData.ts); TypeScript points to both.
 *
 * @example United Arab Emirates
 * { code: "AE", name: { ar: "الإمارات", en: "UAE" }, flag: "/images/flags/ae.svg", currency: "AED", currencySymbol: { ar: "د.إ", en: "AED" }, dialCode: "+971", mobile: "5[024568] XXX XXXX", vatRate: 0.05, timeZones: ["Asia/Dubai"], paymentMethods: ["card", "applePay", "bankTransfer"] },
 */

/** Payment methods the checkout can offer. Texts: `checkout.payment.methods.<key>`; icons: draft/data/checkoutData.ts. */
export type PaymentMethodKey = "card" | "fawry" | "wallet" | "instapay" | "applePay" | "stcPay" | "bankTransfer";

interface CountryConfig {
  /** ISO 3166-1 alpha-2 code (shown in place of the flag when there is none). */
  code: string;
  /** Name in both languages: switcher, country fields, checkout, phone error. */
  name: LocalizedText;
  /**
   * Flag image: a file in public/ ("/images/flags/eg.svg", 4x3 SVGs from github.com/lipis/flag-icons, MIT) or a URL.
   * Optional: without it, or if it fails to load, the switcher shows the code.
   */
  flag?: string;
  /** ISO 4217 code prices are shown in. */
  currency: string;
  /** Short currency sign beside the name in the switcher ("مصر · ج.م"). */
  currencySymbol: LocalizedText;
  dialCode: `+${number}`;
  /**
   * Mobile number after the dial code (no leading 0): one token per digit, a space between display groups.
   * A digit = that digit, `[…]` = one of these digits, `X` = any digit. lib/phone.ts derives the length, grouping,
   * placeholder, example and check from it: "1[0125] XXXX XXXX" = 10 digits starting with 10, 11, 12 or 15, shown
   * as "11 2299 9933".
   */
  mobile: string;
  /** Standard VAT rate added to prices (0.14 = 14%). */
  vatRate: number;
  /** IANA time zones of the country: the browser's zone picks it when the host sends no geo header. */
  timeZones: readonly string[];
  /** Checkout payment methods, in display order. */
  paymentMethods: readonly PaymentMethodKey[];
}

export const COUNTRIES = [
  { code: "EG", name: { ar: "مصر", en: "Egypt" }, flag: "/images/flags/eg.svg", currency: "EGP", currencySymbol: { ar: "ج.م", en: "EGP" }, dialCode: "+20", mobile: "1[0125] XXXX XXXX", vatRate: 0.14, timeZones: ["Africa/Cairo"], paymentMethods: ["card", "fawry", "wallet", "instapay", "bankTransfer"] },
  { code: "SA", name: { ar: "السعودية", en: "Saudi Arabia" }, flag: "/images/flags/sa.svg", currency: "SAR", currencySymbol: { ar: "ر.س", en: "SAR" }, dialCode: "+966", mobile: "5[013-9] XXX XXXX", vatRate: 0.15, timeZones: ["Asia/Riyadh"], paymentMethods: ["card", "applePay", "stcPay", "bankTransfer"] },
] as const satisfies readonly CountryConfig[];

export type CountryCode = (typeof COUNTRIES)[number]["code"];

/** One entry of COUNTRIES (what useCountry() returns). */
export type Country = CountryConfig & { code: CountryCode };

/** Used until the visitor picks a country. */
export const DEFAULT_COUNTRY: CountryCode = "EG";

/** Saves the visitor's choice; the root layout reads it so the first render already shows their country. */
export const COUNTRY_COOKIE = "country";

/**
 * Request headers in which hosts and CDNs send the visitor's country (ISO code), checked in this order by
 * lib/visitorCountry.ts: Vercel, Cloudflare, AWS CloudFront / Amplify, and the usual reverse-proxy name (nginx GeoIP).
 * Another host's header needs no code change: set its name in the GEO_COUNTRY_HEADER environment variable.
 */
export const GEO_COUNTRY_HEADERS = ["x-vercel-ip-country", "cf-ipcountry", "cloudfront-viewer-country", "x-country-code"] as const;

/** The country of a browser time zone ("Asia/Riyadh" → SA), if the site serves it. */
export const countryByTimeZone = (timeZone: string): Country | undefined =>
  COUNTRIES.find((country: Country) => country.timeZones.includes(timeZone));

/** Country codes as a tuple, for z.enum(). */
export const COUNTRY_CODES = COUNTRIES.map(({ code }) => code) as [CountryCode, ...CountryCode[]];

export const isCountryCode = (value: unknown): value is CountryCode => COUNTRIES.some(({ code }) => code === value);

/** The entry of a code. */
export const countryByCode = (code: CountryCode): Country =>
  COUNTRIES.find((country) => country.code === code) ?? COUNTRIES[0];
