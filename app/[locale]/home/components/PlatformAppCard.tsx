import { useTranslations } from "next-intl";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";
import type { PlatformApp } from "../data/homeData";

export interface PlatformAppCardProps {
  app: PlatformApp;
}

/** One Albiruni app (Figma "App"): icon tile, name and what it covers. Hover = the Figma's highlighted tile. */
export function PlatformAppCard({ app: { key, icon: Icon } }: PlatformAppCardProps) {
  const t = useTranslations(`home.apps.items.${key}`);

  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-3.5 rounded-2xl border border-edge bg-surface px-5 py-[1.375rem] hover:border-secondary",
        CARD_HOVER_CLASSES
      )}
    >
      <span
        className="grid size-11 place-items-center rounded-xl bg-surface-muted text-primary transition-colors duration-300 group-hover:bg-surface-warm group-hover:text-secondary-dark"
        aria-hidden="true"
      >
        <Icon className="size-[1.375rem]" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold leading-snug text-body">{t("name")}</h3>
        <p className="text-xs text-content">{t("description")}</p>
      </div>
    </article>
  );
}
