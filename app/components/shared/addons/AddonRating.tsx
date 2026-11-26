import { useLocale, useTranslations } from "next-intl";
import { FiStar } from "react-icons/fi";
import { intlLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export interface AddonRatingProps {
  rating: number;
  reviewCount: number;
  /** "(96 ratings)" instead of "(96)" (add-on page meta line). */
  withCountLabel?: boolean;
  className?: string;
}

/** Orange star + average + review count ("★ 4.8 (96)"). Screen readers hear the whole sentence instead. */
export function AddonRating({ rating, reviewCount, withCountLabel = false, className }: AddonRatingProps) {
  const t = useTranslations("addons.rating");
  const locale = useLocale();
  const average = new Intl.NumberFormat(intlLocale(locale), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(rating);
  const count = new Intl.NumberFormat(intlLocale(locale)).format(reviewCount);

  return (
    <span className={cn("inline-flex items-center gap-1 text-caption", className)}>
      <span className="sr-only">{t("label", { rating: average, count: reviewCount, formatted: count })}</span>
      <FiStar className="size-3.5 shrink-0 fill-current text-secondary" aria-hidden="true" />
      <span className="font-semibold text-body" aria-hidden="true">
        {average}
      </span>
      <span className="text-content" aria-hidden="true">
        {withCountLabel ? t("countLabel", { count: reviewCount, formatted: count }) : t("count", { formatted: count })}
      </span>
    </span>
  );
}
