import { useTranslations } from "next-intl";
import { AddonDeveloperLabel } from "@/app/components/shared/addons/AddonDeveloperLabel";
import { AddonIcon } from "@/app/components/shared/addons/AddonIcon";
import { AddonRating } from "@/app/components/shared/addons/AddonRating";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { StretchedLink } from "@/app/components/shared/StretchedLink";
import { addonPath, type AddonSummary } from "@/lib/addons";
import { cn } from "@/lib/utils";
import { AddonPriceTag } from "./AddonPriceTag";

export interface AddonCardProps {
  addon: AddonSummary;
}

/** Store card (Figma "Add-on/…"): icon + price, name, developer, summary, then rating and category. The whole card opens the add-on. */
export function AddonCard({ addon }: AddonCardProps) {
  const t = useTranslations("addons.categories");

  return (
    <article
      className={cn(
        "relative flex h-full flex-col gap-3 rounded-2xl border border-edge bg-surface p-6 hover:border-primary/20",
        CARD_HOVER_CLASSES
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <AddonIcon icon={addon.icon} />
        <AddonPriceTag price={addon.price} />
      </div>

      <h3 className="text-lg font-semibold text-body">
        <StretchedLink href={addonPath(addon.slug)}>{addon.name}</StretchedLink>
      </h3>
      <AddonDeveloperLabel developer={addon.developer} />
      <p className="text-caption text-ink-700">{addon.summary}</p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-edge pt-3">
        <AddonRating rating={addon.rating} reviewCount={addon.reviewCount} />
        <span className="text-caption text-content">{t(addon.category)}</span>
      </div>
    </article>
  );
}
