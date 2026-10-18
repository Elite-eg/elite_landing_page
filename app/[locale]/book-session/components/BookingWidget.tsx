"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence } from "framer-motion";
import type { MeetingType } from "../data/bookingData";
import { useBookingSchedule } from "../hooks/useBookingSchedule";
import { DetailsStep, type BookingFormData } from "./DetailsStep";
import { ScheduleStep } from "./ScheduleStep";
import { StepPills, type BookingStep } from "./StepPills";
import { SuccessStep } from "./SuccessStep";

const EMPTY_FORM: BookingFormData = { name: "", phone: "", email: "", company: "", notes: "" };

/** White booking widget: schedule → details → success. */
export function BookingWidget() {
  const isRtl = useLocale() === "ar";
  const schedule = useBookingSchedule();

  const [step, setStep] = useState<BookingStep>("schedule");
  const [meetingType, setMeetingType] = useState<MeetingType>("video");
  const [formData, setFormData] = useState<BookingFormData>(EMPTY_FORM);

  return (
    <div className="flex w-full flex-col gap-[1.125rem] rounded-[1.625rem] bg-surface p-5 text-body shadow-widget sm:p-7">
      <StepPills step={step} onSelectStep={setStep} />

      <AnimatePresence mode="wait">
        {step === "schedule" && (
          <ScheduleStep
            key="schedule"
            schedule={schedule}
            meetingType={meetingType}
            onMeetingTypeChange={setMeetingType}
            onNext={() => setStep("details")}
          />
        )}

        {step === "details" && (
          <DetailsStep
            data={formData}
            isRtl={isRtl}
            onChange={setFormData}
            onBack={() => setStep("schedule")}
            onSubmit={() => setStep("success")}
          />
        )}

        {step === "success" && (
          <SuccessStep
            dateLabel={schedule.selectedDateLabel}
            timeLabel={schedule.selectedTimeLabel}
            meetingType={meetingType}
            onReset={() => setStep("schedule")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
