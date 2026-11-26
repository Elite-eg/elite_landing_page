import { ROUTES } from "@/lib/constants";

/** Keys map to `guides.<key>` in messages. Add a guide here + its copy to get a new landing page. */
export type GuideKey = "collections" | "eInvoicing" | "serviceApp" | "installation";

export interface GuideConfig {
  route: string;
  /** Keys inside `guides.<key>.contents`, in display order. */
  contents: readonly string[];
}

export const GUIDES: Record<GuideKey, GuideConfig> = {
  collections: {
    route: ROUTES.learn.collections,
    contents: ["custody", "receipts", "dailyClose", "differences", "policyTemplate"],
  },
  eInvoicing: {
    route: ROUTES.learn.eInvoicing,
    contents: ["whoMustComply", "egyptVsSaudi", "requiredFields", "fieldInvoicing", "checklist"],
  },
  serviceApp: {
    route: ROUTES.learn.serviceAppGuide,
    contents: ["regulations", "paymentGateway", "costTimeline", "commonMistakes", "storeChecklist"],
  },
  installation: {
    route: ROUTES.developers.installation,
    contents: ["requirements", "setup", "mobileApp", "addons", "troubleshooting"],
  },
};
