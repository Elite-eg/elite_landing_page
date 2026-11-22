import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DiagnosticSessionCta } from "@/app/components/shared/cta/DiagnosticSessionCta";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { AppsSection } from "./components/AppsSection";
import { HomeHero } from "./components/HomeHero";
import { NextStepsSection } from "./components/NextStepsSection";
import { PainsSection } from "./components/PainsSection";
import { PricingTeaserSection } from "./components/PricingTeaserSection";
import { ProcessSection } from "./components/ProcessSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SectorsSection } from "./components/SectorsSection";
import { ServicesSection } from "./components/ServicesSection";
import { StatsStrip } from "./components/StatsStrip";
import { TeamSection } from "./components/TeamSection";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "home.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.home,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

/** Home (Figma v4 "Home · الرئيسية"). The Figma's hidden Maher and testimonials sections are not built. */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsStrip />
      <TeamSection />
      <ProjectsSection />
      <PainsSection />
      <ServicesSection />
      <AppsSection />
      <NextStepsSection />
      <SectorsSection />
      <ProcessSection />
      <PricingTeaserSection />
      <DiagnosticSessionCta />
    </>
  );
}
