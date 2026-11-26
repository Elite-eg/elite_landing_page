import { useLocale, useTranslations } from "next-intl";
import { intlLocale } from "@/lib/locale";
import { RatingStars } from "./RatingStars";

export interface RatingSummaryProps {
  rating: number;
  reviewCount: number;
}

/** Grey tile with the average, its stars and the number of ratings (Figma "Summary"). */
export function RatingSummary({ rating, reviewCount }: RatingSummaryProps) {
  const t = useTranslations("addons");
  const locale = useLocale();
  const average = new Intl.NumberFormat(intlLocale(locale), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(rating);
  const count = new Intl.NumberFormat(intlLocale(locale)).format(reviewCount);

  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-surface-alt px-6 py-5 text-center sm:min-w-36">
      <p className="sr-only">{t("rating.label", { rating: average, count: reviewCount, formatted: count })}</p>
      <p aria-hidden="true" className="text-h2 text-body">
        {average}
      </p>
      <RatingStars rating={rating} />
      <p aria-hidden="true" className="text-caption text-content">
        {t("details.reviews.count", { count: reviewCount, formatted: count })}
      </p>
    </div>
  );
}
