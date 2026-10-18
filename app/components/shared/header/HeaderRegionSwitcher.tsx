"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useTranslations } from "next-intl";
import ReactCountryFlag from "react-country-flag";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useRegion } from "@/app/store/useRegion";

export interface HeaderRegionSwitcherProps {
  /** "dark" = on the navy top bar, "light" = inside the white drawer. */
  tone?: "dark" | "light";
  /** Where the options open relative to the button. */
  anchor?: "bottom end" | "top start" | "top end";
}

/** Country / currency picker ("مصر · ج.م"). Choice is stored in Redux + the "region" cookie. */
export function HeaderRegionSwitcher({ tone = "dark", anchor = "bottom end" }: HeaderRegionSwitcherProps) {
  const t = useTranslations("nav");
  const { region, changeRegion } = useRegion();

  return (
    <Menu>
      <MenuButton
        aria-label={t("regionLabel")}
        className={cn(
          "group inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-0.5 transition-colors duration-200 ease-out-brand",
          tone === "dark"
            ? "border-surface/15 bg-surface/5 text-content-dark hover:border-surface/30 hover:text-surface data-[open]:text-surface"
            : "border-edge bg-surface text-body hover:border-primary/30 hover:text-primary"
        )}
      >
        <ReactCountryFlag countryCode={region} svg aria-hidden className="!size-3.5 rounded-sm" />
        <span>{t(`regions.${region}`)}</span>
        <FiChevronDown aria-hidden className="size-3.5 transition-transform duration-200 group-data-[open]:rotate-180" />
      </MenuButton>

      <MenuItems
        transition
        anchor={{ to: anchor, gap: 8 }}
        className="z-[130] min-w-48 rounded-xl border border-edge bg-surface p-1.5 text-sm shadow-lift outline-none transition duration-150 ease-out-brand data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {REGIONS.map((option) => {
          const selected = option.code === region;
          return (
            <MenuItem key={option.code}>
              <button
                type="button"
                onClick={() => changeRegion(option.code)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-start transition-colors data-[focus]:bg-surface-alt",
                  selected ? "font-semibold text-primary" : "text-body"
                )}
              >
                <ReactCountryFlag countryCode={option.code} svg aria-hidden className="!size-4 rounded-sm" />
                <span className="flex-1">{t(`regions.${option.code}`)}</span>
                {selected && <FiCheck aria-hidden className="size-4 text-primary" />}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
