import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BookingHero } from "@/app/[locale]/book-session/components/BookingHero";
import { WhatHappensNextSection } from "@/app/[locale]/book-session/components/WhatHappensNextSection";
import { COMPANY_INFO, type AppLocale } from "@/lib/constants";

interface BookSessionPageProps {
  params: Promise<{ locale: string }>;
}

const toAppLocale = (locale: string): AppLocale =>
  locale === "en" ? "en" : "ar";

export async function generateMetadata({
  params,
}: BookSessionPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "booking.meta" });
  const brand = COMPANY_INFO.brandName[locale];

  return {
    title: t("title", { brand }),
    description: t("description"),
  };
}

export default async function BookSessionPage() {
  return (
    <>
      <BookingHero />
      <WhatHappensNextSection />
    </>
  );
}
