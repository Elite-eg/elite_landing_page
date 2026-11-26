import type { IconType } from "react-icons";
import {
  FiCalendar,
  FiCheckSquare,
  FiClipboard,
  FiClock,
  FiCreditCard,
  FiHexagon,
  FiKey,
  FiMapPin,
  FiShoppingCart,
  FiTool,
} from "react-icons/fi";
import { LuChartColumn } from "react-icons/lu";
import type { SectorKey } from "@/lib/sectors";

export interface DayStep {
  /** Copy: `solutions.day.<sector>.steps.<key>` (title, description). */
  key: string;
  /** Time of day, 24-hour "HH:MM" (the same digits in both languages). */
  time: string;
  icon: IconType;
}

/**
 * One workday per sector, morning → evening ("day in the life" flow under the hero; the hero's sector tabs pick one).
 * Distribution is the Figma's (icons are its Lucide glyphs: hexagon, map pin, credit card, check square, column chart).
 * TBD (owner to confirm): the field sales and car service center days (times, steps, copy) aren't in the Figma; they
 * were written from each sector's card ("what it covers", key apps).
 */
export const SECTOR_DAYS: Record<SectorKey, readonly DayStep[]> = {
  distribution: [
    { key: "loading", time: "07:30", icon: FiHexagon },
    { key: "visits", time: "09:00", icon: FiMapPin },
    { key: "invoicing", time: "13:00", icon: FiCreditCard },
    { key: "stockCount", time: "16:30", icon: FiCheckSquare },
    { key: "closing", time: "17:00", icon: LuChartColumn },
  ],
  fieldSales: [
    { key: "checkIn", time: "08:00", icon: FiClock },
    { key: "visit", time: "09:30", icon: FiMapPin },
    { key: "order", time: "11:00", icon: FiShoppingCart },
    { key: "collection", time: "14:00", icon: FiCreditCard },
    { key: "settlement", time: "17:00", icon: LuChartColumn },
  ],
  carService: [
    { key: "reception", time: "08:30", icon: FiCalendar },
    { key: "workOrder", time: "09:00", icon: FiClipboard },
    { key: "repair", time: "10:30", icon: FiTool },
    { key: "invoicing", time: "15:00", icon: FiCreditCard },
    { key: "handover", time: "16:00", icon: FiKey },
  ],
};
