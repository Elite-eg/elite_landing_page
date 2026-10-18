import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { BareeqCta } from "./components/BareeqCta";
import { BareeqHero } from "./components/BareeqHero";
import { ChallengeSection } from "./components/ChallengeSection";
import { ResultSection } from "./components/ResultSection";
import { SolutionSection } from "./components/SolutionSection";

interface BareeqXPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BareeqXPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "caseStudies.bareeqX.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.projects.bareeq,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
    type: "article",
  });
}

export default function BareeqXPage() {
  return (
    <>
      <BareeqHero />
      <ChallengeSection />
      <SolutionSection />
      <ResultSection />
      <BareeqCta />
    </>
  );
}
