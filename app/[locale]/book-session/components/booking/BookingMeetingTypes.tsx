"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiBriefcase, FiPhoneCall, FiVideo } from "react-icons/fi";
import { cn } from "@/lib/utils";

export type MeetingType = "video" | "whatsapp" | "office";

export interface BookingMeetingTypesProps {
  meetingType: MeetingType;
  onChangeMeetingType: (type: MeetingType) => void;
}

export function BookingMeetingTypes({
  meetingType,
  onChangeMeetingType,
}: BookingMeetingTypesProps) {
  const t = useTranslations("booking.meetingTypes");

  const types: { type: MeetingType; label: string; icon: typeof FiVideo }[] = [
    { type: "video", label: t("video"), icon: FiVideo },
    { type: "whatsapp", label: t("whatsapp"), icon: FiPhoneCall },
    { type: "office", label: t("office"), icon: FiBriefcase },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 items-stretch">
      {types.map(({ type, label, icon: Icon }) => {
        const isSelected = meetingType === type;
        return (
          <motion.button
            key={type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => onChangeMeetingType(type)}
            className={cn(
              "flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl text-[11px] sm:text-xs font-bold border transition-all duration-300 text-center leading-tight min-h-[46px] cursor-pointer",
              isSelected
                ? "bg-surface-info border-secondary text-secondary shadow-md"
                : "bg-surface-alt border-edge/60 text-content hover:bg-surface-muted hover:text-body",
            )}
          >
            <Icon className="size-4 shrink-0 transition-transform duration-200" />
            <span className="truncate">{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
