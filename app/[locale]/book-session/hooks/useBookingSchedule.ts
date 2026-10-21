"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { intlLocale } from "@/lib/locale";
import { DEFAULT_TIME_SLOT, TIME_SLOTS, type TimeSlot } from "../data/bookingData";
import { firstBookableDay, startOfTomorrow, toIsoDate, weekdayKeyOf } from "../utils/bookingDates";

/** Calendar month shown, selected day and time slot, plus their localized labels. */
export function useBookingSchedule() {
  const t = useTranslations("booking");
  const dateLocale = intlLocale(useLocale());

  const [minDate] = useState(startOfTomorrow);
  const [view, setView] = useState(() => ({ year: minDate.getFullYear(), month: minDate.getMonth() }));
  const [selectedDay, setSelectedDay] = useState(() =>
    firstBookableDay(minDate.getFullYear(), minDate.getMonth(), minDate)
  );
  const [selectedTime, setSelectedTime] = useState<TimeSlot>(DEFAULT_TIME_SLOT);

  const canGoPrev = new Date(view.year, view.month, 1) > new Date(minDate.getFullYear(), minDate.getMonth(), 1);

  const changeMonth = (delta: number) => {
    const first = new Date(view.year, view.month + delta, 1);
    const next = { year: first.getFullYear(), month: first.getMonth() };
    setView(next);
    setSelectedDay(firstBookableDay(next.year, next.month, minDate));
  };

  const formatTime = (slot: TimeSlot) => {
    const [hours, minutes] = slot.split(":").map(Number);
    return new Intl.DateTimeFormat(dateLocale, { hour: "numeric", minute: "2-digit", hour12: true }).format(
      new Date(2026, 0, 1, hours, minutes)
    );
  };

  /** "Saturday 31 October": slot header text and the accessible name of each calendar day. */
  const dayLabel = (day: number) => {
    const date = new Date(view.year, view.month, day);
    return t("slotDate", {
      weekday: t(`weekdays.long.${weekdayKeyOf(date)}`),
      day: String(day),
      month: new Intl.DateTimeFormat(dateLocale, { month: "long" }).format(date),
    });
  };

  return {
    minDate,
    ...view,
    selectedDay,
    selectDay: setSelectedDay,
    selectedTime,
    selectTime: setSelectedTime,
    canGoPrev,
    goToPrevMonth: () => changeMonth(-1),
    goToNextMonth: () => changeMonth(1),
    monthLabel: new Intl.DateTimeFormat(dateLocale, { month: "long", year: "numeric" }).format(
      new Date(view.year, view.month, 1)
    ),
    dayLabel,
    selectedDateLabel: dayLabel(selectedDay),
    /** "YYYY-MM-DD" of the picked day, sent to the booking endpoint. */
    selectedDateIso: toIsoDate(new Date(view.year, view.month, selectedDay)),
    timeSlots: TIME_SLOTS.map((value) => ({ value, label: formatTime(value) })),
    selectedTimeLabel: formatTime(selectedTime),
  };
}

export type BookingSchedule = ReturnType<typeof useBookingSchedule>;
