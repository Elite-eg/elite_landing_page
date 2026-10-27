"use client";

import { Label, Radio, RadioGroup } from "@headlessui/react";
import { useLocale } from "next-intl";
import { FIELD_LABEL_CLASSES } from "@/app/components/shared/form-handlers/fieldStyles";
import type { AppLocale } from "@/lib/constants";
import { COUNTRIES, type CountryCode } from "@/lib/countries";
import { cn } from "@/lib/utils";

interface CountryToggleProps {
  label: string;
  value: CountryCode;
  onChange: (value: CountryCode) => void;
}

/** Segmented country picker, one equal segment per entry of COUNTRIES (keyboard accessible radio group). */
export function CountryToggle({ label, value, onChange }: CountryToggleProps) {
  const locale = useLocale() as AppLocale;

  return (
    <RadioGroup value={value} onChange={onChange}>
      <Label className={FIELD_LABEL_CLASSES}>{label}</Label>
      <div className="grid auto-cols-fr grid-flow-col gap-1 rounded-xl bg-surface-alt p-1">
        {COUNTRIES.map(({ code, name }) => (
          <Radio
            key={code}
            value={code}
            className={cn(
              "cursor-pointer rounded-lg py-2.5 text-center text-caption font-bold text-content transition-colors duration-200",
              "hover:text-primary data-[checked]:bg-primary data-[checked]:text-white data-[checked]:shadow-card"
            )}
          >
            {name[locale]}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
}
