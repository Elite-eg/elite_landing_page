"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { listItemFromEnd, listSwap, viewportOnce } from "@/lib/animations";
import type { JobOpening } from "../data/jobsData";
import { AnimatedHeight } from "./AnimatedHeight";
import { JobOpeningCard } from "./JobOpeningCard";

export interface JobOpeningListProps {
  jobs: JobOpening[];
  /** Changes with the filter: the current list fades out, then the new rows come in. */
  filterKey: string;
  onApply: (job: JobOpening) => void;
}

/**
 * Rows slide in from the end side one after another once the list is in view (Figma motion). A filter change
 * swaps the whole list: the old one fades out, the new rows slide in from the top, and the height follows
 * smoothly, so rows never overlap, leave gaps or make the content below jump.
 */
export function JobOpeningList({ jobs, filterKey, onApply }: JobOpeningListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(listRef, viewportOnce);
  const row = listItemFromEnd(useLocale() === "ar");

  return (
    <div ref={listRef}>
      <AnimatedHeight>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul key={filterKey} variants={listSwap} exit="exit" className="flex flex-col gap-3.5">
            {jobs.map((job, index) => (
              <motion.li
                key={job.id}
                custom={index}
                variants={row}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <JobOpeningCard job={job} onApply={() => onApply(job)} />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </AnimatedHeight>
    </div>
  );
}
