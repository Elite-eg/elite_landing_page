import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { COMPANY_INFO } from "@/lib/constants";
import { JobsHero } from "./components/JobsHero";
import { HowWeWorkSection } from "./components/HowWeWorkSection";
import { OpenPositionsSection } from "./components/OpenPositionsSection";

interface JobsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: JobsPageProps): Promise<Metadata> {
  const { locale = routing.defaultLocale } = await params;
  const isAr = locale === "ar";
  const brand = COMPANY_INFO.brandName[isAr ? "ar" : "en"];
  const t = await getTranslations({ locale, namespace: "jobs.meta" });

  const title = t("title", { brand });
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${locale}/jobs`,
    },
    alternates: {
      canonical: `/${locale}/jobs`,
      languages: {
        ar: "/ar/jobs",
        en: "/en/jobs",
      },
    },
  };
}

export default async function JobsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <JobsHero />
      <HowWeWorkSection />
      <OpenPositionsSection />
    </div>
  );
}
