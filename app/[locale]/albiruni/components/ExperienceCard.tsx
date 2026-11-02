import type { IconType } from "react-icons";
import { Badge, type BadgeVariant } from "@/app/components/shared/Badge";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";
import type { ExperienceTone } from "../data/albiruniData";
import { ExperiencePoints } from "./ExperiencePoints";

export interface ExperienceCardProps {
  icon: IconType;
  tone: ExperienceTone;
  tag: string;
  title: string;
  description: string;
  points: string[];
}

interface ToneStyles {
  card: string;
  iconTile: string;
  badge: BadgeVariant;
  badgeClassName: string;
  title: string;
  description: string;
}

const TONE_STYLES: Record<ExperienceTone, ToneStyles> = {
  dark: {
    card: "bg-gradient-to-br from-primary to-primary-dark",
    iconTile: "bg-secondary",
    badge: "glass",
    badgeClassName: "border-transparent bg-white/10 text-secondary backdrop-blur-none",
    title: "text-white",
    description: "text-content-dark",
  },
  light: {
    card: cn("border border-transparent bg-surface-alt hover:border-edge", CARD_HOVER_CLASSES),
    iconTile: "bg-primary",
    badge: "primary",
    badgeClassName: "bg-surface-muted",
    title: "text-body",
    description: "text-content",
  },
};

/** One way into Albiruni (Figma "Experience"): icon tile + tag, title, description and a checked list. */
export function ExperienceCard({ icon: Icon, tone, tag, title, description, points }: ExperienceCardProps) {
  const styles = TONE_STYLES[tone];

  return (
    <article className={cn("flex h-full flex-col items-start gap-5 rounded-3xl p-7 sm:p-10", styles.card)}>
      <div className="flex items-center gap-3">
        <span className={cn("rounded-xl p-3 text-white", styles.iconTile)}>
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <Badge variant={styles.badge} className={cn("rounded-full text-[0.8125rem] font-medium", styles.badgeClassName)}>
          {tag}
        </Badge>
      </div>

      <h3 className={cn("text-balance text-2xl font-bold leading-snug sm:text-[1.75rem]", styles.title)}>{title}</h3>
      <p className={cn("max-w-[32.5rem]", styles.description)}>{description}</p>
      <ExperiencePoints points={points} tone={tone} />
    </article>
  );
}
