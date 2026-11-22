import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DiagnosticSessionCta } from "@/app/components/shared/cta/DiagnosticSessionCta";
import { LearnLibrarySection } from "@/app/components/shared/learn/LearnLibrarySection";
import { ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { VideoShowcase } from "./components/VideoShowcase";

interface VideosPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: VideosPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "learn.videos.meta" });

  return buildPageMetadata({ locale, path: ROUTES.learn.videos, title: t("title"), description: t("description") });
}

export default function VideosPage() {
  return (
    <>
      <VideoShowcase />
      <LearnLibrarySection current={ROUTES.learn.videos} />
      <DiagnosticSessionCta />
    </>
  );
}
