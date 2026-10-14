import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckoutFlow } from "./components/CheckoutFlow";

interface DraftPageProps {
  params: Promise<{ locale: string }>;
}

/** DRAFT route for the subscription checkout. Intentionally not linked from ROUTES / navigation. */
export async function generateMetadata({ params }: DraftPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout.meta" });

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default function DraftPage() {
  return <CheckoutFlow />;
}
