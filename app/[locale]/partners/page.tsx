import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { BenefitsSection } from "./components/BenefitsSection";
import { CommissionSection } from "./components/CommissionSection";
import { PartnerFormSection } from "./components/PartnerFormSection";
import { PartnersHero } from "./components/PartnersHero";
import { StepsSection } from "./components/StepsSection";

interface PartnersPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PartnersPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "partners.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.partners,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

/** Partner program for accounting and audit offices (Figma v4 "برنامج الشركاء · Partners", node 161:2418 in the copy). */
export default function PartnersPage() {
  return (
    <>
      <PartnersHero />
      <BenefitsSection />
      <StepsSection />
      <CommissionSection />
      <PartnerFormSection />
    </>
  );
}
