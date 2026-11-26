import { useLocale, useTranslations } from "next-intl";
import type { AddonDeveloper } from "@/lib/addons";
import { intlLocale } from "@/lib/locale";
import { AddonsFilters } from "./AddonsFilters";

export interface AddonsToolbarProps {
  total: number;
  developers: AddonDeveloper[];
}

/** Result count on the start side, filter and sort menus on the end side (Figma "Toolbar"); stacked below lg. */
export function AddonsToolbar({ total, developers }: AddonsToolbarProps) {
  const t = useTranslations("addons.results");
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Announced when a search or filter changes the results. */}
      <h2 aria-live="polite" className="shrink-0 text-lg font-semibold text-body">
        {t("count", { count: total, formatted: new Intl.NumberFormat(intlLocale(locale)).format(total) })}
      </h2>
      <AddonsFilters developers={developers} />
    </div>
  );
}
