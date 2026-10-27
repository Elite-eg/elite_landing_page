"use client";

import { useState } from "react";
import Image from "next/image";
import { ListboxOption } from "@headlessui/react";
import { useLocale } from "next-intl";
import { FiCheck } from "react-icons/fi";
import type { AppLocale } from "@/lib/constants";
import type { Country, CountryCode } from "@/lib/countries";

/** Countries whose flag failed to load, so reopening the menu shows their code at once (no retry). */
const brokenFlags = new Set<CountryCode>();

export interface CountryOptionProps {
  country: Country;
}

/**
 * One row of CountrySwitcher: flag (or the country code when its line has no flag, or the image fails) and name;
 * the chosen one is tinted and checked.
 */
export function CountryOption({ country }: CountryOptionProps) {
  const locale = useLocale() as AppLocale;
  const [flagLoads, setFlagLoads] = useState(() => !brokenFlags.has(country.code));

  return (
    <ListboxOption
      value={country.code}
      className="group flex cursor-pointer select-none items-center gap-3 rounded-[0.625rem] px-3 py-2.5 transition-colors duration-150 data-[focus]:bg-surface-alt data-[selected]:bg-surface-alt"
    >
      {/* Decorative: the name next to it says the same. The ring keeps white stripes visible on white. */}
      {country.flag && flagLoads ? (
        <Image
          src={country.flag}
          alt=""
          width={28}
          height={21}
          unoptimized
          onError={() => {
            brokenFlags.add(country.code);
            setFlagLoads(false);
          }}
          className="h-[1.3125rem] w-7 shrink-0 rounded-[0.25rem] object-cover ring-1 ring-edge"
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid h-[1.3125rem] w-7 shrink-0 place-items-center rounded-[0.25rem] bg-navy-100 text-[0.625rem] font-semibold text-navy-900 transition-colors duration-150 group-data-[selected]:bg-navy-900 group-data-[selected]:text-white"
        >
          {country.code}
        </span>
      )}
      <span className="min-w-0 flex-1 text-caption font-medium text-body">{country.name[locale]}</span>
      <FiCheck aria-hidden="true" className="invisible size-4 shrink-0 text-body group-data-[selected]:visible" />
    </ListboxOption>
  );
}
