import { ROUTES, type AgentKey } from "@/lib/constants";

/** Anchors the hero buttons scroll to. */
export const OUR_AGENT_ID = "our-agent";
export const AGENCY_FORM_ID = "agency-form";
export const OUR_AGENT_HREF = `${ROUTES.agents}#${OUR_AGENT_ID}`;
export const AGENCY_FORM_HREF = `${ROUTES.agents}#${AGENCY_FORM_ID}`;

/** What an agent does for its clients. Labels: `agents.ourAgent.services.<key>`. */
export type AgentService = "sales" | "installation" | "support";

export interface AlbiruniAgent {
  /** Copy: `agents.ourAgent.list.<key>`. Website, email and phone: AGENT_CONTACTS (lib/constants). */
  key: AgentKey;
  /** Logo tile from the Figma (its grey box and border are part of the file). */
  logo: string;
  services: readonly AgentService[];
}

export const ALBIRUNI_AGENTS: readonly AlbiruniAgent[] = [
  { key: "mharatAlcode", logo: "/images/agents/mharat-alcode.svg", services: ["sales", "installation", "support"] },
];

/** "Agency benefits" tiles. Copy: `agents.benefits.items.<key>`. */
export const AGENCY_BENEFITS = ["readyProduct", "earnings", "training", "territory"] as const;

/** "How to become an agent", in order. Copy: `agents.steps.items.<key>`. */
export const AGENCY_STEPS = ["apply", "intro", "contract", "launch"] as const;

/** Sales team ranges. Labels: `agents.form.salesTeamSizes.<key>`. TBD: owner to confirm the ranges. */
export const SALES_TEAM_SIZES = ["upTo5", "upTo20", "upTo50", "over50"] as const;

/** "Current business" (several can be picked). Labels: `agents.form.activityOptions.<key>`. */
export const BUSINESS_ACTIVITIES = ["it", "businessSoftware", "distribution", "consulting"] as const;

/** "Have you sold business management systems before?" Labels: `agents.form.erpExperienceOptions.<key>`. */
export const ERP_EXPERIENCE = ["yes", "no"] as const;
