import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { CommunityIdeasSection } from "./components/CommunityIdeasSection";
import { CommunitySection } from "./components/CommunitySection";
import { CtaSection } from "./components/CtaSection";
import { EcosystemSection } from "./components/EcosystemSection";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { TechStackSection } from "./components/TechStackSection";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "home.meta" });

  return buildPageMetadata({ locale, path: ROUTES.home, title: t("title"), description: t("description") });
}

export default async function HomePage({ params }: HomePageProps) {
  const locale = toAppLocale((await params).locale);

  return (
    <>
      <HeroSection />
      <TechStackSection />
      <EcosystemSection locale={locale} />
      <ServicesSection />
      <CommunitySection />
      <CommunityIdeasSection />
      <CtaSection />
    </>
  );
}