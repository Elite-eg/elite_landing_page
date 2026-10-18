import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { CheckoutFlow } from "./components/CheckoutFlow";

interface DraftPageProps {
  params: Promise<{ locale: string }>;
}

/** DRAFT route for the subscription checkout. Intentionally not in ROUTES / navigation until approved. */
const DRAFT_PATH = "/draft";

export async function generateMetadata({ params }: DraftPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "checkout.meta" });

  return buildPageMetadata({
    locale,
    path: DRAFT_PATH,
    title: t("title"),
    description: t("description"),
    noIndex: true,
  });
}

export default function DraftPage() {
  return <CheckoutFlow />;
}
