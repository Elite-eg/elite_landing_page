import type { IconType } from "react-icons";
import { LuDollarSign, LuGraduationCap, LuHeart, LuHouse } from "react-icons/lu";

/** Keys map to `jobs.openPositions.categories.<key>` (filter pills + the first meta item of each opening). */
export const JOB_CATEGORIES = ["engineering", "product", "design", "sales", "qa"] as const;
export type JobCategory = (typeof JOB_CATEGORIES)[number];

export interface JobOpening {
  /** Copy lives in messages: `jobs.positions.<id>.{title,summary,requirements}`. */
  id: string;
  category: JobCategory;
  /** Meta keys: `jobs.openPositions.locations.<location>`, `.workModes.<workMode>`, `.employmentTypes.<employmentType>`. */
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

/** Departments with at least one opening, in JOB_CATEGORIES order: a filter pill never leads to an empty list. */
export const OPEN_JOB_CATEGORIES: JobCategory[] = JOB_CATEGORIES.filter((category) =>
  OPEN_JOB_POSITIONS.some((job) => job.category === category)
);

/** Keys map to `jobs.howWeWork.<key>.{title,text}`. Order = reading order (start → end). */
export type HowWeWorkKey = "remoteEvaluation" | "fullTimeOffice" | "realProducts" | "modernStack";

export interface HowWeWorkItem {
  key: HowWeWorkKey;
  /** Lucide glyphs, the Figma's icon set (Feather has no graduation cap). */
  icon: IconType;
}

export const HOW_WE_WORK: HowWeWorkItem[] = [
  { key: "remoteEvaluation", icon: LuHouse },
  { key: "fullTimeOffice", icon: LuGraduationCap },
  { key: "realProducts", icon: LuDollarSign },
  { key: "modernStack", icon: LuHeart },
];
