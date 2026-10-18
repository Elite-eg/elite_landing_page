"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { FiX } from "react-icons/fi";
import type { JobOpening } from "../data/jobsData";
import { JobApplyForm } from "./JobApplyForm";

export interface JobApplyModalProps {
  job: JobOpening;
  isOpen: boolean;
  onClose: () => void;
}

/** Application dialog for one opening. Above the fixed header (z-index scale in elite-design-rules.txt). */
export function JobApplyModal({ job, isOpen, onClose }: JobApplyModalProps) {
  const t = useTranslations("jobs");
  const jobTitle = t(`positions.${job.id}.title`);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[130]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#070e1c]/45 backdrop-blur-md transition-opacity duration-300 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-edge/60 bg-surface p-6 text-start shadow-2xl transition duration-300 ease-out data-[closed]:translate-y-6 data-[closed]:scale-95 data-[closed]:opacity-0 sm:p-8"
          >
            <div
              className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent motion-safe:animate-pulse"
              aria-hidden="true"
            />

            <div className="mb-6 flex items-start justify-between gap-4 border-b border-edge/40 pb-4 pt-1">
              <div>
                <DialogTitle className="text-lg font-extrabold text-surface-dark sm:text-xl">{t("applyModal.title")}</DialogTitle>
                <p className="mt-1 text-xs font-semibold text-secondary-dark sm:text-sm">{jobTitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("applyModal.close")}
                className="shrink-0 rounded-full p-2 text-content transition-colors hover:bg-surface-muted hover:text-surface-dark"
              >
                <FiX className="size-5" aria-hidden="true" />
              </button>
            </div>

            <JobApplyForm key={job.id} jobId={job.id} jobTitle={jobTitle} onSent={onClose} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
