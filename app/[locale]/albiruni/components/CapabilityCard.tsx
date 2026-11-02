import type { IconType } from "react-icons";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";

export interface CapabilityCardProps {
  icon: IconType;
  title: string;
  text: string;
}

/** White capability tile: orange icon tile, title and one line of detail. Hover: border and bigger shadow. */
export function CapabilityCard({ icon: Icon, title, text }: CapabilityCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col items-start gap-3 rounded-2xl border border-edge bg-surface px-5 py-6 hover:border-primary/20",
        CARD_HOVER_CLASSES
      )}
    >
      <span className="rounded-xl bg-surface-warm p-2.5 text-secondary-dark">
        <Icon className="size-[1.375rem]" aria-hidden="true" />
      </span>
      <h3 className="text-base font-semibold leading-snug text-body">{title}</h3>
      <p className="text-caption text-content">{text}</p>
    </article>
  );
}
