import { APP_TIME_ZONE } from "@/lib/constants";
import { intlLocale } from "@/lib/locale";

/** "2026-10-29" → "الخميس، 29 أكتوبر 2026" / "Thursday, October 29, 2026" (Latin digits, Cairo time). */
export function formatEventDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: APP_TIME_ZONE,
  }).format(new Date(date));
}
