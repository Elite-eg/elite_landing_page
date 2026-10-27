"use client";

import { useEffect } from "react";
import { useCountry } from "@/app/store/useCountry";
import { countryByTimeZone } from "@/lib/countries";

/**
 * Last detection step, for hosts without a geo header: picks the country of the browser's time zone (`timeZones` in
 * lib/countries.ts) and saves it, so later pages render with it on the server. Rendered by the root layout only when
 * the server couldn't tell the country; a zone the site doesn't serve leaves the default.
 */
export function CountryAutoDetect() {
  const { changeCountry } = useCountry();

  useEffect(() => {
    const match = countryByTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    if (match) changeCountry(match.code);
  }, [changeCountry]);

  return null;
}
