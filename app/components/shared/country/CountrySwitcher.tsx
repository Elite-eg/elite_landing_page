"use client";

import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { FiChevronDown, FiMapPin } from "react-icons/fi";
import { useCountry } from "@/app/store/useCountry";
import type { AppLocale } from "@/lib/constants";
import { COUNTRIES } from "@/lib/countries";
import { currencyName } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { CountryOption } from "./CountryOption";

/**
 * The switcher's looks, all defined here so every page shows the same one (pages pick a variant, never restyle):
 * - compact: "📍 مصر · ج.م ▾", a pill tinted with its own text colour (7%, 15% on hover / open), so it fits any
 *   background; the caller sets that colour (`className="text-surface"` on the ink header top bar). Header top bar,
 *   mobile menu.
 * - field: "📍 مصر · جنيه مصري (ج.م) ▾", a white pill with a light border and the currency spelled out, beside page
 *   content. Albiruni pricing hero, home pricing teaser.
 */
export type CountrySwitcherVariant = "compact" | "field";

const VARIANTS: Record<CountrySwitcherVariant, { label: "current" | "currentWithCurrency"; button: string }> = {
  compact: {
    label: "current",
    button: "border-transparent px-2.5 py-1 before:opacity-[0.07]",
  },
  field: {
    label: "currentWithCurrency",
    button: "border-edge bg-surface px-4 py-2.5 text-caption text-body before:opacity-0",
  },
};

export interface CountrySwitcherProps {
  variant?: CountrySwitcherVariant;
  /** Placement or the text colour around a compact switcher; the look itself comes from `variant`. */
  className?: string;
}

/**
 * Country picker (Figma "Geo" button + "Country menu"): the button opens the list of COUNTRIES. The choice is the
 * visitor's country for the whole site (useCountry): currency, prices, phone codes and payment methods follow it at
 * once. The list opens below the button, or above it when there is no room (mobile drawer).
 */
export function CountrySwitcher({ variant = "compact", className }: CountrySwitcherProps) {
  const t = useTranslations("nav.countrySwitcher");
  const locale = useLocale() as AppLocale;
  const { country, changeCountry } = useCountry();
  const current = t(VARIANTS[variant].label, {
    country: country.name[locale],
    currency: currencyName(country.currency, locale),
    symbol: country.currencySymbol[locale],
  });

  return (
    <Listbox value={country.code} onChange={changeCountry}>
      <ListboxButton
        aria-label={t("label", { country: current })}
        className={cn(
          "group relative isolate inline-flex cursor-pointer items-center gap-1.5 rounded-full border font-medium transition-colors duration-300 ease-out-brand data-[open]:border-secondary",
          "before:absolute before:-inset-px before:-z-10 before:rounded-full before:bg-current before:transition-opacity before:duration-300 before:ease-out-brand",
          "hover:before:opacity-15 data-[open]:before:opacity-15",
          VARIANTS[variant].button,
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
