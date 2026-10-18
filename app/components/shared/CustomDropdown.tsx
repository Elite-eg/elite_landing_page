"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface DropdownOption<T = string | number> {
  label: string;
  value: T;
  icon?: React.ReactNode;
}

export interface CustomDropdownProps<T = string | number> {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  optionsClassName?: string;
  size?: "sm" | "md" | "lg";
  align?: "start" | "end";
}

export function CustomDropdown<T extends string | number>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  buttonClassName,
  optionsClassName,
  size = "md",
  align = "start",
}: CustomDropdownProps<T>) {
  const selectedOption = options.find((opt) => opt.value === value);

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs rounded-xl",
    md: "px-4 py-2 text-xs sm:text-sm rounded-2xl",
    lg: "px-5 py-2.5 text-sm sm:text-base rounded-2xl",
  }[size];

  const anchorPosition = align === "end" ? "bottom end" : "bottom start";

  return (
    <div className={cn("relative inline-block text-start outline-none focus:outline-none", className)}>
      <Listbox value={value} onChange={onChange}>
        <ListboxButton
          className={cn(
            "group flex items-center justify-between gap-2.5 bg-surface-alt text-body font-bold shadow-sm transition-all duration-200 hover:bg-surface-muted hover:scale-[1.02] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 outline-none ring-0 cursor-pointer active:scale-[0.98]",
            sizeClasses,
            buttonClassName
          )}
        >
          <span className="flex items-center gap-2 truncate">
            {selectedOption?.icon}
            <span className="truncate">{selectedOption?.label || placeholder}</span>
          </span>
          <FiChevronDown className="size-4 text-content/60 transition-transform duration-300 group-data-[open]:rotate-180 shrink-0" />
        </ListboxButton>

        <ListboxOptions
          modal={false}
          transition
          anchor={anchorPosition}
          className={cn(
            "z-50 mt-2 min-w-[170px] max-h-64 overflow-auto rounded-3xl bg-surface p-2.5 shadow-2xl transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 border border-edge/60 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 outline-none ring-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            optionsClassName
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <ListboxOption
                key={String(option.value)}
                value={option.value}
                className={cn(
                  "group flex items-center justify-between gap-2.5 cursor-pointer select-none rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-150 focus:outline-none outline-none",
                  isSelected
                    ? "bg-surface-info text-secondary font-bold"
                    : "text-body hover:bg-surface-alt hover:text-secondary ltr:hover:translate-x-0.5 rtl:hover:-translate-x-0.5"
                )}
              >
                <span className="flex items-center gap-2 truncate text-start">
                  {option.icon}
                  <span className="truncate">{option.label}</span>
                </span>
                {isSelected && <FiCheck className="size-3.5 text-secondary shrink-0 ms-2" />}
              </ListboxOption>
            );
          })}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
