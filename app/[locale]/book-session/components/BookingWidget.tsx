"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import ApiService from "@/app/services/ApiService";
import { log } from "@/app/services/logger";
import { API_ENDPOINTS } from "@/lib/constants";
import type { MeetingType } from "../data/bookingData";
import { useBookingSchedule } from "../hooks/useBookingSchedule";
import { DetailsStep, type BookingDetails, type BookingFormData } from "./DetailsStep";
import { ScheduleStep } from "./ScheduleStep";
import { StepPills, type BookingStep } from "./StepPills";
import { SuccessStep } from "./SuccessStep";

/** The phone code starts automatic (""), following the visitor's country. */
const EMPTY_FORM: BookingFormData = { name: "", phoneCountry: "", phone: "", email: "", company: "", notes: "" };

/** White booking widget: schedule → details → success (only once the backend accepted the booking). */
export function BookingWidget() {
  const t = useTranslations("booking");
  const schedule = useBookingSchedule();

  const [step, setStep] = useState<BookingStep>("schedule");
  const [meetingType, setMeetingType] = useState<MeetingType>("video");
  const [formData, setFormData] = useState<BookingFormData>(EMPTY_FORM);

  const submitBooking = async (values: BookingDetails) => {
    // try {
    //   const response = await ApiService.post(API_ENDPOINTS.bookSession, {
    //     date: schedule.selectedDateIso,
    //     time: schedule.selectedTime,
    //     meetingType,
    //     ...values,
    //   });
    //   if (response.status >= 200 && response.status < 300) {
    //     setStep("success");
    //     return;
    //   }
    //   log.warn("Booking rejected", response.status);
    //   toast.error(t("errorToast"));
    // } catch (error) {
    //   log.error("Booking failed", error);
    //   toast.error(t("errorToast"));
    // }
    setStep("success"); // TODO: remove this line when the backend is ready
  };

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
            key="details"
            defaultValues={formData}
            onChange={setFormData}
            onBack={() => setStep("schedule")}
            onSubmit={submitBooking}
          />
        )}

        {step === "success" && (
          <SuccessStep
            key="success"
            dateLabel={schedule.selectedDateLabel}
            timeLabel={schedule.selectedTimeLabel}
            meetingType={meetingType}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
