import { useTranslations } from "next-intl";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";
import type { PainPoint } from "../data/homeData";
import { SurfaceChip } from "./SurfaceChip";

export interface PainCardProps {
  pain: PainPoint;
}

/**
 * A problem and its solution (Figma "Pair"): the customer's words on a pale red band, then how Albiruni solves it,
 * where it runs (mobile app / web dashboard) and the area it belongs to.
 */
export function PainCard({ pain: { key, icon: Icon, surfaces } }: PainCardProps) {
  const t = useTranslations("home.pains");

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-3xl border border-edge bg-surface hover:border-primary/20",
        CARD_HOVER_CLASSES
      )}
    >
      <div className="flex flex-col gap-2.5 bg-danger/5 px-6 pb-[1.125rem] pt-[1.375rem]">
        <p className="flex items-center gap-1.5 text-xs font-medium text-danger">
          <span className="size-[7px] rounded-full bg-danger" aria-hidden="true" />
          {t("problemLabel")}
        </p>
        <h3 className="text-lg font-semibold leading-normal text-body">{t(`items.${key}.problem`)}</h3>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-6 pb-[1.375rem] pt-[1.125rem]">
        <p className="flex items-center gap-2 text-xs font-medium text-primary">
          <span className="grid size-[1.625rem] place-items-center rounded-lg bg-primary" aria-hidden="true">
            <Icon className="size-3.5 text-white" />
          </span>
          {t("solutionLabel")}
        </p>
        <p className="leading-relaxed text-ink-700">{t(`items.${key}.solution`)}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2.5 pt-1">
          <ul aria-label={t("surfacesLabel")} className="flex flex-wrap gap-1.5">
            {surfaces.map((surface) => (
              <SurfaceChip key={surface} surface={surface} label={t(`surfaces.${surface}`)} />
            ))}
          </ul>
          <p className="text-xs text-ink-400">{t(`items.${key}.area`)}</p>
        </div>
      </div>
    </article>
  );
}
