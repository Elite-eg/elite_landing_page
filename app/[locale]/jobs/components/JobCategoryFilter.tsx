"use client";

import { useId } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { layoutTransition } from "@/lib/animations";
import { OPEN_JOB_CATEGORIES, type JobCategory } from "../data/jobsData";

export type JobCategoryFilterValue = JobCategory | "all";

const OPTIONS: readonly JobCategoryFilterValue[] = ["all", ...OPEN_JOB_CATEGORIES];

export interface JobCategoryFilterProps {
  value: JobCategoryFilterValue;
  onChange: (value: JobCategoryFilterValue) => void;
}

/**
 * Department pills (keyboard accessible radio group: arrow keys move the selection).
 * The navy indicator glides to the selected pill (shared layout animation) with the labels above it. The new
 * label turns white 100ms in, as the indicator arrives, so it never shows white on the grey pill.
 */
export function JobCategoryFilter({ value, onChange }: JobCategoryFilterProps) {
  const t = useTranslations("jobs.openPositions");
  const indicatorId = useId();

  return (
    <RadioGroup value={value} onChange={onChange} aria-label={t("filterLabel")} className="isolate flex flex-wrap gap-2">
      {OPTIONS.map((option) => (
        <Radio
          key={option}
          value={option}
          className="relative cursor-pointer rounded-full bg-surface-alt px-3.5 py-1.5 text-caption font-medium text-ink-700 transition-colors duration-150 hover:bg-surface-muted hover:text-primary data-[checked]:text-surface data-[checked]:delay-100"
        >
          {({ checked }) => (
            <>
              {checked && (
                <motion.span
                  layoutId={indicatorId}
                  transition={layoutTransition}
                  className="absolute inset-0 z-10 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-20">{t(`categories.${option}`)}</span>
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  );
}
