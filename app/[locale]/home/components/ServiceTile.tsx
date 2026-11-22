import { useTranslations } from "next-intl";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";
import type { HomeService } from "../data/homeData";

export interface ServiceTileProps {
  service: HomeService;
}

/** One service (Figma "Card"): outlined icon tile (turns navy on hover), title and what we do. */
export function ServiceTile({ service: { key, icon: Icon } }: ServiceTileProps) {
  const t = useTranslations(`home.services.items.${key}`);

  return (
    <article className={cn("group flex h-full flex-col gap-3.5 rounded-3xl bg-surface px-[1.625rem] py-7", CARD_HOVER_CLASSES)}>
      <span
        className="grid size-[2.875rem] place-items-center rounded-xl border border-edge bg-surface text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white"
        aria-hidden="true"
      >
        <Icon className="size-[1.375rem]" />
      </span>
      <h3 className="text-lg font-semibold leading-snug text-body">{t("title")}</h3>
      <p className="text-caption leading-relaxed text-content">{t("description")}</p>
    </article>
  );
}
