import { z } from "zod";
import { COUNTRY_CODES, type CountryCode } from "./countries";
import { isMobileNumber } from "./phone";

/**
 * Shared input patterns for Zod schemas. Error texts live in the "validation" messages namespace.
 * Mobile numbers are checked per country from its `mobile` format (lib/countries.ts, lib/phone.ts).
 */
export const PATTERNS = {
  /** International number: optional +, then 8–15 digits with optional spaces or dashes. */
  phone: /^\+?\d[\d\s-]{6,17}\d$/,
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
  phoneCountry: z.union([z.enum(COUNTRY_CODES), z.literal("")]),
  phone: z.string().trim().min(1, requiredMessage),
});

/**
 * superRefine for those fields: the number must be a mobile number of the code in use (the picked one, else
 * `autoCode`, the code usePhoneField shows), per the country's `mobile` format in lib/countries.ts.
 * Error key: `validation.mobileInvalid`; usePhoneField fills in the country, digit count and example.
 *
 * @example z.object({ ...phoneFieldsSchema() }).superRefine(mobileNumberCheck(country.code))
 */
export const mobileNumberCheck =
  (autoCode: CountryCode) =>
  (values: { phoneCountry: CountryCode | ""; phone: string }, ctx: z.RefinementCtx) => {
    const code = values.phoneCountry || autoCode;
    if (values.phone && !isMobileNumber(code, values.phone)) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "mobileInvalid" });
    }
  };
