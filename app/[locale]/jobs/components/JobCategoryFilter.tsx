"use client";

import { Radio, RadioGroup } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { JOB_CATEGORIES, type JobCategory } from "../data/jobsData";

export type JobCategoryFilterValue = JobCategory | "all";

const OPTIONS: readonly JobCategoryFilterValue[] = ["all", ...JOB_CATEGORIES];

export interface JobCategoryFilterProps {
  value: JobCategoryFilterValue;
  onChange: (value: JobCategoryFilterValue) => void;
}

/** Department pills (keyboard accessible radio group: arrow keys move the selection). */
export function JobCategoryFilter({ value, onChange }: JobCategoryFilterProps) {
  const t = useTranslations("jobs.openPositions");

  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      aria-label={t("filterLabel")}
      className="flex flex-wrap items-center gap-2 sm:gap-3"
    >
      {OPTIONS.map((option) => (
        <Radio
          key={option}
          value={option}
          className={cn(
            "cursor-pointer rounded-full bg-surface-muted px-4 py-2 text-xs font-semibold text-content transition-colors duration-200 sm:text-sm",
            "hover:bg-surface-alt hover:text-surface-dark data-[checked]:bg-primary-deep data-[checked]:text-surface data-[checked]:shadow-md"
          )}
        >
          {t(`categories.${option}`)}
        </Radio>
      ))}
    </RadioGroup>
  );
}
