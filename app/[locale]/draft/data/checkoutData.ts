import type { IconType } from "react-icons";
import { FiCreditCard, FiDollarSign, FiHash, FiHome, FiSmartphone, FiZap } from "react-icons/fi";
import { FaApple } from "react-icons/fa6";
import type { LocalizedText } from "@/lib/constants";
import { countryByCode, type CountryCode, type PaymentMethodKey } from "@/lib/countries";

export type CheckoutStep = "company" | "payment" | "result";

/** Stepper order; keys map to `checkout.steps.<key>`. */
export const CHECKOUT_STEPS = ["company", "payment", "activation"] as const;

/** Icon per payment method. Which methods a country offers: `paymentMethods` in lib/countries.ts. */
export const PAYMENT_METHOD_ICONS: Record<PaymentMethodKey, IconType> = {
  card: FiCreditCard,
  fawry: FiHash,
  wallet: FiSmartphone,
  instapay: FiZap,
  applePay: FaApple,
  stcPay: FiDollarSign,
  bankTransfer: FiHome,
};

/**
 * DRAFT SAMPLE VALUES — replace with confirmed Albiruni pricing and the real order from the backend.
 * `subtotals`: yearly price before VAT, in the country's currency.
 */
export const SAMPLE_ORDER = {
  orderNumber: "ET-10482",
  users: 5,
  subtotals: { EG: 12000, SA: 2400 } satisfies Record<CountryCode, number>,
} as const;

/** DRAFT SAMPLE — real bank accounts are TBD (owner to provide). */
export const SAMPLE_BANK_ACCOUNTS: Record<CountryCode, { bankName: LocalizedText; iban: string }> = {
  EG: { bankName: { ar: "بنك مصر", en: "Banque Misr" }, iban: "EG00 0000 0000 0000 0000 0000 0000 0" },
  SA: { bankName: { ar: "البنك الأهلي السعودي", en: "Saudi National Bank" }, iban: "SA00 0000 0000 0000 0000 0000" },
};

/** Order amounts in the country's currency, with its VAT rate (lib/countries.ts). */
export function getOrderTotals(country: CountryCode) {
  const { currency, vatRate } = countryByCode(country);
  const subtotal = SAMPLE_ORDER.subtotals[country];
  const vat = Math.round(subtotal * vatRate);
  return { currency, subtotal, vatRate, vat, total: subtotal + vat };
}
