import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { GUIDES, type GuideKey } from "./guidesData";

/** Localized metadata shared by every guide landing page. */
export async function buildGuideMetadata(guide: GuideKey, rawLocale: string): Promise<Metadata> {
  const locale = toAppLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: `guides.${guide}.meta` });

  return buildPageMetadata({ locale, path: GUIDES[guide].route, title: t("title"), description: t("description") });
}
