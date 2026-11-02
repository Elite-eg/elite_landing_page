import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DiagnosticSessionCta } from "@/app/components/shared/cta/DiagnosticSessionCta";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { ProjectsShowcase } from "./components/ProjectsShowcase";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "projects.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.projects.all,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsShowcase />
      <DiagnosticSessionCta />
    </>
  );
}
