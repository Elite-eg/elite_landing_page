import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import type { JobOpening } from "../data/jobsData";
import { JobMeta } from "./JobMeta";
import { JobTitleText } from "./JobTitleText";

export interface JobOpeningCardProps {
  job: JobOpening;
  onApply: () => void;
}

/**
 * One opening (Figma "Role"): title and meta on the start side, "Apply now" on the end side.
 * The button's ::after stretches over the card, so the whole row is one click target with a single tab stop
 * (the focus ring is drawn around the card).
 */
export function JobOpeningCard({ job, onApply }: JobOpeningCardProps) {
  const t = useTranslations("jobs");
  const titleId = `job-${job.id}-title`;

  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-edge bg-surface px-6 py-5 transition-colors duration-300 ease-out-brand hover:border-secondary/40 hover:bg-surface-warm/60 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      {/* Accent bar that grows from the middle of the start edge on hover / keyboard focus. */}
      <span
        className="pointer-events-none absolute inset-y-4 start-0 w-1 scale-y-0 rounded-e-full bg-secondary transition-transform duration-300 ease-out-brand group-hover:scale-y-100 group-has-[:focus-visible]:scale-y-100 motion-reduce:transition-none"
        aria-hidden="true"
      />
      <div className="space-y-1.5">
        <h3
          id={titleId}
          className="text-lg font-semibold leading-snug text-body transition-colors duration-300 ease-out-brand group-hover:text-primary"
        >
          <JobTitleText title={t(`positions.${job.id}.title`)} />
        </h3>
        <JobMeta job={job} />
      </div>

      {/* aria-describedby: ten "Apply now" buttons stay distinguishable for screen readers. */}
      <Button
        variant="text"
        icon={<FiArrowRight />}
        flipIconInRtl
        onClick={onApply}
        aria-describedby={titleId}
        className="shrink-0 self-start text-secondary-dark after:absolute after:inset-0 after:rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:ring-2 focus-visible:after:ring-secondary sm:self-center"
      >
        {t("openPositions.applyNow")}
      </Button>
    </article>
  );
}
