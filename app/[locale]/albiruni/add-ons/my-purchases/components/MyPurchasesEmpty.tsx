import { useTranslations } from "next-intl";
import { FiShoppingBag } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { ROUTES } from "@/lib/constants";

/** Shown when the customer hasn't bought anything yet: what will appear here, and the way to the store. */
export function MyPurchasesEmpty() {
  const t = useTranslations("addons.myPurchases.empty");

  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-edge bg-surface px-6 py-14 text-center">
      <span aria-hidden="true" className="grid size-14 place-items-center rounded-2xl bg-surface-alt text-primary">
        <FiShoppingBag className="size-6" />
      </span>
      <h2 className="text-h3 text-body">{t("title")}</h2>
      <p className="max-w-prose text-caption text-content">{t("text")}</p>
      <Button href={ROUTES.albiruni.addons} variant="secondary" className="mt-2">
        {t("browse")}
      </Button>
    </div>
  );
}
