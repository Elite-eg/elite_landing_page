import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { HowWeWorkSection } from "./components/HowWeWorkSection";
import { JobsHero } from "./components/JobsHero";
import { OpenPositionsSection } from "./components/OpenPositionsSection";

interface JobsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: JobsPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "jobs.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.jobs,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

export default function JobsPage() {
  return (
    <>
      <JobsHero />
      <HowWeWorkSection />
      <OpenPositionsSection />
    </>
  );
}
