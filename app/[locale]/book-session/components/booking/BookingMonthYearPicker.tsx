"use client";

import {
  CustomDropdown,
  type DropdownOption,
} from "@/app/components/shared/CustomDropdown";

export interface BookingMonthYearPickerProps {
  month: number;
  year: number;
  monthOptions: DropdownOption<number>[];
  yearOptions: DropdownOption<number>[];
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export function BookingMonthYearPicker({
  month,
  year,
  monthOptions,
  yearOptions,
  onMonthChange,
  onYearChange,
}: BookingMonthYearPickerProps) {
  return (
    <div className="flex items-center justify-center gap-2.5 font-bold text-body text-sm sm:text-base pt-1 px-1">
      <CustomDropdown
        options={monthOptions}
        value={month}
        onChange={(v) => onMonthChange(Number(v))}
        size="sm"
        buttonClassName="bg-surface-alt border-0 hover:bg-surface-muted rounded-xl focus:ring-0 outline-none transition-colors"
      />

      <CustomDropdown
        options={yearOptions}
        value={year}
        onChange={(v) => onYearChange(Number(v))}
        size="sm"
        buttonClassName="bg-surface-alt border-0 hover:bg-surface-muted rounded-xl focus:ring-0 outline-none transition-colors"
      />
    </div>
  );
}
