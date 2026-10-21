import { APP_TIME_ZONE } from "@/lib/constants";
import { CLOSED_WEEKDAY, WEEKDAY_KEYS, type WeekdayKey } from "../data/bookingData";

/**
 * Bookings open from tomorrow, Cairo time (slots are in Cairo time). Returned as a local-midnight Date
 * for the calendar maths, built from Cairo's date, so the server and the browser pick the same day
 * whatever their own time zones are (no hydration mismatch around midnight).
 */
export function startOfTomorrow(now = new Date()): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: APP_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value);
  return new Date(part("year"), part("month") - 1, part("day") + 1);
}

export const isBookable = (date: Date, minDate: Date) =>
  date >= minDate && date.getDay() !== CLOSED_WEEKDAY;

export function firstBookableDay(year: number, month: number, minDate: Date): number {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    if (isBookable(new Date(year, month, day), minDate)) return day;
  }
  return 1;
}

/** Column of a date in the Saturday-first calendar (0 = Saturday). */
export const weekdayColumn = (date: Date) => (date.getDay() + 1) % 7;

export const weekdayKeyOf = (date: Date): WeekdayKey => WEEKDAY_KEYS[weekdayColumn(date)];

/** Calendar date as "YYYY-MM-DD" for the API (no time zone conversion). */
export const toIsoDate = (date: Date) =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((n) => String(n).padStart(2, "0")).join("-");
