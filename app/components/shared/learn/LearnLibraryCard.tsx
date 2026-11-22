import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { StretchedLink } from "@/app/components/shared/StretchedLink";
import type { NavItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface LearnLibraryCardProps {
  item: NavItem;
}

/** One learning library resource: icon tile (turns navy on hover), name (links to it, covers the card) and one line. */
export function LearnLibraryCard({ item: { labelKey, descriptionKey, href, icon: Icon } }: LearnLibraryCardProps) {
  const t = useTranslations("nav");

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 rounded-2xl border border-edge bg-surface p-6 hover:border-primary/20",
        CARD_HOVER_CLASSES
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {Icon && (
          <span
            className="grid size-11 place-items-center rounded-xl bg-surface-muted text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
            aria-hidden="true"
          >
            <Icon className="size-5" />
          </span>
        )}
        <FiArrowRight
          className="size-[1.125rem] text-navy-300 transition duration-300 ease-out-brand group-hover:translate-x-0.5 group-hover:text-secondary-dark rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold leading-snug text-body">
          <StretchedLink href={href}>{t(labelKey)}</StretchedLink>
        </h3>
        {descriptionKey && <p className="text-caption text-content">{t(descriptionKey)}</p>}
      </div>
    </article>
  );
}
