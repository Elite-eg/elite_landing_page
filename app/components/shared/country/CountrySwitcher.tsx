"use client";

import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { FiChevronDown, FiMapPin } from "react-icons/fi";
import { useCountry } from "@/app/store/useCountry";
import type { AppLocale } from "@/lib/constants";
import { COUNTRIES } from "@/lib/countries";
import { cn } from "@/lib/utils";
import { CountryOption } from "./CountryOption";

export interface CountrySwitcherProps {
  className?: string;
}

/**
 * Country picker (Figma "Geo" button + "Country menu"): "📍 مصر · ج.م ▾" opens the list of COUNTRIES. The choice is
 * the visitor's country for the whole site (useCountry): currency, phone codes and payment methods follow it at once.
 * The list opens below the button, or above it when there is no room (mobile drawer).
 */
export function CountrySwitcher({ className }: CountrySwitcherProps) {
  const t = useTranslations("nav.countrySwitcher");
  const locale = useLocale() as AppLocale;
  const { country, changeCountry } = useCountry();
  const current = t("current", {
    country: country.name[locale],
    symbol: country.currencySymbol[locale],
  });

  return (
    <Listbox value={country.code} onChange={changeCountry}>
      <ListboxButton
        aria-label={t("label", { country: current })}
        className={cn(
          "group relative isolate inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1 font-medium transition-colors duration-300 ease-out-brand data-[open]:border-secondary",
          "before:absolute before:-inset-px before:-z-10 before:rounded-full before:bg-current before:opacity-[0.07] before:transition-opacity before:duration-300 before:ease-out-brand",
          "hover:before:opacity-15 data-[open]:before:opacity-15",
          className
        )}
      >
        <FiMapPin
          aria-hidden="true"
          className="size-3.5 shrink-0 text-secondary transition-transform duration-300 ease-back group-hover:-translate-y-0.5 motion-reduce:transform-none"
        />
        <span>{current}</span>
        <FiChevronDown
          aria-hidden="true"
          className="size-3 shrink-0 transition-transform duration-200 group-data-[open]:rotate-180"
        />
      </ListboxButton>

      <ListboxOptions
        transition
        anchor={{ to: "bottom start", gap: 8, padding: 16 }}
        className={cn(
          "z-[130] flex w-max min-w-[18.75rem] max-w-[calc(100vw-2rem)] flex-col gap-1 rounded-2xl border border-edge bg-surface p-2 shadow-lift",
          "outline-none ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          "transition duration-200 ease-out-brand data-[leave]:duration-150 data-[leave]:ease-in",
          "data-[closed]:scale-[0.97] data-[closed]:opacity-0 motion-reduce:transition-none"
        )}
      >
        {/* The list is already named by the button; the title is for sighted visitors. */}
        <p aria-hidden="true" className="px-3 pb-1 pt-2 text-caption font-medium text-content">
          {t("title")}
        </p>
        {COUNTRIES.map((option) => (
          <CountryOption key={option.code} country={option} />
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
