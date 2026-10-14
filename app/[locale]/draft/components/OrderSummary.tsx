import { useLocale, useTranslations } from "next-intl";
import { FiPackage } from "react-icons/fi";
import type { AppLocale, RegionCode } from "@/lib/constants";
import { SAMPLE_ORDER, getOrderTotals } from "../data/checkoutData";
import { formatMoney } from "../utils/formatMoney";
import { DetailList } from "./DetailList";

interface OrderSummaryProps {
  country: RegionCode;
}

export function OrderSummary({ country }: OrderSummaryProps) {
  const t = useTranslations("checkout.summary");
  const locale = useLocale() as AppLocale;
  const { currency, subtotal, vat, vatRate, total } = getOrderTotals(country);
  const money = (amount: number) => formatMoney(amount, currency, locale);

  return (
    <aside className="rounded-2xl border border-edge bg-surface p-6 shadow-card lg:sticky lg:top-36">
      <h2 className="text-base font-bold text-primary">{t("title")}</h2>

      <div className="mt-5 flex items-center gap-3 rounded-xl bg-surface-alt p-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-white">
          <FiPackage className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-bold text-primary">{t("product")}</p>
          <p className="text-caption text-content">{t("planName")}</p>
        </div>
      </div>

      <DetailList
        className="mt-4"
        items={[
          { label: t("users"), value: t("usersValue", { count: SAMPLE_ORDER.users }) },
          { label: t("billing"), value: t("billingValue") },
          { label: t("subtotal"), value: money(subtotal) },
          { label: t("vat", { rate: Math.round(vatRate * 100) }), value: money(vat) },
          { label: t("total"), value: money(total), emphasis: true },
        ]}
      />
    </aside>
  );
}
