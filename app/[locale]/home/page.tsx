import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO, type AppLocale } from "@/lib/constants";
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

const toAppLocale = (locale: string): AppLocale => (locale === "en" ? "en" : "ar");

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "home.meta" });
  const brand = COMPANY_INFO.brandName[locale];
  const title = t("title", { brand });
  const description = t("description");

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/home`,
      languages: { ar: "/ar/home", en: "/en/home" },
    },
    openGraph: {
      title,
      description,
      siteName: brand,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
      images: [{ url: "/images/hero-office.png", width: 1024, height: 1024 }],
    },
  };
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