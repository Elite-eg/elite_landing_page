import { useLocale, useTranslations } from "next-intl";
import { AddonRating } from "@/app/components/shared/addons/AddonRating";
import type { AlbiruniVersion } from "@/lib/addons";
import { intlLocale } from "@/lib/locale";

export interface AddonMetaLineProps {
  rating: number;
  reviewCount: number;
  installs: number;
  version: string;
  versions: AlbiruniVersion[];
}

/** Rating · installs · version · compatibility under the add-on's name (Figma "Meta"). */
export function AddonMetaLine({ rating, reviewCount, installs, version, versions }: AddonMetaLineProps) {
  const t = useTranslations("addons.details.meta");
  const locale = useLocale();

  const items = [
    <AddonRating key="rating" rating={rating} reviewCount={reviewCount} withCountLabel />,
    t("installs", { count: installs, formatted: new Intl.NumberFormat(intlLocale(locale)).format(installs) }),
    t("version", { version }),
    t("compatibility", { versions: new Intl.ListFormat(intlLocale(locale), { type: "conjunction" }).format(versions) }),
  ];

  return (
    // The dots only show from sm: on phones the line wraps, and a wrapped line would start with one.
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-ink-700 sm:gap-x-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2.5">
          {index > 0 && (
            <span aria-hidden="true" className="hidden text-ink-400 sm:inline">
              ·
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}
