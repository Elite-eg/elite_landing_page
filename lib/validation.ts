import { z } from "zod";
import { REGION_CODES, type RegionCode } from "./constants";
import { digitsOf } from "./phone";

/** Shared input patterns for Zod schemas. Error texts live in the "validation" messages namespace. */
export const PATTERNS = {
  /** International number: optional +, then 8–15 digits with optional spaces or dashes. */
  phone: /^\+?\d[\d\s-]{6,17}\d$/,
  /**
   * Mobile number after the dial code, no leading 0 (checked on the digits only, see digitsOf).
   * EG +20: 10 Vodafone, 11 e&, 12 Orange or 15 WE, then 8 digits → 11 2299 9933
   * SA +966: 5, then 0, 1 or 3–9, then 7 digits → 50 123 4567
   */
  mobile: {
    EG: /^1[0125]\d{8}$/,
    SA: /^5[013-9]\d{7}$/,
  } satisfies Record<RegionCode, RegExp>,
  /** The digits typed so far can still become a mobile number (live check while typing; "0" or "13" fail at once). */
  mobilePrefix: {
    EG: /^(1([0125]\d{0,8})?)?$/,
    SA: /^(5([013-9]\d{0,7})?)?$/,
  } satisfies Record<RegionCode, RegExp>,
  /** 13–19 digits, optionally grouped with spaces or dashes. */
  cardNumber: /^(?:\d[ -]?){12,18}\d$/,
  /** MM/YY */
  cardExpiry: /^(0[1-9]|1[0-2])\/\d{2}$/,
  cardCvc: /^\d{3,4}$/,
} as const;

/** A dropdown / chip value: "" (placeholder) until one of `options` is chosen. */
export const choiceOf = (options: readonly string[], message: string) =>
  z.string().refine((value) => options.includes(value), message);

/**
 * Schema fields of `<InputField as="phone">` (spread them into a z.object, then add mobileNumberCheck):
 * `phoneCountry` is the code the visitor picked ("" = automatic, see usePhoneField), `phone` the national number.
 * @param requiredMessage key in "validation" shown when the number is empty
 */
export const phoneFieldsSchema = (requiredMessage = "phoneRequired") => ({
  phoneCountry: z.union([z.enum(REGION_CODES), z.literal("")]),
  phone: z.string().trim().min(1, requiredMessage),
});

/** A complete mobile number of the country (PATTERNS.mobile). */
export const isMobileNumber = (code: RegionCode, value: string) => PATTERNS.mobile[code].test(digitsOf(value));

/** Nothing wrong yet in the digits typed so far (PATTERNS.mobilePrefix). */
export const canBecomeMobileNumber = (code: RegionCode, value: string) =>
  PATTERNS.mobilePrefix[code].test(digitsOf(value));

/**
 * superRefine for those fields: the number must be a mobile number of the code in use (the picked one, else
 * `autoCode`, the code usePhoneField shows). Error key: `validation.mobileInvalid<EG|SA>`.
 *
 * @example z.object({ ...phoneFieldsSchema() }).superRefine(mobileNumberCheck(region))
 */
export const mobileNumberCheck =
  (autoCode: RegionCode) =>
  (values: { phoneCountry: RegionCode | ""; phone: string }, ctx: z.RefinementCtx) => {
    const code = values.phoneCountry || autoCode;
    if (values.phone && !isMobileNumber(code, values.phone)) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: `mobileInvalid${code}` });
    }
  };
