import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/app/components/shared/Container";
import { getAddonPurchases } from "@/app/services/addons/addonsService";
import { ROUTES } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { MyPurchasesEmpty } from "./components/MyPurchasesEmpty";
import { MyPurchasesHeader } from "./components/MyPurchasesHeader";
import { PurchaseList } from "./components/PurchaseList";

/** A customer's own purchases (and whether their free updates still run today): rendered per request, never cached. */
export const dynamic = "force-dynamic";

interface MyPurchasesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: MyPurchasesPageProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "addons.myPurchases.meta" });

  return buildPageMetadata({
    locale,
    path: ROUTES.albiruni.myPurchases,
    title: t("title"),
    description: t("description"),
    noIndex: true,
  });
}

/**
 * The customer's bought add-ons. No Figma frame yet: built from the purchase complete page's parts (file, license
 * key, order rows) on the same grey page, one card per add-on.
 */
export default async function MyPurchasesPage({ params }: MyPurchasesPageProps) {
  const locale = toAppLocale((await params).locale);
  const purchases = await getAddonPurchases(locale);

  return (
    <div className="bg-surface-alt pb-16 pt-12 sm:pb-24 sm:pt-16">
      <Container className="flex max-w-[69rem] flex-col gap-8">
        <MyPurchasesHeader />
        {purchases.length > 0 ? <PurchaseList purchases={purchases} /> : <MyPurchasesEmpty />}
      </Container>
    </div>
  );
}
