import { CLOSED_WEEKDAY, WEEKDAY_KEYS, type WeekdayKey } from "../data/bookingData";

/** Intl locale with Latin digits in both languages, so server and client render the same string. */
export const toDateLocale = (locale: string) => (locale === "ar" ? "ar-EG-u-nu-latn" : "en-US");

/** Bookings open from tomorrow onwards. */
export function startOfTomorrow(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
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
