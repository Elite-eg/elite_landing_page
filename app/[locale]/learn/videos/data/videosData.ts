import type { LearnTopic } from "@/app/components/shared/learn/learnData";

export interface TutorialVideo {
  /** Title in `learn.videos.items.<key>`. */
  key: string;
  topic: LearnTopic;
  /** Length in seconds. */
  duration: number;
}

/**
 * DRAFT SAMPLE / TBD: titles and lengths until the owner's tutorial videos exist. There are no video links yet
 * (no YouTube channel in SOCIAL_LINKS), so the cards aren't linked.
 */
export const SAMPLE_VIDEOS: readonly TutorialVideo[] = [
  { key: "companySetup", topic: "gettingStarted", duration: 412 },
  { key: "inviteUsers", topic: "gettingStarted", duration: 245 },
  { key: "repApp", topic: "fieldSales", duration: 380 },
  { key: "visitPlan", topic: "fieldSales", duration: 334 },
  { key: "salesOrder", topic: "fieldSales", duration: 296 },
  { key: "collectPayment", topic: "collections", duration: 271 },
  { key: "dailySettlement", topic: "collections", duration: 455 },
  { key: "stockTransfer", topic: "warehouse", duration: 352 },
  { key: "deliveryRoutes", topic: "warehouse", duration: 398 },
  { key: "eInvoiceSetup", topic: "eInvoicing", duration: 521 },
  { key: "salesDashboard", topic: "reports", duration: 309 },
  { key: "repPerformance", topic: "reports", duration: 284 },
];
