import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/app/components/shared/Container";
import { getAddon } from "@/app/services/addons/addonsService";
import { addonPath } from "@/lib/addons";
import { intlLocale, toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { AddonAbout } from "./components/AddonAbout";
import { AddonChangelog } from "./components/AddonChangelog";
import { AddonDetailsHero } from "./components/AddonDetailsHero";
import { AddonDetailsSection } from "./components/AddonDetailsSection";
import { AddonInstallSteps } from "./components/AddonInstallSteps";
import { AddonMediaGallery } from "./components/AddonMediaGallery";
import { AddonPurchaseCard } from "./components/AddonPurchaseCard";
import { AddonReviews } from "./components/AddonReviews";
import { AddonSectionTabs } from "./components/AddonSectionTabs";
import { ADDON_SECTIONS } from "./data/addonPageData";

interface AddonPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: AddonPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toAppLocale(rawLocale);
  const addon = await getAddon(slug, locale);
  if (!addon) return {};

  return buildPageMetadata({ locale, path: addonPath(addon.slug), title: addon.name, description: addon.summary });
}

/**
 * Figma v4 "صفحة الإضافة · Add-on details" (node 234:3620 in the copy). The purchase card comes first in the page
 * order (start side from lg, above the content on small screens), as in the Figma.
 */
export default async function AddonPage({ params }: AddonPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = toAppLocale(rawLocale);
  const addon = await getAddon(slug, locale);
  if (!addon) notFound();

  const t = await getTranslations({ locale, namespace: "addons.details.tabs" });
  const reviewCount = new Intl.NumberFormat(intlLocale(locale)).format(addon.reviewCount);
  const tabs = ADDON_SECTIONS.map((id) => ({ id, label: t(id, { count: reviewCount }) }));
  const { name, category, icon, developer, rating, installs, version, versions } = addon;

  return (
    <>
      <AddonDetailsHero
        addon={{ name, category, icon, developer, rating, reviewCount: addon.reviewCount, installs, version, versions }}
      />

      <div className="pb-16 pt-8 sm:pb-20">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <AddonPurchaseCard addon={addon} />

          <div className="flex min-w-0 flex-1 flex-col gap-10">
            <AddonSectionTabs items={tabs} />
            <AddonDetailsSection id="media" title={t("media")} hideTitle>
              <AddonMediaGallery media={addon.media} />
            </AddonDetailsSection>
            <AddonAbout description={addon.description} features={addon.features} />
            <AddonInstallSteps steps={addon.installSteps} />
            <AddonReviews
              rating={rating}
              reviewCount={addon.reviewCount}
              ratingBreakdown={addon.ratingBreakdown}
              reviews={addon.reviews}
            />
            <AddonChangelog releases={addon.changelog} />
          </div>
        </Container>
      </div>
    </>
  );
}
