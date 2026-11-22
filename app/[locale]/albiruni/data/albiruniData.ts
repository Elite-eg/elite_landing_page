import type { IconType } from "react-icons";
import {
  FiCloud,
  FiCode,
  FiFileText,
  FiGlobe,
  FiLock,
  FiMonitor,
  FiSmartphone,
  FiZap,
} from "react-icons/fi";
import { ROUTES } from "@/lib/constants";

/** "Two experiences" section: the hero's "Take a tour" button scrolls to it. */
export const PLATFORM_EXPERIENCES_ID = "experiences";
export const PLATFORM_TOUR_HREF = `${ROUTES.albiruni.platform}#${PLATFORM_EXPERIENCES_ID}`;

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
