import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO, ROUTES, type AppLocale } from "@/lib/constants";
import { BareeqCta } from "./components/BareeqCta";
import { BareeqHero } from "./components/BareeqHero";
import { ChallengeSection } from "./components/ChallengeSection";
import { ResultSection } from "./components/ResultSection";
import { SolutionSection } from "./components/SolutionSection";

interface BareeqXPageProps {
  params: Promise<{ locale: string }>;
}

const toAppLocale = (locale: string): AppLocale => (locale === "en" ? "en" : "ar");

export async function generateMetadata({ params }: BareeqXPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "caseStudies.bareeqX.meta" });
  const brand = COMPANY_INFO.brandName[locale];
  const title = t("title");
  const description = t("description", { brand });
  const path = ROUTES.projects.bareeq;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ar: `/ar${path}`, en: `/en${path}` },
    },
    openGraph: {
      title,
      description,
      siteName: brand,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "article",
      url: `/${locale}${path}`,
    },
  };
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
