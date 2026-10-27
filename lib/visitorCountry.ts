import { cookies, headers } from "next/headers";
import { COUNTRY_COOKIE, DEFAULT_COUNTRY, GEO_COUNTRY_HEADERS, isCountryCode, type CountryCode } from "./countries";

/**
 * Geo header of a host that isn't in GEO_COUNTRY_HEADERS, from the environment, so moving hosts needs no code change
 * (e.g. GEO_COUNTRY_HEADER=x-geo-country behind a self-hosted nginx). Server only, so no NEXT_PUBLIC_ prefix.
 */
const CUSTOM_GEO_HEADER = process.env.GEO_COUNTRY_HEADER?.trim().toLowerCase();
const GEO_HEADERS = CUSTOM_GEO_HEADER ? [CUSTOM_GEO_HEADER, ...GEO_COUNTRY_HEADERS] : GEO_COUNTRY_HEADERS;

export interface VisitorCountry {
  code: CountryCode;
  /** false = no saved choice and no geo header named a served country: the browser guesses from its time zone. */
  known: boolean;
}

/**
 * Server side (root layout): the country a request renders with, so prices and phone codes are right from the first
 * paint. The visitor's saved choice, else the host's geo header, else the default (then CountryAutoDetect tries the
 * browser's time zone, which works on any host).
 */
export async function visitorCountry(): Promise<VisitorCountry> {
  const saved = (await cookies()).get(COUNTRY_COOKIE)?.value;
  if (isCountryCode(saved)) return { code: saved, known: true };

  const requestHeaders = await headers();
  const detected = GEO_HEADERS.map((name) => requestHeaders.get(name)?.trim().toUpperCase()).find(isCountryCode);
  return detected ? { code: detected, known: true } : { code: DEFAULT_COUNTRY, known: false };
}
