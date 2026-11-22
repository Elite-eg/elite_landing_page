"use client";

import { useTranslations } from "next-intl";
import { FilterPills } from "@/app/components/shared/FilterPills";
import type { TopicFilterValue } from "./learnData";

export interface TopicFilterProps {
  options: readonly TopicFilterValue[];
  value: TopicFilterValue;
  onChange: (value: TopicFilterValue) => void;
  /** Accessible name of the group, e.g. "Filter videos by topic". */
  label: string;
}

/** Topic pills under a learn hero (bordered `md` pills, as on the projects page). */
export function TopicFilter({ options, value, onChange, label }: TopicFilterProps) {
  const t = useTranslations("learn");

  return (
    <FilterPills
      options={options}
      value={value}
      onChange={onChange}
      getLabel={(option) => (option === "all" ? t("allTopics") : t(`topics.${option}`))}
      label={label}
      size="md"
    />
  );
}
