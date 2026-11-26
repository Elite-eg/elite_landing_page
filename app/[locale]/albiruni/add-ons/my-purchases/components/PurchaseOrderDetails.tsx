import { useLocale, useTranslations } from "next-intl";
import { AddonDetailList } from "@/app/components/shared/addons/AddonDetailList";
import { useAddonAmount } from "@/app/components/shared/addons/useAddonAmount";
import { usePaymentLabel } from "@/app/components/shared/addons/usePaymentLabel";
import type { AddonPurchase } from "@/lib/addons";
import { formatLongDate } from "@/lib/dates";

export interface PurchaseOrderDetailsProps {
  purchase: AddonPurchase;
}

/** The order behind a bought add-on: number, date, version in the file, amount paid (with VAT) and payment method. */
export function PurchaseOrderDetails({ purchase }: PurchaseOrderDetailsProps) {
  const t = useTranslations("addons.order");
  const locale = useLocale();
  const formatAmount = useAddonAmount();
  const paymentLabel = usePaymentLabel();

  return (
    <AddonDetailList
      className="gap-3.5"
      items={[
        { label: t("orderNumber"), value: purchase.orderNumber },
        { label: t("purchasedAt"), value: formatLongDate(purchase.purchasedAt, locale) },
        { label: t("version"), value: purchase.file.version },
        { label: t("amountPaid"), value: formatAmount(purchase.amounts.total, purchase.amounts.country) },
        { label: t("payment"), value: paymentLabel(purchase.payment) },
      ]}
    />
  );
}
