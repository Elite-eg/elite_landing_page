"use client";

import { useTranslations } from "next-intl";
import { FilterPills } from "@/app/components/shared/FilterPills";
import { OPEN_JOB_CATEGORIES, type JobCategory } from "../data/jobsData";

export type JobCategoryFilterValue = JobCategory | "all";

const OPTIONS: readonly JobCategoryFilterValue[] = ["all", ...OPEN_JOB_CATEGORIES];

export interface JobCategoryFilterProps {
  value: JobCategoryFilterValue;
  onChange: (value: JobCategoryFilterValue) => void;
}

/** Department pills on the open positions title row. */
export function JobCategoryFilter({ value, onChange }: JobCategoryFilterProps) {
  const t = useTranslations("jobs.openPositions");

  return (
    <FilterPills
      options={OPTIONS}
      value={value}
      onChange={onChange}
      getLabel={(option) => t(`categories.${option}`)}
      label={t("filterLabel")}
    />
  );
}
