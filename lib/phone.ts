import { COUNTRIES, countryByCode, type CountryCode } from "./countries";

/**
 * Mobile numbers of `<InputField as="phone">`: the national number after the dial code, without a leading 0
 * (+20 "11 2299 9933", +966 "50 123 4567"). Length, grouping, placeholder and which digits are valid all come from
 * the country's `mobile` format in lib/countries.ts.
 */

interface MobileFormat {
  /** Digits of a complete number. */
  length: number;
  /** Digits per display group ([2, 4, 4] → "11 2299 9933"). */
  groups: number[];
  /** Shape of the number ("1X XXXX XXXX"). */
  placeholder: string;
  /** A valid number for messages ("10 1234 5678"): the first allowed digit of each `[…]`, then 1, 2, 3… for `X`. */
  example: string;
  /** What each digit may be, by position. */
  digits: RegExp[];
}

const FORMAT_TOKEN = /\d|X|\[[\d-]+\]/g;

/** "1[0125] XXXX XXXX" → 10 digits in groups [2, 4, 4], placeholder "1X XXXX XXXX", 2nd digit one of 0, 1, 2, 5. */
function parseMobileFormat(format: string): MobileFormat {
  const groups = format
    .trim()
    .split(/\s+/)
    .map((group) => {
      if (group.replace(FORMAT_TOKEN, "") !== "") throw new Error(`lib/countries.ts: invalid mobile format "${format}"`);
      return group.match(FORMAT_TOKEN) ?? [];
    });
  const tokens = groups.flat();
  let free = 0;
  const exampleDigit = (token: string) => (token === "X" ? String(++free % 10) : token.replace("[", "")[0]);
  return {
    length: tokens.length,
    groups: groups.map((group) => group.length),
    placeholder: groups.map((group) => group.map((token) => (/^\d$/.test(token) ? token : "X")).join("")).join(" "),
    example: groups.map((group) => group.map(exampleDigit).join("")).join(" "),
    digits: tokens.map((token) => new RegExp(`^${token === "X" ? "\\d" : token}$`)),
  };
}

/** Parsed once at load, so a broken format fails at once (dev server, build), not on the first phone field. */
const MOBILE_FORMATS = Object.fromEntries(
  COUNTRIES.map(({ code, mobile }) => [code, parseMobileFormat(mobile)])
) as Record<CountryCode, MobileFormat>;

/** Arabic-Indic (٠–٩) and Persian (۰–۹) digits → 0–9: Arabic keyboards type them into phone fields. */
export const toLatinDigits = (value: string) =>
  value.replace(/[٠-٩۰-۹]/g, (digit) => String((digit.charCodeAt(0) - 0x0660) % (0x06f0 - 0x0660)));

/** Latin digits only ("٠١١ 2299-9933" → "01122999933"). */
const digitsOf =(value: string) => toLatinDigits(value).replace(/\D/g, "");

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
export const isMobileNumberComplete = (code: CountryCode, value: string) =>
  digitsOf(value).length >= MOBILE_FORMATS[code].length;

/** The digits typed so far fit the country's format (none wrong, not too many): live check while typing. */
export function canBecomeMobileNumber(code: CountryCode, value: string): boolean {
  const { length, digits } = MOBILE_FORMATS[code];
  const typed = digitsOf(value);
  return typed.length <= length && [...typed].every((digit, index) => digits[index].test(digit));
}

/** A complete mobile number of the country. */
export const isMobileNumber = (code: CountryCode, value: string) =>
  digitsOf(value).length === MOBILE_FORMATS[code].length && canBecomeMobileNumber(code, value);

/**
 * Field value as the visitor types or pastes: digits only (Arabic digits converted), cut at the country's length
 * and grouped ("1122999933" → "11 2299 9933", "501234567" → "50 123 4567").
 * `cut: false` only regroups (after a code change, so switching back loses no digit; the check flags the length).
 */
export function formatNationalNumber(code: CountryCode, value: string, { cut = true } = {}): string {
  const { length, groups } = MOBILE_FORMATS[code];
  const digits = digitsOf(value);
  return groupDigits(cut ? digits.slice(0, length) : digits, groups);
}

/** A pasted number written the local way: drop its leading 0 ("01122999933" → "1122999933"). */
export const withoutLeadingZero = (value: string) => digitsOf(value).replace(/^0+/, "");

/** Placeholder showing the number's shape ("1X XXXX XXXX"). */
export const phonePlaceholder = (code: CountryCode) => MOBILE_FORMATS[code].placeholder;

/** Values of the shared mobile error message: digit count and a valid example ("10 1234 5678"). */
export const mobileHint = (code: CountryCode) => ({ length: MOBILE_FORMATS[code].length, example: MOBILE_FORMATS[code].example });

/**
 * A pasted or browser-filled international number ("+20 11 2299 9933", "0020 011…", "201122999933"): its country and
 * national number (leading 0 dropped). Without + or 00, digits only count as international when they are longer
 * than a national number and start with a dial code.
 */
export function splitInternationalNumber(value: string): { code: CountryCode; national: string } | null {
  const latin = toLatinDigits(value).trim();
  const explicit = /^(\+|00)/.test(latin);
  const digits = explicit ? digitsOf(latin).replace(/^00/, "") : digitsOf(latin);

  for (const { code, dialCode } of COUNTRIES) {
    const dial = dialCode.slice(1);
    if (digits.startsWith(dial) && (explicit || digits.length > MOBILE_FORMATS[code].length)) {
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
export const internationalPhone = (code: CountryCode, nationalNumber: string) =>
  `${countryByCode(code).dialCode} ${digitsOf(nationalNumber)}`;
