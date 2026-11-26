"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { sequenceConnector, sequenceMarker, sequenceStep } from "@/lib/animations";
import type { SectorKey } from "@/lib/sectors";
import { cn } from "@/lib/utils";
import type { DayStep } from "../data/solutionsData";

export interface SectorDayStepProps {
  sector: SectorKey;
  step: DayStep;
  /** Position in the day, from 0: sets its turn in the motion; the first step is orange (where the day starts). */
  index: number;
  /** The last step has no line to a next one. */
  isLast: boolean;
}

/**
 * One moment of the workday (Figma "Step"): icon circle on the line, time, title, what happens. Centred under its
 * circle across the row from lg; beside it, down the start side, below that. The line to the next step draws as
 * the steps rise one after another (variants from the list).
 */
export function SectorDayStep({ sector, step: { key, time, icon: Icon }, index, isLast }: SectorDayStepProps) {
  const t = useTranslations(`solutions.day.${sector}.steps.${key}`);
  const isRtl = useLocale() === "ar";
  const isFirst = index === 0;

  return (
    <li className="relative lg:px-3">
      {!isLast && (
        <motion.span
          custom={index}
          variants={sequenceConnector(isRtl)}
          className="absolute -bottom-8 start-[1.6875rem] top-14 w-0.5 bg-secondary/60 lg:bottom-auto lg:start-[calc(50%+1.75rem)] lg:top-[1.6875rem] lg:h-0.5 lg:w-[calc(100%-3.5rem)]"
          aria-hidden="true"
        />
      )}

      <motion.div
        custom={index}
        variants={sequenceStep}
        className="flex gap-5 lg:flex-col lg:items-center lg:gap-3 lg:text-center"
      >
        <motion.span
          custom={index}
          variants={sequenceMarker}
          className={cn(
            "grid size-14 shrink-0 place-items-center rounded-full border-[1.5px]",
            isFirst ? "border-secondary bg-secondary text-white" : "border-navy-200 bg-surface text-primary"
          )}
          aria-hidden="true"
        >
          <Icon className="size-[1.375rem]" />
        </motion.span>

        <div className="flex flex-col items-start gap-3 pt-1 lg:items-center lg:pt-0">
          <time dateTime={time} dir="ltr" className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-primary">
            {time}
          </time>
          <h3 className="text-lg font-semibold text-body">{t("title")}</h3>
          <p className="text-caption leading-relaxed text-content lg:max-w-[13.125rem]">{t("description")}</p>
        </div>
      </motion.div>
    </li>
  );
}
