import { useTranslations } from "next-intl";
import type { AddonReview } from "@/lib/addons";
import { RatingStars } from "./RatingStars";

export interface ReviewCardProps {
  review: AddonReview;
}

/** One buyer's review (Figma "Review"): who wrote it and their stars, then what they wrote. */
export function ReviewCard({ review }: ReviewCardProps) {
  const t = useTranslations("addons.details.reviews");

  return (
    <article className="flex flex-col gap-2 rounded-2xl border border-edge p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-caption font-medium text-body">{t("author", { author: review.author, company: review.company })}</p>
        <span>
          <span className="sr-only">{t("stars", { rating: review.rating })}</span>
          <RatingStars rating={review.rating} size="sm" />
        </span>
      </div>
      <p className="text-caption text-content">{review.text}</p>
    </article>
  );
}
