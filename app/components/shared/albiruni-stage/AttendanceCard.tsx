"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { growX, withDelay } from "@/lib/animations";
import { SHIFT_PROGRESS } from "../data/albiruniData";

/**
 * Teal attendance card of the super app: checked-in time, time on shift, a shift progress bar that fills once the
 * phone is in place, and the check-out button. The Figma's cyan highlight has no token, so the highlights are white.
 */
export function AttendanceCard() {
  const t = useTranslations("albiruni.mockup.app.attendance");

  return (
    <div className="flex w-full flex-col gap-2 rounded-[21px] bg-albiruni p-4 text-white">
      <div className="flex items-center justify-between font-heading font-bold">
        <p className="text-[17px]">{t("status")}</p>
        <p className="text-lg">{t("elapsed")}</p>
      </div>
      <p className="text-[10.5px] text-white/75">{t("detail")}</p>
      {/* Fills from the left in both languages, as in the Figma. */}
      <div dir="ltr" className="h-[6.5px] overflow-hidden rounded-[5px] bg-white/20">
        <motion.div
          variants={withDelay(growX, 1.3)}
          style={{ width: `${SHIFT_PROGRESS}%` }}
          className="h-full rounded-[5px] bg-white"
        />
      </div>
      <p className="rounded-xl bg-surface py-[9px] text-center text-xs font-medium text-albiruni">{t("checkOut")}</p>
    </div>
  );
}
