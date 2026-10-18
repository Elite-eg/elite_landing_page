"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type BookingStep = "schedule" | "details" | "success";

export interface StepPillsProps {
  step: BookingStep;
  onSelectStep: (step: BookingStep) => void;
}

const STEPS: { id: BookingStep; labelKey: "steps.date" | "steps.details" | "steps.confirm" }[] = [
  { id: "schedule", labelKey: "steps.date" },
  { id: "details", labelKey: "steps.details" },
  { id: "success", labelKey: "steps.confirm" },
];

const PILL_CLASS = "block rounded-full px-3 py-[0.3125rem] text-[0.78125rem] font-medium transition-colors";

/** Compact step indicator. Only the first step can be revisited. */
export function StepPills({ step, onSelectStep }: StepPillsProps) {
  const t = useTranslations("booking");

  return (
    <nav aria-label={t("stepsLabel")}>
      <ol className="flex flex-wrap items-center gap-2">
        {STEPS.map(({ id, labelKey }) => {
          const isActive = step === id;
          const pillClass = cn(PILL_CLASS, isActive ? "bg-primary text-white" : "bg-surface-alt text-content");

          return (
            <li key={id} aria-current={isActive ? "step" : undefined}>
              {id === "schedule" && !isActive ? (
                <button type="button" onClick={() => onSelectStep(id)} className={cn(pillClass, "cursor-pointer hover:bg-surface-muted")}>
                  {t(labelKey)}
                </button>
              ) : (
                <span className={pillClass}>{t(labelKey)}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
