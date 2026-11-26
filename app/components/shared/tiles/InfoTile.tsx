import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CARD_HOVER_CLASSES } from "../cardStyles";

/**
 * - surface:  white tile for a grey band (agents benefits, partners steps)
 * - muted:    grey tile for a white band (partners benefits and commission)
 * - outlined: white tile with a line border for a white band (agents steps)
 */
export type InfoTileTone = "surface" | "muted" | "outlined";

const TONE_CLASSES: Record<InfoTileTone, string> = {
  surface: "border-transparent bg-surface hover:border-edge",
  muted: "border-transparent bg-surface-alt hover:border-edge",
  outlined: "border-edge bg-surface hover:border-primary/20",
};

export interface InfoTileProps {
  title: string;
  text: ReactNode;
  /** Shown above the title: a step number (`StepNumber`) or a figure. */
  lead?: ReactNode;
  tone?: InfoTileTone;
}

/**
 * Figma "Tile": optional lead, title and one line of detail. Rests on a small shadow; hover: border, bigger shadow
 * and title tint. It is a `group/tile`, so a lead can react to the hover too (StepNumber turns orange).
 */
export function InfoTile({ title, text, lead, tone = "surface" }: InfoTileProps) {
  return (
    <article
      className={cn(
        "group/tile flex h-full flex-col items-start gap-2.5 rounded-2xl border p-6 sm:p-7",
        TONE_CLASSES[tone],
        CARD_HOVER_CLASSES
      )}
    >
      {lead}
      <h3 className="text-lg font-semibold leading-snug text-body transition-colors duration-300 ease-out-brand group-hover/tile:text-primary">
        {title}
      </h3>
      <p className="text-caption text-ink-700">{text}</p>
    </article>
  );
}
