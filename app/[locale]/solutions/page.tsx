import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DiagnosticSessionCta } from "@/app/components/shared/cta/DiagnosticSessionCta";
import { ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { parseSector, SECTOR_QUERY_KEY } from "@/lib/sectors";
import { SectorDaySection } from "./components/SectorDaySection";
import { SectorsSection } from "./components/SectorsSection";
import { SolutionsHero } from "./components/SolutionsHero";
import { SolutionsSectorProvider } from "./components/SolutionsSectorProvider";

interface SolutionsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: SolutionsPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "solutions.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.solutions,
    title: t("title"),
    description: t("description"),
  });
}

/**
 * Solutions by sector (Figma v4 "الحلول · Solutions"): the hero's sector tabs pick the workday shown under it,
 * then the ready sectors and the diagnostic session banner. `?sector=<key>` opens a sector (sector cards).
 */
export default async function SolutionsPage({ searchParams }: SolutionsPageProps) {
  const requested = (await searchParams)[SECTOR_QUERY_KEY];
  const sector = parseSector(typeof requested === "string" ? requested : undefined);

  return (
    <>
      <SolutionsSectorProvider sector={sector}>
        <SolutionsHero />
        <SectorDaySection />
      </SolutionsSectorProvider>
      <SectorsSection />
      <DiagnosticSessionCta />
    </>
  );
}
