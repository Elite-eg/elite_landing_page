import type { IconType } from "react-icons";
import { FaWhatsapp } from "react-icons/fa6";
import { FiMail, FiPhone } from "react-icons/fi";
import type { ContactChannelTone } from "@/app/components/shared/ContactChannelCard";
import type { LearnTopic } from "@/app/components/shared/learn/learnData";

export interface KnowledgeTopic {
  /** Name in `learn.topics.<key>`, description in `learn.knowledgeBase.topics.items.<key>.description`. */
  key: LearnTopic;
  /** Article titles in `learn.knowledgeBase.topics.items.<key>.articles.<article>`, in display order. */
  articles: readonly string[];
}

/**
 * DRAFT SAMPLE / TBD: help article titles per topic until the owner's knowledge base exists. No article has its own
 * page yet, so the rows aren't linked.
 */
export const SAMPLE_KNOWLEDGE_TOPICS: readonly KnowledgeTopic[] = [
  { key: "gettingStarted", articles: ["companyProfile", "inviteUsers", "importData", "installApp"] },
  { key: "fieldSales", articles: ["visitPlan", "salesOrder", "priceLists", "repTargets"] },
  { key: "collections", articles: ["eReceipt", "custodyLimits", "dailySettlement", "cheques"] },
  { key: "warehouse", articles: ["stockTransfer", "stockCount", "returns", "deliveryRoute"] },
  { key: "eInvoicing", articles: ["egyptSetup", "saudiSetup", "itemCodes", "rejectedInvoices"] },
  { key: "reports", articles: ["dailyDashboard", "repPerformance", "customerBalances", "exportExcel"] },
];

/** Support channels under "Didn't find your answer?" (the SLA's channels). Copy: `learn.knowledgeBase.help.channels.<key>`. */
export interface SupportChannel {
  key: "whatsapp" | "phone" | "email";
  icon: IconType;
  tone: ContactChannelTone;
}

export const SUPPORT_CHANNELS: readonly SupportChannel[] = [
  { key: "whatsapp", icon: FaWhatsapp, tone: "whatsapp" },
  { key: "phone", icon: FiPhone, tone: "muted" },
  { key: "email", icon: FiMail, tone: "muted" },
];
