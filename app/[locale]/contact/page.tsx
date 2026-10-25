import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { ContactSection } from "./components/ContactSection";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "contact.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.contact,
    title: t("title"),
    description: t("description", { brand: COMPANY_INFO.brandName[locale] }),
  });
}

export default function ContactPage() {
  return <ContactSection />;
}
