import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { WEEKDAY_KEYS } from "../data/bookingData";
import { isBookable, weekdayColumn } from "../utils/bookingDates";

export interface CalendarGridProps {
  year: number;
  month: number;
  minDate: Date;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  /** Full date ("Saturday 31 October") read by screen readers instead of the bare day number. */
  dayLabel: (day: number) => string;
}

/** Saturday-first month grid. Past days and Fridays are shown but can't be picked. */
export function CalendarGrid({ year, month, minDate, selectedDay, onSelectDay, dayLabel }: CalendarGridProps) {
  const t = useTranslations("booking.weekdays");
  const startOffset = weekdayColumn(new Date(year, month, 1));
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="grid grid-cols-7 gap-1.5" aria-hidden="true">
        {WEEKDAY_KEYS.map((key) => (
          <span key={key} className="flex h-6 items-center justify-center text-[0.71875rem] text-ink-400">
            {t(`short.${key}`)}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: startOffset }, (_, i) => (
          <span key={`empty-${i}`} className="h-11" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isAvailable = isBookable(new Date(year, month, day), minDate);
          const isSelected = isAvailable && day === selectedDay;

          return (
            <button
              key={day}
              type="button"
              disabled={!isAvailable}
              aria-pressed={isSelected}
              aria-label={dayLabel(day)}
              onClick={() => onSelectDay(day)}
              className={cn(
                "flex h-11 items-center justify-center rounded-xl font-heading text-sm transition-colors",
                !isAvailable && "cursor-default font-medium text-navy-200",
                isAvailable && !isSelected && "cursor-pointer bg-surface-muted font-semibold text-primary hover:bg-primary/15",
                isSelected && "bg-primary font-semibold text-white"
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
