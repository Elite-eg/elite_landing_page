import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";

export interface StatementCardProps {
  label: string;
  title: string;
  text: string;
  /** "dark" = navy card (used once, as the section anchor), "light" = white card. */
  tone: "dark" | "light";
}

const TONE_CLASSES = {
  dark: {
    card: "bg-primary-deep shadow-lift",
    label: "text-secondary",
    title: "text-white",
    text: "text-content-dark",
  },
  light: {
    card: cn("border border-edge bg-surface hover:border-primary/20", CARD_HOVER_CLASSES),
    label: "text-secondary-dark",
    title: "text-primary",
    text: "text-content",
  },
} as const;

/** Mission / vision statement. */
export function StatementCard({ label, title, text, tone }: StatementCardProps) {
  const styles = TONE_CLASSES[tone];

  return (
    <article className={cn("flex h-full flex-col rounded-3xl p-7 sm:p-9", styles.card)}>
      <p className={cn("text-caption font-bold", styles.label)}>{label}</p>
      <h3 className={cn("mt-3 text-balance text-h3 font-bold", styles.title)}>{title}</h3>
      <p className={cn("mt-4 max-w-prose leading-loose", styles.text)}>{text}</p>
    </article>
  );
}
