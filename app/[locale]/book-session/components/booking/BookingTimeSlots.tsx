"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimeSlot {
  label: string;
  value: string;
}

export interface BookingTimeSlotsProps {
  formattedDateLabel: string;
  timeSlots: TimeSlot[];
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

export function BookingTimeSlots({
  formattedDateLabel,
  timeSlots,
  selectedTime,
  onSelectTime,
}: BookingTimeSlotsProps) {
  const t = useTranslations("booking");

  return (
    <div className="pt-2 border-t border-edge/60">
      <p className="text-xs font-semibold text-content mb-3">
        {t("availableSlotsHeader", { date: formattedDateLabel })}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {timeSlots.map((slot) => {
          const isSelected = selectedTime === slot.value;
          return (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={slot.value}
              type="button"
              onClick={() => onSelectTime(slot.value)}
              className={cn(
                "py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 text-center cursor-pointer",
                isSelected
                  ? "bg-gradient-to-r from-secondary to-secondary-dark text-surface border-transparent shadow-md scale-105"
                  : "bg-surface-alt border-edge/60 text-body hover:bg-surface-muted",
              )}
            >
              {slot.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
