"use client";

import { Label, Radio, RadioGroup } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { REGIONS, type RegionCode } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CountryToggleProps {
  label: string;
  value: RegionCode;
  onChange: (value: RegionCode) => void;
}

/** Segmented Egypt / Saudi Arabia picker (keyboard accessible radio group). */
export function CountryToggle({ label, value, onChange }: CountryToggleProps) {
  const t = useTranslations("checkout.countries");

  return (
    <RadioGroup value={value} onChange={onChange}>
      <Label className="mb-1.5 block text-xs font-bold text-body">{label}</Label>
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface-alt p-1">
        {REGIONS.map(({ code }) => (
          <Radio
            key={code}
            value={code}
            className={cn(
              "cursor-pointer rounded-lg py-2.5 text-center text-caption font-bold text-content transition-colors duration-200",
              "hover:text-primary data-[checked]:bg-primary data-[checked]:text-white data-[checked]:shadow-card"
            )}
          >
            {t(code)}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
}
