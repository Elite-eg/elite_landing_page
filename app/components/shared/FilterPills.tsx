"use client";

import { useId, type ReactNode } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { motion } from "framer-motion";
import { layoutTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type FilterPillsSize = "sm" | "md" | "segmented";

export interface FilterPillsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  /** Label of a pill: text, or text plus a small extra such as a Badge (pricing "Save 20%"). */
  getLabel: (option: T) => ReactNode;
  /** Accessible name of the group, e.g. "Filter roles by department". */
  label: string;
  /**
   * "sm" = filter beside a section title (jobs), "md" = bordered pills under a hero (projects),
   * "segmented" = borderless pills inside one white bordered track (pricing billing toggle).
   */
  size?: FilterPillsSize;
}

const SIZE_CLASSES: Record<FilterPillsSize, { group: string; pill: string; indicator: string }> = {
  sm: { group: "flex flex-wrap gap-2", pill: "px-3.5 py-1.5", indicator: "inset-0" },
  /** The indicator also covers the 1px border, so the chosen pill is solid navy. */
  md: { group: "flex flex-wrap gap-2", pill: "border border-edge px-[1.125rem] py-2", indicator: "-inset-px" },
  segmented: {
    group: "inline-flex gap-1 rounded-full border border-edge bg-surface p-1",
    pill: "bg-transparent px-[1.125rem] py-2 hover:bg-surface-alt",
    indicator: "inset-0",
  },
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
    <RadioGroup value={value} onChange={onChange} aria-label={label} className={cn("isolate", SIZE_CLASSES[size].group)}>
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
