import { REGIONS, regionByCode, type RegionCode } from "./constants";

/**
 * Mobile numbers of `<InputField as="phone">`: the national number after the dial code, without a leading 0
 * (+20 "11 2299 9933", +966 "50 123 4567"). Length and grouping come from `REGIONS[].mobile`; which digits are
 * valid is checked by PATTERNS.mobile (lib/validation.ts).
 */

/** Arabic-Indic (٠–٩) and Persian (۰–۹) digits → 0–9: Arabic keyboards type them into phone fields. */
export const toLatinDigits = (value: string) =>
  value.replace(/[٠-٩۰-۹]/g, (digit) => String((digit.charCodeAt(0) - 0x0660) % (0x06f0 - 0x0660)));

/** Latin digits only ("٠١١ 2299-9933" → "01122999933"). */
export const digitsOf = (value: string) => toLatinDigits(value).replace(/\D/g, "");

/** "1122999933" in groups [2, 4, 4] → "11 2299 9933"; digits past the groups stay together at the end. */
const groupDigits = (digits: string, groups: readonly number[]) => {
  const parts: string[] = [];
  let index = 0;
  for (const size of groups) {
    if (index >= digits.length) break;
    parts.push(digits.slice(index, index + size));
    index += size;
  }
  if (index < digits.length) parts.push(digits.slice(index));
  return parts.join(" ");
};

/** All the country's digits are typed (the field accepts no more). */
export const isMobileNumberComplete = (code: RegionCode, value: string) =>
  digitsOf(value).length >= regionByCode(code).mobile.length;

/**
 * Field value as the visitor types or pastes: digits only (Arabic digits converted), cut at the country's length
 * and grouped ("1122999933" → "11 2299 9933", "501234567" → "50 123 4567").
 * `cut: false` only regroups (after a code change, so switching back loses no digit; the check flags the length).
 */
export function formatNationalNumber(code: RegionCode, value: string, { cut = true } = {}): string {
  const { mobile } = regionByCode(code);
  const digits = digitsOf(value);
  return groupDigits(cut ? digits.slice(0, mobile.length) : digits, mobile.groups);
}

/** A pasted number written the local way: drop its leading 0 ("01122999933" → "1122999933"). */
export const withoutLeadingZero = (value: string) => digitsOf(value).replace(/^0+/, "");

/** Placeholder showing the number's shape ("1X XXXX XXXX"). */
export const phonePlaceholder = (code: RegionCode) => regionByCode(code).mobile.placeholder;

/**
 * A pasted or browser-filled international number ("+20 11 2299 9933", "0020 011…", "201122999933"): its region and
 * national number (leading 0 dropped). Without + or 00, digits only count as international when they are longer
 * than a national number and start with a dial code.
 */
export function splitInternationalNumber(value: string): { code: RegionCode; national: string } | null {
  const latin = toLatinDigits(value).trim();
  const explicit = /^(\+|00)/.test(latin);
  const digits = explicit ? digitsOf(latin).replace(/^00/, "") : digitsOf(latin);

  for (const { code, dialCode, mobile } of REGIONS) {
    const dial = dialCode.slice(1);
    if (digits.startsWith(dial) && (explicit || digits.length > mobile.length)) {
      return { code, national: withoutLeadingZero(digits.slice(dial.length)) };
    }
  }
  return null;
}

/** How many digits a value holds (to keep the caret on the same digit after formatting). */
export const countDigits = (value: string) => digitsOf(value).length;

/** Caret index in a formatted value right after its first `count` digits. */
export function caretAfterDigits(formatted: string, count: number): number {
  if (count <= 0) return 0;
  let seen = 0;
  for (let index = 0; index < formatted.length; index++) {
    if (/\d/.test(formatted[index]) && ++seen === count) return index + 1;
  }
  return formatted.length;
}

/** Number to send: dial code + national number ("11 2299 9933" → "+20 1122999933"). */
export const internationalPhone = (code: RegionCode, nationalNumber: string) =>
  `${regionByCode(code).dialCode} ${digitsOf(nationalNumber)}`;
