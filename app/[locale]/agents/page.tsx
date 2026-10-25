import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { AgencyFormSection } from "./components/AgencyFormSection";
import { AgentsHero } from "./components/AgentsHero";
import { BenefitsSection } from "./components/BenefitsSection";
import { OurAgentSection } from "./components/OurAgentSection";
import { StepsSection } from "./components/StepsSection";

interface AgentsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AgentsPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "agents.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.agents,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

export default function AgentsPage() {
  return (
    <>
      <AgentsHero />
      <OurAgentSection />
      <BenefitsSection />
      <StepsSection />
      <AgencyFormSection />
    </>
  );
}
