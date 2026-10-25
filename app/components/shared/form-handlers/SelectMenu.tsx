"use client";

import { ListboxOption, ListboxOptions } from "@headlessui/react";
import { FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  /** Already-translated label. */
  label: string;
}

export interface SelectMenuProps {
  options: readonly SelectOption[];
  /** Side the panel lines up with. Logical: "start" is the right edge in Arabic. */
  anchor?: "bottom" | "bottom start" | "bottom end";
  /** Width, e.g. "w-[var(--button-width)]" to match the field. */
  className?: string;
}

/**
 * Open list of a form Listbox: white panel, one row per option; the selected one is tinted and checked.
 * Modal (Headless UI default): like a native select, the page can't scroll while it's open and a click outside
 * closes it, so the list never drifts away from its field.
 */
export function SelectMenu({ options, anchor = "bottom", className }: SelectMenuProps) {
  return (
    <ListboxOptions
      transition
      anchor={{ to: anchor, gap: 6, padding: 16 }}
      className={cn(
        "z-[130] flex max-h-80 flex-col gap-1 overflow-y-auto rounded-2xl border border-edge bg-surface p-2 shadow-lift",
        // Focus moves into the open panel: no global orange focus ring around it (the active row is tinted instead).
        "outline-none ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        "transition duration-150 ease-out-brand data-[closed]:scale-95 data-[closed]:opacity-0",
        className
      )}
    >
      {options.map((option) => (
        <ListboxOption
          key={option.value}
          value={option.value}
          className="group flex cursor-pointer select-none items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-caption font-medium text-body transition-colors data-[focus]:bg-surface-alt data-[selected]:bg-surface-alt"
        >
          <span className="min-w-0">{option.label}</span>
          <FiCheck aria-hidden="true" className="invisible size-4 shrink-0 text-primary group-data-[selected]:visible" />
        </ListboxOption>
      ))}
    </ListboxOptions>
  );
}
