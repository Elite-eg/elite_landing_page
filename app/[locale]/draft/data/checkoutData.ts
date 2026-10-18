import type { IconType } from "react-icons";
import { FiCreditCard, FiDollarSign, FiHash, FiHome, FiSmartphone, FiZap } from "react-icons/fi";
import { FaApple } from "react-icons/fa6";
import type { LocalizedText, RegionCode } from "@/lib/constants";

export type CheckoutStep = "company" | "payment" | "result";

/** Stepper order; keys map to `checkout.steps.<key>`. */
export const CHECKOUT_STEPS = ["company", "payment", "activation"] as const;

export type PaymentMethodKey = "card" | "fawry" | "wallet" | "instapay" | "applePay" | "stcPay" | "bankTransfer";

/** Methods offered per country, in display order. Keys map to `checkout.payment.methods.<key>`. */
export const PAYMENT_METHODS: Record<RegionCode, PaymentMethodKey[]> = {
  EG: ["card", "fawry", "wallet", "instapay", "bankTransfer"],
  SA: ["card", "applePay", "stcPay", "bankTransfer"],
};

export const PAYMENT_METHOD_ICONS: Record<PaymentMethodKey, IconType> = {
  card: FiCreditCard,
  fawry: FiHash,
  wallet: FiSmartphone,
  instapay: FiZap,
  applePay: FaApple,
  stcPay: FiDollarSign,
  bankTransfer: FiHome,
};

export interface CompanyDetails {
  companyName: string;
  taxNumber: string;
  contactName: string;
  phone: string;
  email: string;
}

interface RegionPricing {
  currency: string;
  /** Yearly price before VAT. */
  subtotal: number;
  vatRate: number;
}

/**
 * DRAFT SAMPLE VALUES — replace with confirmed Albiruni pricing and the real order from the backend.
 * VAT rates are the standard rates (Egypt 14%, Saudi Arabia 15%).
 */
export const SAMPLE_ORDER = {
  orderNumber: "ET-10482",
  users: 5,
  pricing: {
    EG: { currency: "EGP", subtotal: 12000, vatRate: 0.14 },
    SA: { currency: "SAR", subtotal: 2400, vatRate: 0.15 },
  } satisfies Record<RegionCode, RegionPricing>,
} as const;

/** DRAFT SAMPLE — real bank accounts are TBD (owner to provide). */
export const SAMPLE_BANK_ACCOUNTS: Record<RegionCode, { bankName: LocalizedText; iban: string }> = {
  EG: { bankName: { ar: "بنك مصر", en: "Banque Misr" }, iban: "EG00 0000 0000 0000 0000 0000 0000 0" },
  SA: { bankName: { ar: "البنك الأهلي السعودي", en: "Saudi National Bank" }, iban: "SA00 0000 0000 0000 0000 0000" },
};

export function getOrderTotals(country: RegionCode) {
  const { currency, subtotal, vatRate } = SAMPLE_ORDER.pricing[country];
  const vat = Math.round(subtotal * vatRate);
  return { currency, subtotal, vatRate, vat, total: subtotal + vat };
}
