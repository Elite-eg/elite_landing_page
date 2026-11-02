"use client";

import { useId } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { motion } from "framer-motion";
import { layoutTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type FilterPillsSize = "sm" | "md";

export interface FilterPillsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
  /** Accessible name of the group, e.g. "Filter roles by department". */
  label: string;
  /** "sm" = filter beside a section title (jobs), "md" = bordered pills under a hero (projects). */
  size?: FilterPillsSize;
}

const SIZE_CLASSES: Record<FilterPillsSize, { pill: string; indicator: string }> = {
  sm: { pill: "px-3.5 py-1.5", indicator: "inset-0" },
  /** The indicator also covers the 1px border, so the chosen pill is solid navy. */
  md: { pill: "border border-edge px-[1.125rem] py-2", indicator: "-inset-px" },
};

/**
 * Filter pills (keyboard accessible radio group: arrow keys move the selection).
 * The navy indicator glides to the selected pill (shared layout animation) with the labels above it. The new
 * label turns white 100ms in, as the indicator arrives, so it never shows white on the grey pill.
 */
export function FilterPills<T extends string>({
  options,
  value,
  onChange,
  getLabel,
  label,
  size = "sm",
}: FilterPillsProps<T>) {
  const indicatorId = useId();

  return (
    <RadioGroup value={value} onChange={onChange} aria-label={label} className="isolate flex flex-wrap gap-2">
      {options.map((option) => (
        <Radio
          key={option}
          value={option}
          className={cn(
            "relative cursor-pointer rounded-full bg-surface-alt text-caption font-medium text-ink-700 transition-colors duration-150 hover:bg-surface-muted hover:text-primary data-[checked]:text-surface data-[checked]:delay-100",
            SIZE_CLASSES[size].pill
          )}
        >
          {({ checked }) => (
            <>
              {checked && (
                <motion.span
                  layoutId={indicatorId}
                  transition={layoutTransition}
                  className={cn("absolute z-10 rounded-full bg-primary", SIZE_CLASSES[size].indicator)}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-20">{getLabel(option)}</span>
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  );
}
