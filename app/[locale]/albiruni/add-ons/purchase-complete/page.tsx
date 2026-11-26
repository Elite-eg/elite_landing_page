import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/app/components/shared/Container";
import { getAddonPurchase } from "@/app/services/addons/addonsService";
import { ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { PurchaseCompleteHeader } from "./components/PurchaseCompleteHeader";
import { PurchaseCompleteLinks } from "./components/PurchaseCompleteLinks";
import { PurchaseDownloadCard } from "./components/PurchaseDownloadCard";
import { PurchaseOrderCard } from "./components/PurchaseOrderCard";

interface PurchaseCompletePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: PurchaseCompletePageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "addons.purchaseComplete.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.albiruni.addonPurchaseComplete,
    title: t("title"),
    description: t("description"),
    noIndex: true,
  });
}

/**
 * Figma v4 "تم الشراء · Purchase complete" (node 238:4040, English 247:3245 in the copy). The checkout returns here
 * with `?order=<order number>`; an unknown or missing order is a 404. The download card comes first in the page
 * order (start side from lg, on top on small screens), as in the Figma.
 */
export default async function PurchaseCompletePage({ params, searchParams }: PurchaseCompletePageProps) {
  const locale = toAppLocale((await params).locale);
  const { order } = await searchParams;
  const orderNumber = Array.isArray(order) ? order[0] : order;
  const purchase = orderNumber ? await getAddonPurchase(orderNumber, locale) : null;
  if (!purchase) notFound();

  return (
    <div className="bg-surface-alt pb-16 pt-12 sm:pb-24 sm:pt-16">
      <Container className="flex max-w-[69rem] flex-col items-center gap-6">
        <PurchaseCompleteHeader />
        <div className="grid w-full gap-6 lg:grid-cols-2 lg:items-start">
          <PurchaseDownloadCard purchase={purchase} />
          <PurchaseOrderCard purchase={purchase} className="lg:self-stretch" />
        </div>
        <PurchaseCompleteLinks />
      </Container>
    </div>
  );
}
