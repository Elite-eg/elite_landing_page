import { useTranslations } from "next-intl";
import { FiTrendingUp } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { DashboardStat, SparklineTone } from "../data/albiruniData";
import { Sparkline } from "./Sparkline";

export interface DashboardStatCardProps {
  stat: DashboardStat;
  /** Position in the row: the sparklines draw one after another. */
  index: number;
}

const TONE_CLASSES: Record<SparklineTone, string> = {
  success: "text-success",
  albiruni: "text-albiruni",
};

/** Dashboard stat tile (Figma "Stat widget"): label, value, trend, and a sparkline along the bottom edge. */
export function DashboardStatCard({ stat: { key, tone, points }, index }: DashboardStatCardProps) {
  const t = useTranslations(`albiruni.mockup.dashboard.stats.${key}`);

  return (
    <div className="flex flex-1 flex-col items-start gap-1 overflow-hidden rounded-2xl border border-edge/60 bg-surface px-[13px] pt-[13px]">
      <p className="text-[11px] text-content">{t("label")}</p>
      {/* "auto": a value without letters ("46 / 60") reads left to right in Arabic too, as in the Figma. */}
      <p dir="auto" className="font-heading text-[22px] font-semibold text-body">
        {t("value")}
      </p>
      <p className={cn("flex items-center gap-[5px] text-[10.5px] font-medium", TONE_CLASSES[tone])}>
        {t("trend")}
        <FiTrendingUp className="size-[13px]" strokeWidth={2.6} />
      </p>
      <Sparkline points={points} delay={1.1 + index * 0.1} className={cn("h-[34px] w-full", TONE_CLASSES[tone])} />
    </div>
  );
}
