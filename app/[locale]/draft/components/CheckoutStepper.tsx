import { useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { CHECKOUT_STEPS } from "../data/checkoutData";

interface CheckoutStepperProps {
  /** Index of the active step (0-based). */
  current: number;
  /** Marks the active step as finished too (activation succeeded). */
  isComplete?: boolean;
}

type StepState = "done" | "current" | "upcoming";

const CIRCLE_CLASSES: Record<StepState, string> = {
  done: "bg-success text-white",
  current: "bg-primary text-white ring-4 ring-primary/15",
  upcoming: "border border-edge bg-surface text-content",
};

export function CheckoutStepper({ current, isComplete = false }: CheckoutStepperProps) {
  const t = useTranslations("checkout.steps");

  return (
    <nav aria-label={t("label")}>
      <ol className="flex items-center justify-center gap-2 sm:gap-3">
        {CHECKOUT_STEPS.map((key, index) => {
          const state: StepState =
            index < current || (index === current && isComplete) ? "done" : index === current ? "current" : "upcoming";

          return (
            <li key={key} className="flex items-center gap-2 sm:gap-3" aria-current={state === "current" ? "step" : undefined}>
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-caption font-bold transition-colors duration-300",
                  CIRCLE_CLASSES[state]
                )}
              >
                {state === "done" ? <FiCheck className="size-4" aria-hidden="true" /> : index + 1}
              </span>
              <span className={cn("text-caption font-bold", state === "upcoming" ? "text-content" : "text-primary")}>
                {t(key)}
              </span>
              {index < CHECKOUT_STEPS.length - 1 && (
                <span
                  className={cn("h-px w-6 sm:w-14", index < current ? "bg-success" : "bg-edge")}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
