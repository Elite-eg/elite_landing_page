import { useLocale, useTranslations } from "next-intl";
import type { AddonRelease } from "@/lib/addons";
import { formatReleaseDate } from "../utils/formatReleaseDate";
import { AddonDetailsSection } from "./AddonDetailsSection";

export interface AddonChangelogProps {
  releases: AddonRelease[];
}

/**
 * "Version history": one row per release, newest first. The Figma has the tab but no section; this follows the
 * page's review cards (bordered rows) and the policy pages' orange dots.
 */
export function AddonChangelog({ releases }: AddonChangelogProps) {
  const t = useTranslations("addons.details.changelog");
  const locale = useLocale();

  return (
    <AddonDetailsSection id="changelog" title={t("title")}>
      <ol className="flex flex-col gap-3">
        {releases.map((release) => (
          <li key={release.version} className="rounded-2xl border border-edge p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold text-body">{t("version", { version: release.version })}</h3>
              <time dateTime={release.date} className="text-caption text-content">
                {formatReleaseDate(release.date, locale)}
              </time>
            </div>
            <ul className="mt-2 flex flex-col gap-1.5 text-caption text-ink-700">
              {release.notes.map((note) => (
                <li key={note} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                  {note}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </AddonDetailsSection>
  );
}
