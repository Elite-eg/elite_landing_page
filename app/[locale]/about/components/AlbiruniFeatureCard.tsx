import type { IconType } from "react-icons";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";

export interface AlbiruniFeatureCardProps {
  icon: IconType;
  title: string;
  text: string;
}

export function AlbiruniFeatureCard({ icon: Icon, title, text }: AlbiruniFeatureCardProps) {
  return (
    <article className={cn("group h-full rounded-2xl border border-edge bg-surface p-6 hover:border-primary/25", CARD_HOVER_CLASSES)}>
      <span className="grid size-11 place-items-center rounded-xl bg-surface-alt text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-bold leading-snug text-primary">{title}</h3>
      <p className="mt-2 text-caption text-content">{text}</p>
    </article>
  );
}
