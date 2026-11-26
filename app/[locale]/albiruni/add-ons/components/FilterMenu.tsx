"use client";

import { Listbox, ListboxButton } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { FiChevronDown } from "react-icons/fi";
import { SelectMenu } from "@/app/components/shared/form-handlers/SelectMenu";

export interface FilterMenuOption<T extends string> {
  value: T;
  /** Already-translated label. */
  label: string;
}

export interface FilterMenuProps<T extends string> {
  label: string;
  value: T;
  options: readonly FilterMenuOption<T>[];
  onChange: (value: T) => void;
  /** Name the chosen value even when it is "all" (price, sort). Other menus show only their label until set. */
  alwaysShowValue?: boolean;
}

/**
 * Toolbar dropdown (Figma "Filter/…", "Sort"): a white pill naming the filter and its value ("Compatibility: 2.4"),
 * opening the shared SelectMenu list (keyboard: arrows, type-ahead, Enter, Escape).
 */
export function FilterMenu<T extends string>({ label, value, options, onChange, alwaysShowValue = false }: FilterMenuProps<T>) {
  const t = useTranslations("addons.filters");
  const selected = options.find((option) => option.value === value);
  const text = selected && (alwaysShowValue || value !== "all") ? t("labelWithValue", { label, value: selected.label }) : label;

  return (
    <Listbox value={value} onChange={onChange}>
      <ListboxButton className="group inline-flex items-center gap-2 rounded-xl border border-edge bg-surface px-3.5 py-2.5 text-caption font-medium text-body transition-colors duration-200 hover:border-primary/30 data-[open]:border-secondary">
        {text}
        <FiChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-content transition-transform duration-200 group-data-[open]:rotate-180"
        />
      </ListboxButton>
      <SelectMenu options={options} anchor="bottom start" className="min-w-48" />
    </Listbox>
  );
}
