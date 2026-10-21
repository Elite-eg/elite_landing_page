import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JoinTeamCta } from "@/app/components/shared/cta/JoinTeamCta";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { AboutHero } from "./components/AboutHero";
import { AlbiruniSection } from "./components/AlbiruniSection";
import { StatementsSection } from "./components/StatementsSection";
import { ValuesSection } from "./components/ValuesSection";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "about.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.about,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StatementsSection />
      <AlbiruniSection />
      <ValuesSection />
      <JoinTeamCta />
    </>
  );
}
