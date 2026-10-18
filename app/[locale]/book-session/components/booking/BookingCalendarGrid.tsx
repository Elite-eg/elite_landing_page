import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BookingCalendarGridProps {
  daysInMonth: number;
  startOffset: number;
  selectedDay: number;
  tomorrow: Date;
  year: number;
  month: number;
  isRtl: boolean;
  onSelectDay: (day: number) => void;
}

export function BookingCalendarGrid({
  daysInMonth,
  startOffset,
  selectedDay,
  tomorrow,
  year,
  month,
  onSelectDay,
}: BookingCalendarGridProps) {
  const locale = useLocale();

  // Dynamically format short weekday names starting from Saturday (2026-01-03)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2026, 0, 3 + i);
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d);
  });

  return (
    <div className="space-y-2">
      {/* Days of week header */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-content/60 py-1">
        {weekDays.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center text-xs sm:text-sm">
        {/* Offset empty cells */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9 sm:h-10" />
        ))}

        {/* Month Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const isSelected = dayNum === selectedDay;
          const cellDate = new Date(year, month, dayNum);
          const isPast = cellDate < tomorrow;

          return (
            <motion.button
              whileHover={isPast ? undefined : { scale: 1.1 }}
              whileTap={isPast ? undefined : { scale: 0.9 }}
              key={dayNum}
              type="button"
              disabled={isPast}
              onClick={() => !isPast && onSelectDay(dayNum)}
              className={cn(
                "relative h-9 sm:h-10 rounded-xl font-medium flex items-center justify-center transition-all duration-200 overflow-hidden select-none",
                isPast
                  ? "bg-surface-alt/70 text-content/60 cursor-not-allowed pointer-events-none"
                  : isSelected
                    ? "bg-primary-deep text-surface font-bold shadow-md scale-105 cursor-pointer"
                    : "bg-surface-alt text-body hover:bg-surface-info hover:text-secondary cursor-pointer",
              )}
            >
              <span className="relative z-10">{dayNum}</span>
              {isPast && (
                <span
                  className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[1px] bg-content/65 rounded-full rotate-[-30deg] pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
