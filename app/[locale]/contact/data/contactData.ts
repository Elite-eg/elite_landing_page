import type { IconType } from "react-icons";
import { FaWhatsapp } from "react-icons/fa6";
import { FiMail, FiMapPin, FiMessageSquare, FiPhone } from "react-icons/fi";

/** Copy: `contact.channels.<key>.title` (+ `.value` for maher). Values and links come from COMPANY_INFO. */
export type ContactChannelKey = "whatsapp" | "maher" | "phone" | "email" | "address";

/** Icon tile colours from the Figma: WhatsApp green, warm orange for Maher, navy tint for company data. */
export type ContactChannelTone = "whatsapp" | "warm" | "muted";

export interface ContactChannel {
  key: ContactChannelKey;
  icon: IconType;
  tone: ContactChannelTone;
}

/** Channels beside the form, in display order. */
export const CONTACT_CHANNELS: ContactChannel[] = [
  { key: "whatsapp", icon: FaWhatsapp, tone: "whatsapp" },
  { key: "maher", icon: FiMessageSquare, tone: "warm" },
  { key: "phone", icon: FiPhone, tone: "muted" },
  { key: "email", icon: FiMail, tone: "muted" },
  { key: "address", icon: FiMapPin, tone: "muted" },
];

/** Employee ranges ("Number of employees"). Labels: `contact.form.companySizes.<key>`. TBD: owner to confirm the ranges. */
export const COMPANY_SIZES = ["micro", "small", "medium", "large", "enterprise"] as const;

/** "What do you need?" options: Albiruni per sector, then each service. Labels: `contact.form.needs.<key>`. */
export const CONTACT_NEEDS = [
  "albiruniDistribution",
  "albiruniFieldSales",
  "albiruniCarService",
  "consulting",
  "webApps",
  "mobileApps",
  "erp",
  "ai",
  "other",
] as const;
