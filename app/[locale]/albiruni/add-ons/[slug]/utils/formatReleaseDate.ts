import { APP_TIME_ZONE } from "@/lib/constants";
import { intlLocale } from "@/lib/locale";

/** "2026-09-28" → "28 سبتمبر 2026" / "September 28, 2026" (Cairo time, Latin digits, same on server and browser). */
export function formatReleaseDate(isoDate: string, locale: string): string {
  // Noon UTC keeps the calendar day in every time zone.
  return new Intl.DateTimeFormat(intlLocale(locale), { dateStyle: "long", timeZone: APP_TIME_ZONE }).format(
    new Date(`${isoDate}T12:00:00Z`)
  );
}
