"use client";

import { useTranslations } from "next-intl";
import { FiHome } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { SuccessPanel } from "@/app/components/shared/SuccessPanel";
import { ROUTES } from "@/lib/constants";
import type { MeetingType } from "../data/bookingData";

export interface SuccessStepProps {
  dateLabel: string;
  timeLabel: string;
  meetingType: MeetingType;
}

/** Step 3: shown only after the booking endpoint confirmed the session. */
export function SuccessStep({ dateLabel, timeLabel, meetingType }: SuccessStepProps) {
  const t = useTranslations("booking");

  return (
    <SuccessPanel
      title={t("success.title")}
      subtitle={t("success.subtitle")}
      details={[
        { label: t("summary.date"), value: dateLabel },
        { label: t("summary.time"), value: timeLabel },
        { label: t("summary.meeting"), value: t(`meetingTypes.${meetingType}`), emphasis: true },
      ]}
    >
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
    </SuccessPanel>
  );
}
