import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";

export interface BenefitCardProps {
  title: string;
  text: string;
}

/**
 * White tile on the grey band (Figma "Tile"): title and one line of detail.
 * Rests on a small shadow; hover: border, bigger shadow and title tint.
 */
export function BenefitCard({ title, text }: BenefitCardProps) {
  return (
    <article className={cn("group flex h-full flex-col gap-2.5 rounded-2xl border border-transparent bg-surface p-6 hover:border-edge sm:p-7", CARD_HOVER_CLASSES)}>
      <h3 className="text-lg font-semibold leading-snug text-body transition-colors duration-300 ease-out-brand group-hover:text-primary">
        {title}
      </h3>
      <p className="text-caption text-ink-700">{text}</p>
    </article>
  );
}
