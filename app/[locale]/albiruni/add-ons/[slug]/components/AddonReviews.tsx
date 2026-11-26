import { useTranslations } from "next-intl";
import type { AddonDetails } from "@/lib/addons";
import { AddonDetailsSection } from "./AddonDetailsSection";
import { RatingBreakdown } from "./RatingBreakdown";
import { RatingSummary } from "./RatingSummary";
import { ReviewCard } from "./ReviewCard";

export type AddonReviewsProps = Pick<AddonDetails, "rating" | "reviewCount" | "ratingBreakdown" | "reviews">;

/** "Ratings" (Figma "Section/التقييمات"): the average beside the per-star bars, then the buyers' reviews. */
export function AddonReviews({ rating, reviewCount, ratingBreakdown, reviews }: AddonReviewsProps) {
  const t = useTranslations("addons.details.reviews");

  return (
    <AddonDetailsSection id="reviews" title={t("title")}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <RatingSummary rating={rating} reviewCount={reviewCount} />
        <RatingBreakdown breakdown={ratingBreakdown} />
      </div>

      {reviews.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-caption text-content">{t("empty")}</p>
      )}
    </AddonDetailsSection>
  );
}
