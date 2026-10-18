import { useTranslations } from "next-intl";
import { FiArrowRight, FiBriefcase } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import type { JobOpening } from "../data/jobsData";

export interface JobOpeningCardProps {
  job: JobOpening;
  onApply: () => void;
}

/** One opening: title and tags on the start side, the apply button on the end side. */
export function JobOpeningCard({ job, onApply }: JobOpeningCardProps) {
  const t = useTranslations("jobs");
  const titleId = `job-${job.id}`;
  const tags = [
    t(`openPositions.categories.${job.category}`),
    t(`openPositions.locations.${job.location}`),
    t(`openPositions.workModes.${job.workMode}`),
    t(`openPositions.employmentTypes.${job.employmentType}`),
  ];

  return (
    <article className="group flex flex-col justify-between gap-6 rounded-2xl border border-edge/60 bg-surface-alt p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-secondary/40 hover:shadow-lg sm:p-8 md:flex-row md:items-center">
      <div className="space-y-3">
        <h3 id={titleId} className="text-lg font-bold leading-snug text-surface-dark transition-colors group-hover:text-primary sm:text-xl">
          {t(`positions.${job.id}.title`)}
        </h3>
        <ul aria-label={t("openPositions.tagsLabel")} className="flex flex-wrap items-center gap-2 sm:gap-3">
          {tags.map((tag, index) => (
            <li
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-md border border-edge/50 bg-surface px-3 py-1 text-xs font-medium text-content"
            >
              {index === 0 && <FiBriefcase className="size-3 shrink-0 text-secondary" aria-hidden="true" />}
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* aria-describedby: ten "Apply now" buttons stay distinguishable for screen readers. */}
      <Button
        variant="secondary"
        icon={<FiArrowRight />}
        flipIconInRtl
        onClick={onApply}
        aria-describedby={titleId}
        className="w-full shrink-0 shadow-md hover:shadow-xl md:w-auto"
      >
        {t("openPositions.applyNow")}
      </Button>
    </article>
  );
}
