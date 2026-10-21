"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { JOBS_OPEN_POSITIONS_ID } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { OPEN_JOB_POSITIONS, type JobOpening } from "../data/jobsData";
import { JobApplyModal } from "./JobApplyModal";
import { JobCategoryFilter, type JobCategoryFilterValue } from "./JobCategoryFilter";
import { JobOpeningList } from "./JobOpeningList";
import { OpenApplicationNote } from "./OpenApplicationNote";

const HAS_OPENINGS = OPEN_JOB_POSITIONS.length > 0;

/**
 * Open roles (anchor target of JOBS_OPEN_POSITIONS_HREF): title and department filter share one row that
 * slides in from the end side, then the filterable list, an open-application note and the apply modal.
 */
export function OpenPositionsSection() {
  const t = useTranslations("jobs.openPositions");
  const [category, setCategory] = useState<JobCategoryFilterValue>("all");
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobs = category === "all" ? OPEN_JOB_POSITIONS : OPEN_JOB_POSITIONS.filter((job) => job.category === category);

  const openModal = (job: JobOpening) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <section id={JOBS_OPEN_POSITIONS_ID} className="bg-surface pb-20 pt-4 sm:pb-28 sm:pt-8">
      <Container>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <SectionHeading
            title={t("title")}
            align="start"
            size="compact"
            revealPreset="slideInFromEnd"
            headingClassName="text-body"
            className="mb-0"
          />
          {HAS_OPENINGS && (
            <Reveal preset="slideInFromEnd">
              <JobCategoryFilter value={category} onChange={setCategory} />
            </Reveal>
          )}
        </div>

        {/* Screen readers hear the new count after a filter change. */}
        <p className="sr-only" aria-live="polite">
          {t("resultsCount", { count: jobs.length })}
        </p>

        {HAS_OPENINGS && <JobOpeningList jobs={jobs} filterKey={category} onApply={openModal} />}
        <Reveal className={cn(HAS_OPENINGS && "mt-6")}>
          <OpenApplicationNote hasOpenings={HAS_OPENINGS} />
        </Reveal>
      </Container>

      {/* Stays mounted after closing so the exit transition can play. */}
      {selectedJob && <JobApplyModal job={selectedJob} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
