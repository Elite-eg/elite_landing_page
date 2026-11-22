import { useTranslations } from "next-intl";
import { Reveal } from "@/app/components/shared/Reveal";
import { cn } from "@/lib/utils";
import type { PROCESS_STEPS } from "../data/homeData";

export interface ProcessStepProps {
  step: (typeof PROCESS_STEPS)[number];
  /** Position in the sequence, from 0: shown as 01, 02, …; the first step is orange (where everyone starts). */
  index: number;
}

/** One stage of how we work (reveals with the list's RevealGroup) (Figma "Step"): numbered circle on the line, title, what happens, how long it takes. */
export function ProcessStep({ step, index }: ProcessStepProps) {
  const t = useTranslations(`home.process.steps.${step}`);
  const isFirst = index === 0;

  return (
    <li>
      <Reveal inGroup className="flex gap-5 lg:flex-col lg:gap-3">
        <span
          className={cn(
            "relative z-10 grid size-[3.375rem] shrink-0 place-items-center rounded-full border font-heading text-base font-bold",
            isFirst ? "border-secondary bg-secondary text-white" : "border-navy-200 bg-surface text-primary"
          )}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col items-start gap-3 pt-3 lg:pt-0">
          <h3 className="text-xl font-semibold text-body">{t("title")}</h3>
          <p className="text-caption leading-relaxed text-content">{t("description")}</p>
          <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-primary">{t("duration")}</span>
        </div>
      </Reveal>
    </li>
  );
}
