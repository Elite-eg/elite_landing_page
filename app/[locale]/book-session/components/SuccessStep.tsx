"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiCheckCircle, FiHome } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { ROUTES } from "@/lib/constants";
import { fadeInUp, popIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { MeetingType } from "../data/bookingData";

export interface SuccessStepProps {
  dateLabel: string;
  timeLabel: string;
  meetingType: MeetingType;
}

/** Step 3: shown only after the booking endpoint confirmed the session. */
export function SuccessStep({ dateLabel, timeLabel, meetingType }: SuccessStepProps) {
  const t = useTranslations("booking");
  const summary = [
    { label: t("summary.date"), value: dateLabel },
    { label: t("summary.time"), value: timeLabel },
    { label: t("summary.meeting"), value: t(`meetingTypes.${meetingType}`), emphasis: true },
  ];

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible" exit="hidden" className="space-y-5 py-6 text-center">
      <motion.span variants={popIn} className="mx-auto grid size-16 place-items-center rounded-full bg-surface-info text-success shadow-inner">
        <FiCheckCircle className="size-10" aria-hidden="true" />
      </motion.span>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-body sm:text-xl">{t("success.title")}</h3>
        <p className="mx-auto max-w-xs text-xs text-content sm:text-sm">{t("success.subtitle")}</p>
      </div>

      <dl className="space-y-2 rounded-2xl border border-edge/60 bg-surface-alt p-4 text-start text-xs shadow-sm">
        {summary.map(({ label, value, emphasis }) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <dt className="text-content">{label}</dt>
            <dd className={cn("font-bold", emphasis ? "text-secondary" : "text-body")}>{value}</dd>
          </div>
        ))}
      </dl>

      <Button
        href={ROUTES.home}
        variant="primary"
        fullWidth
        icon={<FiHome />}
        iconPosition="start"
        className="bg-primary-deep shadow-md hover:bg-primary-dark"
      >
        {t("success.backHome")}
      </Button>
    </motion.div>
  );
}
