import { useLocale, useTranslations } from "next-intl";
import { FiClock, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/app/components/shared/Button";
import { COMPANY_INFO, whatsappUrl, type AppLocale, type RegionCode } from "@/lib/constants";
import { SAMPLE_BANK_ACCOUNTS, SAMPLE_ORDER, getOrderTotals } from "../data/checkoutData";
import { formatMoney } from "../utils/formatMoney";
import { DetailList } from "./DetailList";
import { ResultCard } from "./ResultCard";
import { ResultHomeLink } from "./ResultHomeLink";

interface BankTransferPendingProps {
  country: RegionCode;
}

/** P-03b · Waiting for the bank transfer. */
export function BankTransferPending({ country }: BankTransferPendingProps) {
  const t = useTranslations("checkout.pending");
  const locale = useLocale() as AppLocale;
  const { total, currency } = getOrderTotals(country);
  const account = SAMPLE_BANK_ACCOUNTS[country];

  return (
    <ResultCard icon={FiClock} tone="pending" title={t("title")} text={t("text")}>
      <DetailList
        className="rounded-xl bg-surface-alt px-4"
        items={[
          { label: t("bank"), value: account.bankName[locale] },
          { label: t("accountName"), value: COMPANY_INFO.legalName[locale] },
          { label: t("iban"), value: account.iban, ltr: true },
          { label: t("reference"), value: SAMPLE_ORDER.orderNumber, ltr: true },
          { label: t("amount"), value: formatMoney(total, currency, locale), emphasis: true },
        ]}
      />

      <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-surface-warm p-4 text-caption text-body">
        <FiInfo className="mt-0.5 size-4 shrink-0 text-secondary-dark" aria-hidden="true" />
        {t("note")}
      </p>

      <Button
        href={whatsappUrl(t("whatsappMessage", { order: SAMPLE_ORDER.orderNumber }))}
        external
        variant="secondary"
        size="lg"
        fullWidth
        icon={<FaWhatsapp />}
        iconPosition="start"
        className="mt-8"
      >
        {t("primary")}
      </Button>
      <ResultHomeLink />
    </ResultCard>
  );
}
