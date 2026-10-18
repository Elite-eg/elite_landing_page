"use client";

import { Radio, RadioGroup } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { MEETING_TYPES, type MeetingType } from "../data/bookingData";

export interface MeetingTypePickerProps {
  value: MeetingType;
  onChange: (type: MeetingType) => void;
}

/** Meeting channel chips (keyboard accessible radio group). */
export function MeetingTypePicker({ value, onChange }: MeetingTypePickerProps) {
  const t = useTranslations("booking");

  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      aria-label={t("meetingTypesLabel")}
      className="flex flex-wrap items-center gap-2"
    >
      {MEETING_TYPES.map((type) => (
        <Radio
          key={type}
          value={type}
          className={cn(
            "cursor-pointer rounded-[0.625rem] border border-edge bg-surface px-3.5 py-[0.5625rem] text-[0.84375rem] font-medium text-ink-700 transition-colors",
            "hover:border-primary/30 data-[checked]:border-secondary data-[checked]:bg-surface-warm data-[checked]:text-secondary-dark"
          )}
        >
          {t(`meetingTypes.${type}`)}
        </Radio>
      ))}
    </RadioGroup>
  );
}
