import { useLocale, useTranslations } from "next-intl";
import { FiCalendar, FiCheck } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { ROUTES, type AppLocale, type RegionCode } from "@/lib/constants";
import { SAMPLE_ORDER, getOrderTotals } from "../data/checkoutData";
import { formatMoney } from "../utils/formatMoney";
import { DetailList } from "./DetailList";
import { ResultCard } from "./ResultCard";
import { ResultHomeLink } from "./ResultHomeLink";

const NEXT_STEPS = ["setup", "team", "onboarding"] as const;

interface ActivationSuccessProps {
  country: RegionCode;
  email: string;
}

/** P-03 · Subscription activated. */
export function ActivationSuccess({ country, email }: ActivationSuccessProps) {
  const t = useTranslations("checkout.success");
  const tSummary = useTranslations("checkout.summary");
  const locale = useLocale() as AppLocale;
  const { total, currency } = getOrderTotals(country);

  return (
    <ResultCard icon={FiCheck} tone="success" title={t("title")} text={t("text", { email })}>
      <DetailList
        className="rounded-xl bg-surface-alt px-4"
        items={[
          { label: tSummary("plan"), value: `${tSummary("product")} · ${tSummary("planName")}` },
          { label: tSummary("users"), value: tSummary("usersValue", { count: SAMPLE_ORDER.users }) },
          { label: t("amountPaid"), value: formatMoney(total, currency, locale) },
          { label: t("orderNumber"), value: SAMPLE_ORDER.orderNumber, ltr: true },
        ]}
      />

      <h3 className="mt-8 font-bold text-primary">{t("nextStepsTitle")}</h3>
      <ol className="mt-4 space-y-3">
        {NEXT_STEPS.map((key, index) => (
          <li key={key} className="flex items-start gap-3 text-caption text-content">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {index + 1}
            </span>
            <span className="pt-0.5">{t(`nextSteps.${key}`)}</span>
          </li>
        ))}
      </ol>

      <Button href={ROUTES.bookSession} variant="secondary" size="lg" fullWidth icon={<FiCalendar />} iconPosition="start" className="mt-8">
        {t("primary")}
      </Button>
      <ResultHomeLink />
    </ResultCard>
  );
}
