import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { JobOpening } from "../data/jobsData";

export type JobMetaVariant = "plain" | "chips";

export interface JobMetaProps {
  job: JobOpening;
  /** "plain" = spaced text (Figma role card), "chips" = small pills (apply modal header). */
  variant?: JobMetaVariant;
  className?: string;
}

const VARIANT_CLASSES: Record<JobMetaVariant, { list: string; item: string }> = {
  plain: { list: "gap-x-3.5 gap-y-1 text-caption text-content", item: "" },
  chips: { list: "gap-1.5 text-xs font-medium text-ink-700", item: "rounded-full bg-surface-alt px-2.5 py-1" },
};

/** Department, place (city · work mode) and contract type of an opening. */
export function JobMeta({ job, variant = "plain", className }: JobMetaProps) {
  const t = useTranslations("jobs.openPositions");
  const styles = VARIANT_CLASSES[variant];
  const items = [
    t(`categories.${job.category}`),
    t("place", { location: t(`locations.${job.location}`), workMode: t(`workModes.${job.workMode}`) }),
    t(`employmentTypes.${job.employmentType}`),
  ];

  return (
    <ul aria-label={t("metaLabel")} className={cn("flex flex-wrap", styles.list, className)}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
