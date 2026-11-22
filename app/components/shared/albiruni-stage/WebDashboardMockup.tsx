import { useTranslations } from "next-intl";
import { FiChevronDown } from "react-icons/fi";
import { DASHBOARD_STATS } from "../data/albiruniData";
import { DashboardStatCard } from "./DashboardStatCard";
import { DashboardTopBar } from "./DashboardTopBar";
import { RecentOrders } from "./RecentOrders";
import { WeeklySalesChart } from "./WeeklySalesChart";

/** Albiruni web dashboard (Figma "Web · Albiruni dashboard"): top bar, stat tiles, weekly sales and latest orders. */
export function WebDashboardMockup() {
  const t = useTranslations("albiruni.mockup.dashboard");

  return (
    <div className="overflow-hidden rounded-[21px] bg-surface-alt leading-tight shadow-widget">
      <DashboardTopBar />

      <div className="flex flex-col gap-[13px] px-[18px] pb-[18px] pt-4">
        <div className="flex items-center justify-between">
          <p className="font-heading text-[19.5px] font-bold text-body">{t("title")}</p>
          <span className="flex items-center gap-1 rounded-lg border border-edge bg-surface px-2.5 py-[5px] text-[11px] text-ink-700">
            {t("period")}
            <FiChevronDown className="size-3" />
          </span>
        </div>

        <div className="flex gap-2.5">
          {DASHBOARD_STATS.map((stat, index) => (
            <DashboardStatCard key={stat.key} stat={stat} index={index} />
          ))}
        </div>

        <div className="flex items-start gap-2.5">
          <RecentOrders />
          <WeeklySalesChart />
        </div>
      </div>
    </div>
  );
}
