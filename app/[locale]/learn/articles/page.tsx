import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LearnLibrarySection } from "@/app/components/shared/learn/LearnLibrarySection";
import { NewsletterSection } from "@/app/components/shared/NewsletterSection";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { ArticleShowcase } from "./components/ArticleShowcase";

interface ArticlesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "learn.articles.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.learn.articles,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

export default function ArticlesPage() {
  return (
    <>
      <ArticleShowcase />
      <LearnLibrarySection current={ROUTES.learn.articles} />
      <NewsletterSection />
    </>
  );
}
