import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { StretchedLink } from "@/app/components/shared/StretchedLink";
import { cn } from "@/lib/utils";
import type { HeroPath } from "../data/homeData";

export interface HeroPathCardProps {
  path: HeroPath;
}

/**
 * One "where do you start?" card (Figma "Path"): icon, title, who it's for, the action and a short note. The action
 * is the link and covers the whole card. The featured card is solid orange (the hero's main action).
 */
export function HeroPathCard({ path: { key, icon: Icon, href, featured = false } }: HeroPathCardProps) {
  const t = useTranslations(`home.hero.paths.${key}`);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-3 rounded-2xl px-[1.375rem] pb-5 pt-[1.375rem] transition duration-300 ease-out-brand",
        featured
          ? "bg-secondary shadow-glow hover:bg-secondary-dark"
          : "border border-white/20 bg-white/[0.06] hover:border-white/30 hover:bg-white/10"
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn("grid size-[2.375rem] shrink-0 place-items-center rounded-xl", featured ? "bg-white/20" : "bg-secondary")}
          aria-hidden="true"
        >
          <Icon className="size-5 text-white" />
        </span>
        <h3 className="text-lg font-bold text-white">{t("title")}</h3>
      </div>

      <p className={cn("text-caption", featured ? "text-white/90" : "text-content-dark")}>{t("description")}</p>

      <StretchedLink
        href={href}
        className="mt-auto inline-flex items-center gap-2 font-heading text-caption font-semibold text-white"
      >
        {t("action")}
        <FiArrowRight
          className="size-[1.0625rem] shrink-0 transition-transform duration-200 ease-out-brand group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      </StretchedLink>

      <p className={cn("text-xs", featured ? "text-white/75" : "text-navy-300")}>{t("note")}</p>
    </article>
  );
}
