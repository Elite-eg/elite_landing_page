/** Shared input patterns for Zod schemas. Error texts live in the "validation" messages namespace. */
export const PATTERNS = {
  /** International number: optional +, then 8–15 digits with optional spaces or dashes. */
  phone: /^\+?\d[\d\s-]{6,17}\d$/,
  /** 13–19 digits, optionally grouped with spaces or dashes. */
  cardNumber: /^(?:\d[ -]?){12,18}\d$/,
  /** MM/YY */
  cardExpiry: /^(0[1-9]|1[0-2])\/\d{2}$/,
  cardCvc: /^\d{3,4}$/,
} as const;
