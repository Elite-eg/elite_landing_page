import { useTranslations } from "next-intl";
import { Badge, type BadgeVariant } from "@/app/components/shared/Badge";
import { RECENT_ORDERS, type OrderStatus } from "../data/albiruniData";

const STATUS_BADGES: Record<OrderStatus, BadgeVariant> = {
  approved: "success",
  pending: "secondary",
  delivered: "accent",
};

/** "Latest orders" table (Figma "Table widget"): order and amount on the start side, status badge on the end side. */
export function RecentOrders() {
  const t = useTranslations("albiruni.mockup.dashboard");

  return (
    <div className="flex-1 overflow-hidden rounded-2xl border border-edge/60 bg-surface">
      <p className="px-[13px] pb-[9px] pt-3 font-heading text-[13px] font-semibold text-body">{t("recentOrders")}</p>
      <ul>
        {RECENT_ORDERS.map(({ key, status }) => (
          <li key={key} className="flex items-center justify-between border-t border-edge/60 px-[13px] py-[9px]">
            <div className="flex flex-col gap-px">
              <span className="text-[11px] font-medium text-body">{t(`orders.${key}.title`)}</span>
              <span className="text-[10.5px] text-content">{t(`orders.${key}.amount`)}</span>
            </div>
            <Badge variant={STATUS_BADGES[status]} size="sm" className="font-medium">
              {t(`status.${status}`)}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
