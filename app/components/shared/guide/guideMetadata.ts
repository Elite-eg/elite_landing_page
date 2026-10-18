import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO, type AppLocale } from "@/lib/constants";
import { GUIDES, type GuideKey } from "./guidesData";

/** Localized metadata shared by every guide landing page. */
export async function buildGuideMetadata(guide: GuideKey, rawLocale: string): Promise<Metadata> {
  const locale: AppLocale = rawLocale === "en" ? "en" : "ar";
  const t = await getTranslations({ locale, namespace: `guides.${guide}.meta` });
  const { route } = GUIDES[guide];
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${route}`,
      languages: { ar: `/ar${route}`, en: `/en${route}` },
    },
    openGraph: {
      title,
      description,
      siteName: COMPANY_INFO.brandName[locale],
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
      url: `/${locale}${route}`,
    },
  };
}
