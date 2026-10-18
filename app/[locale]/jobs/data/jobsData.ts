import type { IconType } from "react-icons";
import { FiBriefcase, FiCode, FiDollarSign, FiHome } from "react-icons/fi";

/** Keys map to `jobs.openPositions.categories.<key>` (filter pills + the first tag of each opening). */
export const JOB_CATEGORIES = ["engineering", "product", "design", "sales", "qa"] as const;
export type JobCategory = (typeof JOB_CATEGORIES)[number];

export interface JobOpening {
  /** Copy lives in messages: `jobs.positions.<id>.{title,summary,requirements}`. */
  id: string;
  category: JobCategory;
  /** Tag keys: `jobs.openPositions.locations.<location>`, `.workModes.<workMode>`, `.employmentTypes.<employmentType>`. */
  location: "cairo";
  workMode: "remoteThenOnsite" | "onsite";
  employmentType: "fullTime";
}

/** Open positions in display order. The hero badge counts this list. */
export const OPEN_JOB_POSITIONS: JobOpening[] = [
  { id: "senior-backend-engineer", category: "engineering", location: "cairo", workMode: "remoteThenOnsite", employmentType: "fullTime" },
  { id: "senior-frontend-engineer", category: "engineering", location: "cairo", workMode: "remoteThenOnsite", employmentType: "fullTime" },
  { id: "mobile-app-developer", category: "engineering", location: "cairo", workMode: "remoteThenOnsite", employmentType: "fullTime" },
  { id: "devops-cloud-engineer", category: "engineering", location: "cairo", workMode: "remoteThenOnsite", employmentType: "fullTime" },
  { id: "ui-ux-designer", category: "design", location: "cairo", workMode: "remoteThenOnsite", employmentType: "fullTime" },
  { id: "product-manager", category: "product", location: "cairo", workMode: "remoteThenOnsite", employmentType: "fullTime" },
  { id: "qa-automation-engineer", category: "qa", location: "cairo", workMode: "remoteThenOnsite", employmentType: "fullTime" },
  { id: "technical-sales-specialist", category: "sales", location: "cairo", workMode: "onsite", employmentType: "fullTime" },
  { id: "fullstack-developer", category: "engineering", location: "cairo", workMode: "remoteThenOnsite", employmentType: "fullTime" },
  { id: "ai-solutions-engineer", category: "engineering", location: "cairo", workMode: "remoteThenOnsite", employmentType: "fullTime" },
];

/** Keys map to `jobs.howWeWork.<key>.{title,subtitle}`. */
export type HowWeWorkKey = "card1" | "card2" | "card3" | "card4";

export interface HowWeWorkItem {
  key: HowWeWorkKey;
  icon: IconType;
  /** Shows the "Ask Maher" assistant badge under the text. */
  hasMaherBadge?: boolean;
}

export const HOW_WE_WORK: HowWeWorkItem[] = [
  { key: "card1", icon: FiBriefcase },
  { key: "card2", icon: FiHome },
  { key: "card3", icon: FiDollarSign },
  { key: "card4", icon: FiCode, hasMaherBadge: true },
];
