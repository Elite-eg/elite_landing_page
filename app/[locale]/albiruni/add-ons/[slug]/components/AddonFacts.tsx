import { useLocale, useTranslations } from "next-intl";
import type { AddonDetails } from "@/lib/addons";
import { intlLocale } from "@/lib/locale";
import { formatReleaseDate } from "../utils/formatReleaseDate";

export type AddonFactsProps = Pick<AddonDetails, "developer" | "updatedAt" | "version" | "versions" | "license" | "languages">;

/** Label / value rows in the purchase card (Figma "Row/…"): developer, last update, version, compatibility, license, languages. */
export function AddonFacts({ developer, updatedAt, version, versions, license, languages }: AddonFactsProps) {
  const t = useTranslations("addons.details");
  const locale = useLocale();
  const listFormat = new Intl.ListFormat(intlLocale(locale), { type: "conjunction" });

  const rows = [
    { key: "developer", value: developer.name },
    { key: "updatedAt", value: formatReleaseDate(updatedAt, locale) },
    { key: "version", value: version },
    { key: "compatibility", value: t("facts.compatibilityValue", { versions: versions.join(" · ") }) },
    { key: "license", value: t(`licenses.${license}`) },
    { key: "languages", value: listFormat.format(languages.map((language) => t(`languages.${language}`))) },
  ];

  return (
    <dl className="flex flex-col gap-3 text-caption">
      {rows.map(({ key, value }) => (
        <div key={key} className="flex items-baseline justify-between gap-3">
          <dt className="text-content">{t(`facts.${key}`)}</dt>
          <dd className="text-end font-medium text-body">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
