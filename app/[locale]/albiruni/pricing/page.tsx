import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DiagnosticSessionCta } from "@/app/components/shared/cta/DiagnosticSessionCta";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { AppsSection } from "./components/AppsSection";
import { ComparePlansSection } from "./components/ComparePlansSection";
import { PlanPickerSection } from "./components/PlanPickerSection";
import { PricingConfigProvider } from "./components/PricingConfigProvider";
import { PricingFaqSection } from "./components/PricingFaqSection";
import { PricingHero } from "./components/PricingHero";

interface AlbiruniPricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AlbiruniPricingPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "albiruniPricing.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.albiruni.pricing,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

export default function AlbiruniPricingPage() {
  return (
    <>
      <PricingConfigProvider>
        <PricingHero />
        <PlanPickerSection />
        <AppsSection />
        <ComparePlansSection />
      </PricingConfigProvider>
      <PricingFaqSection />
      <DiagnosticSessionCta />
    </>
  );
}
