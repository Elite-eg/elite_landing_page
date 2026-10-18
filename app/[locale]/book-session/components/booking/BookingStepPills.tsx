"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type BookingStep = "schedule" | "details" | "success";

export interface BookingStepPillsProps {
  step: BookingStep;
  onSelectStep: (step: BookingStep) => void;
}

const STEPS_CONFIG: {
  id: BookingStep;
  translationKey: "steps.date" | "steps.details" | "steps.confirm";
  activeClass: string;
}[] = [
  { id: "schedule", translationKey: "steps.date", activeClass: "bg-primary-deep text-surface shadow-md scale-105" },
  { id: "details", translationKey: "steps.details", activeClass: "bg-primary-deep text-surface shadow-md scale-105" },
  { id: "success", translationKey: "steps.confirm", activeClass: "bg-success text-surface shadow-md scale-105" },
];

export function BookingStepPills({ step, onSelectStep }: BookingStepPillsProps) {
  const t = useTranslations("booking");

  return (
    <div className="flex items-center justify-between gap-1 pb-6 mb-6 border-b border-edge/60 text-xs sm:text-sm font-bold">
      {STEPS_CONFIG.map(({ id, translationKey, activeClass }) => {
        const isActive = step === id;
        const isClickable = id === "schedule";

        return (
          <div
            key={id}
            className={cn(
              "flex-1 py-2 px-3 rounded-full text-center transition-all duration-300",
              isClickable && "cursor-pointer active:scale-95",
              isActive ? activeClass : "bg-surface-alt text-content hover:bg-surface-muted",
            )}
            onClick={() => isClickable && onSelectStep(id)}
          >
            {t(translationKey)}
          </div>
        );
      })}
    </div>
  );
}
