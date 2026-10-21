"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { expandCollapse, expandTransition } from "@/lib/animations";
import type { JobOpening } from "../data/jobsData";

export interface JobRoleDetailsProps {
  job: JobOpening;
}

/**
 * "About the role" card in the apply modal: summary + requirements, which expand and collapse smoothly
 * (collapsed first, so the form stays close).
 */
export function JobRoleDetails({ job }: JobRoleDetailsProps) {
  const t = useTranslations("jobs");
  const reduceMotion = useReducedMotion();
  const requirements = t.raw(`positions.${job.id}.requirements`) as string[];

  return (
    <section className="rounded-2xl bg-surface-alt p-4 sm:p-5">
      <h3 className="text-sm font-bold text-body">{t("applyModal.aboutRole")}</h3>
      <p className="mt-1.5 text-caption text-content">{t(`positions.${job.id}.summary`)}</p>

      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton className="group mt-3 inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-primary transition-colors duration-300 ease-out-brand hover:text-primary-dark">
              {t("applyModal.requirementsTitle")}
              <FiChevronDown
                className="size-4 shrink-0 transition-transform duration-300 ease-out-brand group-data-[open]:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </DisclosureButton>

            {/* The motion wrapper animates (Headless UI's own `transition` prop would clash); the panel stays static inside. */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="requirements"
                  variants={expandCollapse}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  transition={reduceMotion ? { duration: 0 } : expandTransition}
                  className="overflow-hidden"
                >
                  <DisclosurePanel static as="ul" className="mt-3 space-y-2 border-t border-edge pt-3">
                    {requirements.map((requirement) => (
                      <li key={requirement} className="flex gap-2.5 text-caption text-content">
                        <FiCheck className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                        {requirement}
                      </li>
                    ))}
                  </DisclosurePanel>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </Disclosure>
    </section>
  );
}
