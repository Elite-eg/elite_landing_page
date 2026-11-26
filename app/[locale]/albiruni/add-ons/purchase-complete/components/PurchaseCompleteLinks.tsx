import { useTranslations } from "next-intl";
import { Button } from "@/app/components/shared/Button";
import { ROUTES } from "@/lib/constants";

/** Where to go next (Figma "Links"): My purchases and back to the store, as orange text links. */
export function PurchaseCompleteLinks() {
  const t = useTranslations("addons.purchaseComplete.links");

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      <Button href={ROUTES.albiruni.myPurchases} variant="text">
        {t("myPurchases")}
      </Button>
      <Button href={ROUTES.albiruni.addons} variant="text">
        {t("store")}
      </Button>
    </div>
  );
}
