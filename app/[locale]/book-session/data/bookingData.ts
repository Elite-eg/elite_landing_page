/** Calendar columns in order: the week starts on Saturday. Labels live in `booking.weekdays`. */
export const WEEKDAY_KEYS = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"] as const;
export type WeekdayKey = (typeof WEEKDAY_KEYS)[number];

/** Friday (`Date.getDay() === 5`) is the weekend, so no sessions are offered. */
export const CLOSED_WEEKDAY = 5;

/** Daily session slots, Cairo time, 24h "HH:mm". */
export const TIME_SLOTS = ["10:00", "12:30", "15:00", "18:00"] as const;
export type TimeSlot = (typeof TIME_SLOTS)[number];
export const DEFAULT_TIME_SLOT: TimeSlot = "12:30";

export const MEETING_TYPES = ["video", "whatsapp", "office"] as const;
export type MeetingType = (typeof MEETING_TYPES)[number];

export const NEXT_STEP_KEYS = ["step1", "step2", "step3"] as const;
