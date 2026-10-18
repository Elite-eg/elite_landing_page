"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { JOBS_OPEN_POSITIONS_ID } from "@/lib/constants";
import { OPEN_JOB_POSITIONS, type JobOpening } from "../data/jobsData";
import { JobApplyModal } from "./JobApplyModal";
import { JobCategoryFilter, type JobCategoryFilterValue } from "./JobCategoryFilter";
import { JobOpeningCard } from "./JobOpeningCard";

/** Filterable openings list (anchor target of JOBS_OPEN_POSITIONS_HREF) + the apply modal. */
export function OpenPositionsSection() {
  const t = useTranslations("jobs.openPositions");
  const [category, setCategory] = useState<JobCategoryFilterValue>("all");
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobs = OPEN_JOB_POSITIONS.filter((job) => category === "all" || job.category === category);

  const openModal = (job: JobOpening) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <section id={JOBS_OPEN_POSITIONS_ID} className="bg-surface py-16 sm:py-24">
      <Container>
        {/* The jobs page keeps its original darker heading color (surface-dark). */}
        <SectionHeading title={t("title")} align="start" className="mb-8 sm:mb-8 [&_h2]:text-surface-dark" />
        <JobCategoryFilter value={category} onChange={setCategory} />

        {/* Re-keyed per category so the new list staggers in. */}
        <RevealGroup key={category} className="mt-10 space-y-4">
          {jobs.map((job) => (
            <Reveal key={job.id} inGroup>
              <JobOpeningCard job={job} onApply={() => openModal(job)} />
            </Reveal>
          ))}
        </RevealGroup>

        {jobs.length === 0 && (
          <p className="mt-10 rounded-2xl border border-edge/60 bg-surface-alt p-8 text-center text-sm text-content">
            {t("noJobsFound")}
          </p>
        )}
      </Container>

      {/* Stays mounted after closing so the exit transition can play. */}
      {selectedJob && <JobApplyModal job={selectedJob} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
