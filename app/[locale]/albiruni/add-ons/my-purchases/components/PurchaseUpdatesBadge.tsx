import { useLocale, useTranslations } from "next-intl";
import { FiClock, FiRefreshCw } from "react-icons/fi";
import { Badge } from "@/app/components/shared/Badge";
import { formatLongDate } from "@/lib/dates";

export interface PurchaseUpdatesBadgeProps {
  /** ISO date of the last day of free updates. */
  until: string;
  active: boolean;
}

/** "Free updates until …" (green) while they run, "Free updates ended on …" (grey) after. */
export function PurchaseUpdatesBadge({ until, active }: PurchaseUpdatesBadgeProps) {
  const t = useTranslations("addons.myPurchases.updates");
  const locale = useLocale();
  const date = formatLongDate(until, locale);

  return active ? (
    <Badge variant="success" icon={<FiRefreshCw className="size-3.5 text-success" />} className="self-start">
      {t("active", { date })}
    </Badge>
  ) : (
    <Badge variant="neutral" icon={<FiClock className="size-3.5" />} className="self-start">
      {t("ended", { date })}
    </Badge>
  );
}
