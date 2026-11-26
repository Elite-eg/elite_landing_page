import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAddons } from "@/app/services/addons/addonsService";
import { addonsStoreHref, parseAddonsQuery } from "@/lib/addons";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { AddonsBrowser } from "./components/AddonsBrowser";
import { AddonsHero } from "./components/AddonsHero";
import { AddonsQueryProvider } from "./components/AddonsQueryProvider";

interface AddonsStorePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: AddonsStorePageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "addons.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.albiruni.addons,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

/** Figma v4 "متجر الإضافات · Add-ons" (node 233:3482 in the copy). The URL holds the search, filters, sort and page. */
export default async function AddonsStorePage({ params, searchParams }: AddonsStorePageProps) {
  const locale = toAppLocale((await params).locale);
  const requested = parseAddonsQuery(await searchParams);
  const result = await getAddons(requested, locale);
  // The service clamps a page past the end, so the controls follow the page actually shown.
  const query = { ...requested, page: result.page };

  return (
    <AddonsQueryProvider query={query}>
      <AddonsHero />
      <AddonsBrowser result={result} filterKey={addonsStoreHref(query)} />
    </AddonsQueryProvider>
  );
}
