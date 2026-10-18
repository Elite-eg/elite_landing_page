import type { IconType } from "react-icons";
import { FiBarChart2, FiMapPin, FiMonitor, FiSmartphone } from "react-icons/fi";
import { PROJECT_LINKS } from "@/lib/constants";

/** Keys map to `caseStudies.bareeqX.hero.tags.<key>`. Order = reading order (start → end). */
export type BareeqTagKey = "mobile" | "web" | "country" | "live";

export const BAREEQ_TAGS: BareeqTagKey[] = ["mobile", "web", "country", "live"];

/** Keys map to `caseStudies.bareeqX.hero.facts.<key>.{value,label}`. */
export type BareeqFactKey = "duration" | "interfaces" | "stores";

export const BAREEQ_FACTS: BareeqFactKey[] = ["duration", "interfaces", "stores"];

/** Keys map to `caseStudies.bareeqX.solution.interfaces.<key>.{title,text}`. */
export type BareeqInterfaceKey = "website" | "customer" | "agent" | "admin";

export interface BareeqInterface {
  key: BareeqInterfaceKey;
  icon: IconType;
}

export const BAREEQ_INTERFACES: BareeqInterface[] = [
  { key: "website", icon: FiMonitor },
  { key: "customer", icon: FiSmartphone },
  { key: "agent", icon: FiMapPin },
  { key: "admin", icon: FiBarChart2 },
];

/** Keys map to `caseStudies.bareeqX.solution.tech.<key>`. */
export type BareeqTechKey = "flutter" | "nextjs" | "tailwind" | "laravel" | "sql" | "moyasar" | "otp" | "server";

export const BAREEQ_TECH_STACK: BareeqTechKey[] = [
  "flutter",
  "nextjs",
  "tailwind",
  "laravel",
  "sql",
  "moyasar",
  "otp",
  "server",
];

/** "done" = teal check, "current" = orange (the ongoing phase). */
export type MilestoneStatus = "done" | "current";

/** Keys map to `caseStudies.bareeqX.result.timeline.<key>.{date,title,text}`. */
export interface BareeqMilestone {
  key: "kickoff" | "launch" | "now";
  status: MilestoneStatus;
}

export const BAREEQ_TIMELINE: BareeqMilestone[] = [
  { key: "kickoff", status: "done" },
  { key: "launch", status: "done" },
  { key: "now", status: "current" },
];

/** Keys map to `caseStudies.bareeqX.result.links.<key>.{caption,label}`. */
export interface BareeqLink {
  key: "website" | "googlePlay" | "appStore";
  href: string;
  /** Logo in /public, shown at the start of the badge. */
  logo: string;
}

export const BAREEQ_LINKS: BareeqLink[] = [
  { key: "website", href: PROJECT_LINKS.bareeq.website, logo: "/images/Bareeq.svg" },
  { key: "googlePlay", href: PROJECT_LINKS.bareeq.googlePlay, logo: "/images/google-play.svg" },
  { key: "appStore", href: PROJECT_LINKS.bareeq.appStore, logo: "/images/app-store.svg" },
];
