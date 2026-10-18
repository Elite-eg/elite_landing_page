"use client";

import { Radio, RadioGroup } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { TimeSlot } from "../data/bookingData";

export interface TimeSlotPickerProps {
  dateLabel: string;
  slots: { value: TimeSlot; label: string }[];
  value: TimeSlot;
  onChange: (time: TimeSlot) => void;
}

export function TimeSlotPicker({ dateLabel, slots, value, onChange }: TimeSlotPickerProps) {
  const t = useTranslations("booking");
  const header = t("availableSlotsHeader", { date: dateLabel });

  return (
    <div className="flex w-full flex-col gap-[1.125rem]">
      <p className="text-[0.8125rem] font-medium text-content">{header}</p>

      <RadioGroup value={value} onChange={onChange} aria-label={header} className="grid grid-cols-4 gap-2">
        {slots.map((slot) => (
          <Radio
            key={slot.value}
            value={slot.value}
            className={cn(
              "cursor-pointer rounded-[0.625rem] border border-edge bg-surface py-2.5 text-center font-heading text-sm font-semibold text-primary transition-colors",
              "hover:border-primary/30 data-[checked]:border-secondary data-[checked]:bg-secondary data-[checked]:text-white"
            )}
          >
            {slot.label}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
