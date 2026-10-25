import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";

export interface StepCardProps {
  /** Position in the sequence, from 1. */
  step: number;
  title: string;
  text: string;
}

/**
 * Outlined tile with a navy step circle (Figma "Tile" + "circle"). Rests on a small shadow; hover: the border
 * darkens, the shadow grows, the circle turns orange and the title takes the brand navy.
 */
export function StepCard({ step, title, text }: StepCardProps) {
  return (
    <article className={cn("group flex h-full flex-col items-start gap-2.5 rounded-2xl border border-edge bg-surface p-6 hover:border-primary/20 sm:p-7", CARD_HOVER_CLASSES)}>
      <span
        dir="ltr"
        className="grid size-9 place-items-center rounded-full bg-primary-dark text-[0.9375rem] font-semibold text-surface transition-colors duration-300 ease-out-brand group-hover:bg-secondary"
      >
        {step}
      </span>
      <h3 className="text-lg font-semibold leading-snug text-body transition-colors duration-300 ease-out-brand group-hover:text-primary">
        {title}
      </h3>
      <p className="text-caption text-ink-700">{text}</p>
    </article>
  );
}
