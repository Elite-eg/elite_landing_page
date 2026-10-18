"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { fadeInUp } from "@/lib/animations";
import type { BookingSchedule } from "../hooks/useBookingSchedule";
import { CalendarGrid } from "./CalendarGrid";
import type { MeetingType } from "../data/bookingData";
import { MeetingTypePicker } from "./MeetingTypePicker";
import { MonthNav } from "./MonthNav";
import { TimeSlotPicker } from "./TimeSlotPicker";

export interface ScheduleStepProps {
  schedule: BookingSchedule;
  meetingType: MeetingType;
  onMeetingTypeChange: (type: MeetingType) => void;
  onNext: () => void;
}

/** Step 1: meeting channel, day and time slot. */
export function ScheduleStep({ schedule, meetingType, onMeetingTypeChange, onNext }: ScheduleStepProps) {
  const t = useTranslations("booking");

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="flex flex-col items-start gap-[1.125rem]"
    >
      <MeetingTypePicker value={meetingType} onChange={onMeetingTypeChange} />

      <MonthNav
        label={schedule.monthLabel}
        canGoPrev={schedule.canGoPrev}
        onPrev={schedule.goToPrevMonth}
        onNext={schedule.goToNextMonth}
      />

      <CalendarGrid
        year={schedule.year}
        month={schedule.month}
        minDate={schedule.minDate}
        selectedDay={schedule.selectedDay}
        onSelectDay={schedule.selectDay}
        dayLabel={schedule.dayLabel}
      />

      <TimeSlotPicker
        dateLabel={schedule.selectedDateLabel}
        slots={schedule.timeSlots}
        value={schedule.selectedTime}
        onChange={schedule.selectTime}
      />

      <Button
        variant="secondary"
        size="lg"
        fullWidth
        icon={<FiArrowRight />}
        flipIconInRtl
        onClick={onNext}
        className="min-h-[3.375rem] text-[1.0625rem]"
      >
        {t("nextDetailsCta")}
      </Button>

      <p className="text-[0.78125rem] text-ink-400">{t("note")}</p>
    </motion.div>
  );
}
