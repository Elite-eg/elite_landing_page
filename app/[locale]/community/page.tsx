import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { ArticlesSection } from "./components/ArticlesSection";
import { ChannelsSection } from "./components/ChannelsSection";
import { CommunityHero } from "./components/CommunityHero";
import { EventsSection } from "./components/EventsSection";
import { NewsletterSection } from "./components/NewsletterSection";

interface CommunityPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CommunityPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "community.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.community,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

export default function CommunityPage() {
  return (
    <>
      <CommunityHero />
      <ChannelsSection />
      <EventsSection />
      <ArticlesSection />
      <NewsletterSection />
    </>
  );
}
