import { ROUTES } from "@/lib/constants";

/** Keys map to `policies.<key>` in messages. Add a policy here + its copy to get a new policy page. */
export type PolicyKey = "sla" | "refund";

/**
 * What a section shows under its title, each read from `policies.<policy>.sections.<section>.<block>`:
 * `text` a paragraph (rich text: <email>, <whatsapp>), `list` a string array, `table` a `PolicyTableContent`.
 */
export type PolicyBlock = "text" | "list" | "table";

/** Table copy in messages: header row + body rows. The first cell of each row labels it (plan, severity, …). */
export interface PolicyTableContent {
  columns: string[];
  rows: string[][];
}

export interface PolicySectionConfig {
  /** Key inside `policies.<policy>.sections`, also the section's anchor id (table of contents). */
  key: string;
  blocks: readonly PolicyBlock[];
}

export interface PolicyConfig {
  route: string;
  /** "Last updated" date (ISO, Cairo calendar day). */
  updatedAt: string;
  sections: readonly PolicySectionConfig[];
}

export const POLICIES: Record<PolicyKey, PolicyConfig> = {
  sla: {
    route: ROUTES.legal.sla,
    updatedAt: "2026-10-11",
    sections: [
      { key: "availability", blocks: ["text", "table"] },
      { key: "support", blocks: ["table"] },
      { key: "responseTimes", blocks: ["text", "table"] },
      { key: "maintenance", blocks: ["text"] },
      { key: "backup", blocks: ["text"] },
      { key: "credits", blocks: ["text", "table"] },
      { key: "exclusions", blocks: ["list"] },
    ],
  },
  refund: {
    route: ROUTES.legal.refund,
    updatedAt: "2026-10-11",
    sections: [
      { key: "freeTrial", blocks: ["text"] },
      { key: "monthly", blocks: ["list"] },
      { key: "annual", blocks: ["list"] },
      { key: "planChange", blocks: ["list"] },
      { key: "refundMethod", blocks: ["text"] },
      { key: "dataAfterCancel", blocks: ["text"] },
      { key: "customProjects", blocks: ["text"] },
      { key: "contact", blocks: ["text"] },
    ],
  },
};
