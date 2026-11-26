import { useLocale, useTranslations } from "next-intl";
import { AddonDetailList } from "@/app/components/shared/addons/AddonDetailList";
import { useAddonAmount } from "@/app/components/shared/addons/useAddonAmount";
import { usePaymentLabel } from "@/app/components/shared/addons/usePaymentLabel";
import type { AddonPurchase } from "@/lib/addons";
import { formatLongDate } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { PurchasePanel } from "./PurchasePanel";

export interface PurchaseOrderCardProps {
  purchase: AddonPurchase;
  className?: string;
}

/** "Order summary" (Figma "Order"): the order's details, the amounts paid with VAT, and how long updates are free. */
export function PurchaseOrderCard({ purchase, className }: PurchaseOrderCardProps) {
  const t = useTranslations("addons.purchaseComplete");
  const tOrder = useTranslations("addons.order");
  const locale = useLocale();
  const formatAmount = useAddonAmount();
  const paymentLabel = usePaymentLabel();
  const { addon, amounts } = purchase;
  const amount = (value: number) => formatAmount(value, amounts.country);

  return (
    <PurchasePanel id="purchase-order-title" title={t("orderTitle")} className={cn("gap-3.5", className)}>
      <AddonDetailList
        className="gap-3.5"
        items={[
          { label: tOrder("addon"), value: addon.name },
          { label: tOrder("developer"), value: addon.developer.name },
          { label: tOrder("orderNumber"), value: purchase.orderNumber },
          { label: tOrder("date"), value: formatLongDate(purchase.purchasedAt, locale) },
          { label: tOrder("payment"), value: paymentLabel(purchase.payment) },
        ]}
      />
      <hr className="border-edge" />
      <AddonDetailList
        className="gap-3.5"
        items={[
          { label: tOrder("price"), value: amount(amounts.price) },
          { label: tOrder("vat", { rate: String(Math.round(amounts.vatRate * 100)) }), value: amount(amounts.vat) },
          { label: tOrder("total"), value: amount(amounts.total), emphasis: true },
        ]}
      />
      <p className="rounded-xl bg-surface-alt px-3.5 py-3 text-caption text-ink-700">
        {t("updatesNote", { date: formatLongDate(purchase.updatesUntil, locale) })}
      </p>
    </PurchasePanel>
  );
}
