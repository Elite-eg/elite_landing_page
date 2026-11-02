import type { IconType } from "react-icons";
import {
  FiCloud,
  FiCode,
  FiFileText,
  FiGlobe,
  FiLock,
  FiMonitor,
  FiPackage,
  FiSmartphone,
  FiTool,
  FiTruck,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { ROUTES } from "@/lib/constants";

/** "Two experiences" section: the hero's "Take a tour" button scrolls to it. */
export const PLATFORM_EXPERIENCES_ID = "experiences";
export const PLATFORM_TOUR_HREF = `${ROUTES.albiruni.platform}#${PLATFORM_EXPERIENCES_ID}`;

/* ── Hero mockups (sample screens drawn in code; copy in `albiruni.mockup`) ─────────────── */

/** Tabs of the web dashboard top bar, start → end; the first one is active. Labels: `mockup.dashboard.nav.<key>`. */
export const DASHBOARD_NAV = ["dashboard", "fieldSales", "warehouse", "collection", "attendance", "reports"] as const;

export type SparklineTone = "success" | "albiruni";

export interface DashboardStat {
  /** Copy: `mockup.dashboard.stats.<key>`. */
  key: "sales" | "visits" | "attendance";
  tone: SparklineTone;
  /** Eight readings in the sparkline's 210×34 box (y grows downward), oldest first. From the Figma. */
  points: readonly number[];
}

/** Stat tiles of the web dashboard, start → end. */
export const DASHBOARD_STATS: readonly DashboardStat[] = [
  { key: "sales", tone: "success", points: [27, 22, 23.7, 16.9, 18.6, 12.9, 14.2, 6.8] },
  { key: "visits", tone: "albiruni", points: [23.7, 20.3, 20.9, 15.2, 13.5, 14.2, 10.1, 8.8] },
  { key: "attendance", tone: "success", points: [16.9, 15.2, 16.3, 13.5, 14.2, 11.4, 10.1, 9.5] },
];

/** Weekly sales bars, start → end, as a share of the tallest one (%). */
export const WEEKLY_SALES = [83, 100, 73, 91, 53, 79, 61] as const;
/** The bar drawn in orange (the best day). */
export const WEEKLY_SALES_PEAK = 1;

export type OrderStatus = "approved" | "pending" | "delivered";

export interface RecentOrder {
  /** Copy: `mockup.dashboard.orders.<key>`; status label: `mockup.dashboard.status.<status>`. */
  key: "nour" | "fajr" | "shifa";
  status: OrderStatus;
}

/** "Latest orders" rows, newest first. */
export const RECENT_ORDERS: readonly RecentOrder[] = [
  { key: "nour", status: "approved" },
  { key: "fajr", status: "pending" },
  { key: "shifa", status: "delivered" },
];

/** Shift progress on the attendance card (%). */
export const SHIFT_PROGRESS = 63;

/** Counters under the attendance card, start → end. Copy: `mockup.app.counters.<key>`. */
export const APP_COUNTERS = ["tasks", "requests", "tickets"] as const;

export type AppTileTone = "albiruni" | "accent" | "warning" | "secondaryDark";

export interface SuperAppTile {
  /** Copy: `mockup.app.apps.<key>`. */
  key: "sales" | "hr" | "warehouse" | "maintenance";
  icon: IconType;
  tone: AppTileTone;
}

/** "My apps" grid, start → end, two per row. */
export const SUPER_APP_TILES: readonly SuperAppTile[] = [
  { key: "sales", icon: FiTruck, tone: "albiruni" },
  { key: "hr", icon: FiUsers, tone: "accent" },
  { key: "warehouse", icon: FiPackage, tone: "warning" },
  { key: "maintenance", icon: FiTool, tone: "secondaryDark" },
];

/* ── Sections ────────────────────────────────────────────────────────────────────────────── */

export type ExperienceTone = "dark" | "light";

export interface PlatformExperience {
  /** Copy: `albiruni.experiences.<key>` (tag, title, description, points). */
  key: "mobile" | "web";
  icon: IconType;
  tone: ExperienceTone;
}

/** The two ways into the same data, start → end: the navy card is the page's bold moment below the hero. */
export const PLATFORM_EXPERIENCES: readonly PlatformExperience[] = [
  { key: "mobile", icon: FiSmartphone, tone: "dark" },
  { key: "web", icon: FiMonitor, tone: "light" },
];

export interface PlatformCapability {
  /** Copy: `albiruni.capabilities.items.<key>`. */
  key: "liveReports" | "eInvoicing" | "permissions" | "api" | "hosting" | "bilingual";
  icon: IconType;
}

/**
 * "Built for businesses in our region" tiles, start → end.
 * Feather has no sparkles or languages glyph (the Figma's Lucide icons), so live reports use a bolt and bilingual a globe.
 */
export const PLATFORM_CAPABILITIES: readonly PlatformCapability[] = [
  { key: "liveReports", icon: FiZap },
  { key: "eInvoicing", icon: FiFileText },
  { key: "permissions", icon: FiLock },
  { key: "api", icon: FiCode },
  { key: "hosting", icon: FiCloud },
  { key: "bilingual", icon: FiGlobe },
];
