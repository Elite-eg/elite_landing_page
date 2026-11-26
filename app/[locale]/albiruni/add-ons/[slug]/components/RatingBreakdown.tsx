import { useLocale, useTranslations } from "next-intl";
import type { AddonRatingBreakdown } from "@/lib/addons";
import { intlLocale } from "@/lib/locale";

export interface RatingBreakdownProps {
  breakdown: AddonRatingBreakdown;
}

/** One bar per star rating, 5 → 1, filled from the start side by its share of the ratings (Figma "Bars"). */
export function RatingBreakdown({ breakdown }: RatingBreakdownProps) {
  const t = useTranslations("addons.details.reviews");
  const locale = useLocale();
  const total = breakdown.reduce((sum, count) => sum + count, 0);

  return (
    <ul className="flex flex-1 flex-col gap-2">
      {breakdown.map((count, index) => {
        const stars = 5 - index;
        const share = total > 0 ? (count / total) * 100 : 0;

        return (
          <li key={stars} className="flex items-center gap-2.5">
            <span className="sr-only">
              {t("bar", { stars, count, formatted: new Intl.NumberFormat(intlLocale(locale)).format(count) })}
            </span>
            <span aria-hidden="true" className="w-2 shrink-0 text-center text-xs font-medium text-ink-700">
              {stars}
            </span>
            <span aria-hidden="true" className="block h-2 flex-1 overflow-hidden rounded-full bg-edge">
              <span className="block h-full rounded-full bg-secondary" style={{ width: `${share}%` }} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
