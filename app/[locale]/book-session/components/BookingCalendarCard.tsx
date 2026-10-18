"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { DropdownOption } from "@/app/components/shared/CustomDropdown";
import { BookingCalendarGrid } from "./booking/BookingCalendarGrid";
import {
  BookingDetailsForm,
  type BookingFormData,
} from "./booking/BookingDetailsForm";
import {
  BookingMeetingTypes,
  type MeetingType,
} from "./booking/BookingMeetingTypes";
import { BookingMonthYearPicker } from "./booking/BookingMonthYearPicker";
import { BookingStepPills, type BookingStep } from "./booking/BookingStepPills";
import { BookingSuccessState } from "./booking/BookingSuccessState";
import { BookingTimeSlots } from "./booking/BookingTimeSlots";

export interface BookingCalendarCardProps {
  className?: string;
}

const RAW_TIME_SLOTS = ["10:00", "12:30", "15:00", "18:00"];

export function BookingCalendarCard({ className }: BookingCalendarCardProps) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const isRtl = locale === "ar";

  // Calculate today and tomorrow (minimum booking date)
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const [step, setStep] = useState<BookingStep>("schedule");
  const [meetingType, setMeetingType] = useState<MeetingType>("video");

  // Dynamic Date State initialized to tomorrow
  const [year, setYear] = useState<number>(() => tomorrow.getFullYear());
  const [month, setMonth] = useState<number>(() => tomorrow.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(() => tomorrow.getDate());

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    email: "",
    company: "",
    notes: "",
  });

  // Calculate days in month & offset
  const firstDayDate = new Date(year, month, 1);
  const startOffset = (firstDayDate.getDay() + 1) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const yearsList = Array.from({ length: 5 }, (_, i) => currentYear + i);

  // Dynamic locale-aware month options
  const monthOptions: DropdownOption<number>[] = Array.from({ length: 12 }, (_, idx) => ({
    label: new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(2026, idx, 1)),
    value: idx,
  })).filter((opt) => year > currentYear || opt.value >= currentMonth);

  const yearOptions: DropdownOption<number>[] = yearsList.map((y) => ({
    label: String(y),
    value: y,
  }));

  const ensureValidDay = (y: number, m: number, d: number) => {
    const daysInNewMonth = new Date(y, m + 1, 0).getDate();
    let validDay = Math.min(d, daysInNewMonth);
    const checkDate = new Date(y, m, validDay);
    if (checkDate < tomorrow) {
      if (y === tomorrow.getFullYear() && m === tomorrow.getMonth()) {
        validDay = tomorrow.getDate();
      } else {
        validDay = 1;
      }
    }
    setSelectedDay(validDay);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    let targetMonth = month;
    if (newYear === currentYear && month < currentMonth) {
      targetMonth = currentMonth;
      setMonth(currentMonth);
    }
    ensureValidDay(newYear, targetMonth, selectedDay);
  };

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    ensureValidDay(year, newMonth, selectedDay);
  };

  // Format selected date dynamically with Intl
  const selectedDateObj = new Date(
    year,
    month,
    Math.min(selectedDay, daysInMonth),
  );
  const formattedSelectedDate = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(selectedDateObj);

  // Dynamic locale-aware time slot formatting
  const timeSlots = RAW_TIME_SLOTS.map((timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    const label = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(2026, 0, 1, h, m));
    return { label, value: label };
  });

  const [selectedTime, setSelectedTime] = useState<string>(() => timeSlots[1]?.value || "12:30 PM");

  const handleNextStep = () => {
    if (step === "schedule") {
      setStep("details");
    } else if (step === "details") {
      setStep("success");
    }
  };

  const handleBackStep = () => {
    if (step === "details") setStep("schedule");
  };

  return (
    <div
      className={cn(
        "bg-surface text-body rounded-3xl p-5 sm:p-7 shadow-2xl border border-edge/60 max-w-lg w-full mx-auto transition-all duration-300 hover:shadow-primary/10",
        className,
      )}
    >
      <BookingStepPills step={step} onSelectStep={setStep} />

      <AnimatePresence mode="wait">
        {step === "schedule" && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 16 : -16 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-6"
          >
            <BookingMeetingTypes
              meetingType={meetingType}
              onChangeMeetingType={setMeetingType}
            />

            <BookingMonthYearPicker
              month={month}
              year={year}
              monthOptions={monthOptions}
              yearOptions={yearOptions}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
            />

            <BookingCalendarGrid
              daysInMonth={daysInMonth}
              startOffset={startOffset}
              selectedDay={selectedDay}
              tomorrow={tomorrow}
              year={year}
              month={month}
              isRtl={isRtl}
              onSelectDay={setSelectedDay}
            />

            <BookingTimeSlots
              formattedDateLabel={formattedSelectedDate}
              timeSlots={timeSlots}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />

            <div className="pt-2 space-y-2">
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleNextStep}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-surface font-bold py-3.5 px-6 rounded-2xl text-sm sm:text-base shadow-lg shadow-secondary/20 transition-all duration-300 cursor-pointer"
              >
                <span>{t("nextDetailsCta")}</span>
                {isRtl ? (
                  <FiArrowLeft className="size-5" />
                ) : (
                  <FiArrowRight className="size-5" />
                )}
              </motion.button>
              <p className="text-center text-[11px] text-content/70 font-medium">
                {t("note")}
              </p>
            </div>
          </motion.div>
        )}

        {step === "details" && (
          <BookingDetailsForm
            formData={formData}
            isRtl={isRtl}
            onFormChange={setFormData}
            onBack={handleBackStep}
            onSubmit={handleNextStep}
          />
        )}

        {step === "success" && (
          <BookingSuccessState
            formattedSelectedDate={formattedSelectedDate}
            selectedTime={selectedTime}
            meetingType={meetingType}
            onReset={() => setStep("schedule")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
