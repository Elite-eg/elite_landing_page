import { useLocale, useTranslations } from "next-intl";
import { AddonDetailList } from "@/app/components/shared/addons/AddonDetailList";
import type { AddonDetails } from "@/lib/addons";
import { formatLongDate } from "@/lib/dates";
import { intlLocale } from "@/lib/locale";

export type AddonFactsProps = Pick<AddonDetails, "developer" | "updatedAt" | "version" | "versions" | "license" | "languages">;

/** Label / value rows in the purchase card (Figma "Row/…"): developer, last update, version, compatibility, license, languages. */
export function AddonFacts({ developer, updatedAt, version, versions, license, languages }: AddonFactsProps) {
  const t = useTranslations("addons.details");
  const locale = useLocale();
  const listFormat = new Intl.ListFormat(intlLocale(locale), { type: "conjunction" });

  return (
    <AddonDetailList
      items={[
        { label: t("facts.developer"), value: developer.name },
        { label: t("facts.updatedAt"), value: formatLongDate(updatedAt, locale) },
        { label: t("facts.version"), value: version },
        { label: t("facts.compatibility"), value: t("facts.compatibilityValue", { versions: versions.join(" · ") }) },
        { label: t("facts.license"), value: t(`licenses.${license}`) },
        {
          label: t("facts.languages"),
          value: listFormat.format(languages.map((language) => t(`languages.${language}`))),
        },
      ]}
    />
  );
}
