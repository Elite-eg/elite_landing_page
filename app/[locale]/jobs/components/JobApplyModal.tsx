"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { FiBriefcase, FiX } from "react-icons/fi";
import type { JobOpening } from "../data/jobsData";
import { JobApplyForm } from "./JobApplyForm";
import { JobMeta } from "./JobMeta";
import { JobRoleDetails } from "./JobRoleDetails";
import { JobTitleText } from "./JobTitleText";

export interface JobApplyModalProps {
  job: JobOpening;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Application dialog for one opening, above the fixed header (z-index scale in elite-design-rules.txt).
 * Pinned header (role title + meta) and footer (actions); the role details and fields scroll in between.
 */
export function JobApplyModal({ job, isOpen, onClose }: JobApplyModalProps) {
  const t = useTranslations("jobs");
  const jobTitle = t(`positions.${job.id}.title`);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[130]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#070e1c]/45 backdrop-blur-md transition-opacity duration-300 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6">
        <DialogPanel
          transition
          className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-surface text-start shadow-lift transition duration-300 ease-out-brand data-[closed]:translate-y-4 data-[closed]:scale-[0.98] data-[closed]:opacity-0"
        >
          <header className="flex items-start gap-4 border-b border-edge px-5 py-4 sm:px-8 sm:py-6">
            <span className="hidden size-12 shrink-0 place-items-center rounded-2xl bg-surface-muted text-primary sm:grid" aria-hidden="true">
              <FiBriefcase className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-caption font-medium text-content">{t("applyModal.title")}</p>
              <DialogTitle className="mt-0.5 text-balance text-base font-bold leading-snug text-body sm:text-xl">
                <JobTitleText title={jobTitle} />
              </DialogTitle>
              {/* On phones the chips move into the scrolling body, so the pinned header stays short. */}
              <JobMeta job={job} variant="chips" className="mt-3 hidden sm:flex" />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("applyModal.close")}
              className="group/close -me-2 -mt-1 shrink-0 rounded-full p-2 text-content transition-colors duration-300 ease-out-brand hover:bg-surface-muted hover:text-surface-dark"
            >
              <FiX
                className="size-5 transition-transform duration-300 ease-out-brand group-hover/close:rotate-90 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </button>
          </header>

          <JobApplyForm key={job.id} jobId={job.id} jobTitle={jobTitle} onSent={onClose}>
            <JobMeta job={job} variant="chips" className="sm:hidden" />
            <JobRoleDetails job={job} />
          </JobApplyForm>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
