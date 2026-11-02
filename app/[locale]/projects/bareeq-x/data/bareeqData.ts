import type { IconType } from "react-icons";
import { FiBarChart2, FiMapPin, FiMonitor, FiSmartphone } from "react-icons/fi";
import type { AppLink } from "@/app/components/shared/AppLinkBadge";
import { MEDIA, PROJECT_LINKS } from "@/lib/constants";

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

/** The project's public links, as badges: on the case study and its card on the projects page. */
export const BAREEQ_LINKS: AppLink[] = [
  { kind: "website", href: PROJECT_LINKS.bareeq.website, logo: MEDIA.bareeqLogo },
  { kind: "googlePlay", href: PROJECT_LINKS.bareeq.googlePlay },
  { kind: "appStore", href: PROJECT_LINKS.bareeq.appStore },
];
