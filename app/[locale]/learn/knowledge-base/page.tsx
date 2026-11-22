import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LearnLibrarySection } from "@/app/components/shared/learn/LearnLibrarySection";
import { ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { KnowledgeBaseExplorer } from "./components/KnowledgeBaseExplorer";
import { SupportSection } from "./components/SupportSection";

interface KnowledgeBasePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: KnowledgeBasePageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "learn.knowledgeBase.meta" });

  return buildPageMetadata({ locale, path: ROUTES.learn.knowledgeBase, title: t("title"), description: t("description") });
}

export default function KnowledgeBasePage() {
  return (
    <>
      <KnowledgeBaseExplorer />
      <LearnLibrarySection current={ROUTES.learn.knowledgeBase} />
      <SupportSection />
    </>
  );
}
