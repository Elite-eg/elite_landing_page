"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import type { MeetingType } from "./BookingMeetingTypes";

export interface BookingSuccessStateProps {
  formattedSelectedDate: string;
  selectedTime: string;
  meetingType: MeetingType;
  onReset: () => void;
}

export function BookingSuccessState({
  formattedSelectedDate,
  selectedTime,
  meetingType,
  onReset,
}: BookingSuccessStateProps) {
  const t = useTranslations("booking");

  const meetingTypeLabel =
    meetingType === "video"
      ? t("meetingTypes.video")
      : meetingType === "whatsapp"
        ? t("meetingTypes.whatsapp")
        : t("meetingTypes.office");

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-6 space-y-5"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="inline-flex items-center justify-center size-16 rounded-full bg-surface-info text-success shadow-inner"
      >
        <FiCheckCircle className="size-10 text-success" />
      </motion.div>

      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-body">
          {t("success.title")}
        </h3>
        <p className="text-xs sm:text-sm text-content max-w-xs mx-auto">
          {t("success.subtitle")}
        </p>
      </div>

      {/* Booking Summary Box */}
      <div className="bg-surface-alt rounded-2xl p-4 text-start text-xs space-y-2 border border-edge/60 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-content">{t("summary.date")}:</span>
          <span className="font-bold text-body">{formattedSelectedDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-content">{t("summary.time")}:</span>
          <span className="font-bold text-body">{selectedTime}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-content">{t("summary.meeting")}:</span>
          <span className="font-bold text-secondary">{meetingTypeLabel}</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={onReset}
        className="w-full py-3 px-4 rounded-xl bg-primary-deep text-surface text-xs font-bold hover:bg-primary-dark transition-all duration-200 cursor-pointer shadow-md"
      >
        {t("success.backHome")}
      </motion.button>
    </motion.div>
  );
}
