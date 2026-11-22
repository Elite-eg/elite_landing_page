import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { StretchedLink } from "@/app/components/shared/StretchedLink";
import { cn } from "@/lib/utils";
import type { NextStep } from "../data/homeData";

export interface NextStepCardProps {
  step: NextStep;
}

/**
 * A free offer on the navy band (Figma "Magnet"): icon tile and a badge (time it takes or "PDF"), title, what you
 * get and the action, which is the link and covers the whole card. The featured card is solid orange.
 */
export function NextStepCard({ step: { key, icon: Icon, href, featured = false } }: NextStepCardProps) {
  const t = useTranslations(`home.nextSteps.items.${key}`);
  const titleId = `next-step-${key}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-3.5 rounded-3xl px-6 pb-6 pt-7 transition duration-300 ease-out-brand",
        featured
          ? "bg-secondary shadow-glow hover:bg-secondary-dark"
          : "border border-white/[0.14] bg-white/[0.06] hover:border-white/30 hover:bg-white/10"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn("grid size-11 place-items-center rounded-xl", featured ? "bg-white/20" : "bg-secondary")}
          aria-hidden="true"
        >
          <Icon className="size-[1.375rem] text-white" />
        </span>
        <span className="rounded-full bg-white/[0.14] px-2.5 py-0.5 text-xs font-medium text-white">{t("badge")}</span>
      </div>

      <h3 id={titleId} className="text-lg font-bold text-white">
        {t("title")}
      </h3>
      <p className={cn("text-caption", featured ? "text-white/90" : "text-content-dark")}>{t("description")}</p>

      {/* Three "Download the guide" links: aria-describedby tells them apart by their card title. */}
      <StretchedLink
        href={href}
        aria-describedby={titleId}
        className="mt-auto inline-flex items-center gap-2 font-heading text-caption font-semibold text-white after:rounded-3xl"
      >
        {t("action")}
        <FiArrowRight
          className="size-[1.0625rem] shrink-0 transition-transform duration-200 ease-out-brand group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      </StretchedLink>
    </article>
  );
}
