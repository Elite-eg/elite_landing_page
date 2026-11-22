"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { growY, withDelay } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { WEEKLY_SALES, WEEKLY_SALES_PEAK } from "../data/albiruniData";

/** Weekly sales bars (Figma "Chart widget"): teal days, the best one in orange. Bars grow one after another. */
export function WeeklySalesChart() {
  const t = useTranslations("albiruni.mockup.dashboard");

  return (
    <div className="flex flex-1 flex-col items-start gap-2.5 rounded-2xl border border-edge/60 bg-surface p-[13px]">
      <p className="font-heading text-[13px] font-semibold text-body">{t("weeklySales")}</p>
      <div className="flex h-[91px] w-full items-end justify-center gap-[9px]">
        {WEEKLY_SALES.map((height, index) => (
          <motion.span
            key={index}
            variants={withDelay(growY, 1.2 + index * 0.06)}
            style={{ height: `${height}%` }}
            className={cn("w-[18px] rounded-t-[5px]", index === WEEKLY_SALES_PEAK ? "bg-secondary" : "bg-albiruni/80")}
          />
        ))}
      </div>
    </div>
  );
}
