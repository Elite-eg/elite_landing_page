import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { BookingHero } from "./components/BookingHero";
import { NextStepsSection } from "./components/NextStepsSection";

interface BookSessionPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BookSessionPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "booking.meta" });

  return buildPageMetadata({ locale, path: ROUTES.bookSession, title: t("title"), description: t("description") });
}

export default function BookSessionPage() {
  return (
    <>
      <BookingHero />
      <NextStepsSection />
    </>
  );
}
