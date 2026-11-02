"use client";

import { useTranslations } from "next-intl";
import { FilterPills } from "@/app/components/shared/FilterPills";
import { PROJECT_FILTERS, type ProjectFilterValue } from "../data/projectsData";

export interface ProjectCategoryFilterProps {
  value: ProjectFilterValue;
  onChange: (value: ProjectFilterValue) => void;
}

/** Project type pills under the hero copy. */
export function ProjectCategoryFilter({ value, onChange }: ProjectCategoryFilterProps) {
  const t = useTranslations("projects.filter");

  return (
    <FilterPills
      options={PROJECT_FILTERS}
      value={value}
      onChange={onChange}
      getLabel={(option) => t(`categories.${option}`)}
      label={t("label")}
      size="md"
    />
  );
}
