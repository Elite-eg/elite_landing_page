import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { solutionsSectorHref } from "@/lib/sectors";
import { cn } from "@/lib/utils";
import { CARD_HOVER_CLASSES } from "../cardStyles";
import { StretchedLink } from "../StretchedLink";
import type { Sector } from "./sectorsData";

export interface SectorCardProps {
  sector: Sector;
}

/**
 * A sector (Figma "Industry"): navy icon tile, name (opens the solutions page on the sector's workday), what it
 * covers, its key apps. Home sectors section, solutions page.
 */
export function SectorCard({ sector: { key, icon: Icon } }: SectorCardProps) {
  const t = useTranslations("sectors.items");
  const tNav = useTranslations("nav.sectorsItems");

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-[1.125rem] rounded-3xl border border-edge bg-surface px-7 pb-[1.625rem] pt-[1.875rem] hover:border-primary/20",
        CARD_HOVER_CLASSES
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-[2.875rem] place-items-center rounded-xl bg-primary text-white" aria-hidden="true">
          <Icon className="size-[1.375rem]" />
        </span>
        <FiArrowRight
          className="size-[1.125rem] text-navy-300 transition duration-300 ease-out-brand group-hover:translate-x-0.5 group-hover:text-secondary-dark rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-xl font-semibold text-body">
        <StretchedLink href={solutionsSectorHref(key)} className="after:rounded-3xl">
          {tNav(key)}
        </StretchedLink>
      </h3>
      <p className="text-caption leading-relaxed text-content">{t(`${key}.description`)}</p>
      <hr className="mt-auto border-edge/60" />
      <p className="flex items-center gap-2 font-heading text-caption font-medium text-primary">
        <span className="size-[7px] shrink-0 rounded-full bg-secondary" aria-hidden="true" />
        {t(`${key}.apps`)}
      </p>
    </article>
  );
}
