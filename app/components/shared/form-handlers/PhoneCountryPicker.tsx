"use client";

import { Listbox, ListboxButton } from "@headlessui/react";
import { useLocale } from "next-intl";
import { FiChevronDown } from "react-icons/fi";
import { COUNTRIES, countryByCode, type CountryCode } from "@/lib/countries";
import { SelectMenu } from "./SelectMenu";

/** Dial codes only ("+20", "+966"), each in an LTR isolate so Arabic doesn't show "20+". */
const DIAL_CODE_OPTIONS = COUNTRIES.map(({ code, dialCode }) => ({ value: code, label: `⁦${dialCode}⁩` }));

/** Country code part of `<InputField as="phone">`. */
export interface PhoneCountryCode {
  /** Selected country: drives the dial code and the number placeholder. */
  value: CountryCode;
  onChange: (code: CountryCode) => void;
  /** Already-translated screen-reader label of the picker, e.g. "Country code". */
  label: string;
}

export interface PhoneCountryPickerProps extends PhoneCountryCode {
  disabled?: boolean;
}

/**
 * Grey dial code segment ("+20 ▾", Figma "Phone field") at the start of the phone box. Its list shows the dial
 * codes only, lined up with the box's left edge in both languages. Used by InputField only.
 */
export function PhoneCountryPicker({ value, onChange, label, disabled }: PhoneCountryPickerProps) {
  // The menu is portaled into the page's direction, where "end" is the left edge in Arabic.
  const anchor = useLocale() === "ar" ? "bottom end" : "bottom start";

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <ListboxButton className="group flex shrink-0 cursor-pointer items-center gap-1.5 bg-surface-alt px-3.5 font-medium text-body outline-none ring-0 ring-offset-0 transition-colors focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed data-[focus]:bg-surface-muted data-[open]:bg-surface-muted">
        <span className="sr-only">{label}</span>
        <span>{countryByCode(value).dialCode}</span>
        <FiChevronDown
          aria-hidden="true"
          className="size-3.5 text-content/70 transition-transform duration-200 group-data-[open]:rotate-180"
        />
      </ListboxButton>

      <SelectMenu options={DIAL_CODE_OPTIONS} anchor={anchor} className="w-32" />
    </Listbox>
  );
}
