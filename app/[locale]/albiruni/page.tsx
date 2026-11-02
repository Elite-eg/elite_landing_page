import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DiagnosticSessionCta } from "@/app/components/shared/cta/DiagnosticSessionCta";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { ExperiencesSection } from "./components/ExperiencesSection";
import { PlatformHero } from "./components/PlatformHero";

interface AlbiruniPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AlbiruniPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "albiruni.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.albiruni.platform,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

export default function AlbiruniPage() {
  return (
    <>
      <PlatformHero />
      <ExperiencesSection />
      <CapabilitiesSection />
      <DiagnosticSessionCta />
    </>
  );
}
