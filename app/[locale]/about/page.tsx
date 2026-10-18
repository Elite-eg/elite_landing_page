import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JoinTeamCta } from "@/app/components/shared/cta/JoinTeamCta";
import { COMPANY_INFO, ROUTES, type AppLocale } from "@/lib/constants";
import { AboutHero } from "./components/AboutHero";
import { AlbiruniSection } from "./components/AlbiruniSection";
import { StatementsSection } from "./components/StatementsSection";
import { ValuesSection } from "./components/ValuesSection";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

const toAppLocale = (locale: string): AppLocale => (locale === "en" ? "en" : "ar");

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "about.meta" });
  const brand = COMPANY_INFO.brandName[locale];
  const title = t("title");
  const description = t("description", { brand });

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${ROUTES.about}`,
      languages: { ar: `/ar${ROUTES.about}`, en: `/en${ROUTES.about}` },
    },
    openGraph: {
      title,
      description,
      siteName: brand,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
      url: `/${locale}${ROUTES.about}`,
    },
  };
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
