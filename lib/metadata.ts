import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { COMPANY_INFO, MEDIA, type AppLocale } from "./constants";

/** Absolute site origin, used to resolve canonical and Open Graph URLs (metadataBase). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elitemsr.com";

/** Social preview image shared by every page (the file is 1024×1024). */
export const DEFAULT_OG_IMAGE = { url: MEDIA.heroPoster, width: 1024, height: 1024 } as const;

export const OG_LOCALES: Record<AppLocale, string> = { ar: "ar_EG", en: "en_US" };

/** Search keywords in both languages (same list for every locale). */
export const SITE_KEYWORDS = [
  COMPANY_INFO.brandName.en,
  COMPANY_INFO.brandName.ar,
  "حلول برمجية",
  "Software Solutions",
  "تطبيقات الويب",
  "تطبيقات الجوال",
  "ERP systems",
  "AI Automation",
  "الذكاء الاصطناعي",
];

export interface PageMetadataOptions {
  locale: AppLocale;
  /** Route without the locale prefix, e.g. ROUTES.about. */
  path: string;
  /** Page title WITHOUT the brand: the root layout's title template appends "| {brand}". */
  title: string;
  description: string;
  /** Open Graph type. Case studies use "article". */
  type?: "website" | "article";
  /** Draft pages: keep them out of search results. */
  noIndex?: boolean;
}

/**
 * Localized page metadata: title, description, canonical + hreflang alternates, Open Graph and Twitter.
 * Every page builds its metadata here. Next.js replaces (does not merge) a parent's openGraph/twitter
 * objects, so pages that set them by hand silently lose the shared image and URL.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `/${locale}${path}`;
  const brand = COMPANY_INFO.brandName[locale];

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((code) => [code, `/${code}${path}`])),
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: brand,
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales.filter((code) => code !== locale).map((code) => OG_LOCALES[code]),
      images: [{ ...DEFAULT_OG_IMAGE, alt: brand }],
    },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE.url] },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
