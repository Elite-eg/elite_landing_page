import type { IconType } from "react-icons";
import { FiBox, FiFlag, FiMapPin } from "react-icons/fi";
import { LuChartColumn, LuReceipt, LuWallet } from "react-icons/lu";

/* ── Topics ──────────────────────────────────────────────────────────────────────────────── */

/** One taxonomy for the learning library (videos, knowledge base, articles), in display order. Names: `learn.topics.<key>`. */
export const LEARN_TOPICS = ["gettingStarted", "fieldSales", "collections", "warehouse", "eInvoicing", "reports"] as const;

export type LearnTopic = (typeof LEARN_TOPICS)[number];

export const LEARN_TOPIC_ICONS: Record<LearnTopic, IconType> = {
  gettingStarted: FiFlag,
  fieldSales: FiMapPin,
  collections: LuWallet,
  warehouse: FiBox,
  eInvoicing: LuReceipt,
  reports: LuChartColumn,
};

/** Value of a topic filter: one topic, or everything. */
export type TopicFilterValue = LearnTopic | "all";

/* ── Articles ────────────────────────────────────────────────────────────────────────────── */

export interface Article {
  /** Copy in `learn.articles.items.<key>` (title, excerpt). */
  key: string;
  topic: LearnTopic;
  /** Meta line in `learn.articles.types.<type>`. */
  type: "article" | "customerStory";
  /** Reading time. */
  minutes: number;
  /** Also teased under "From the field" on the community page. */
  community?: boolean;
}

/**
 * DRAFT SAMPLE / TBD: titles, excerpts and reading times until the owner's articles exist. The first three are the
 * community Figma's "From the field" teasers. No article has its own page yet, so the cards aren't linked.
 */
export const SAMPLE_ARTICLES: readonly Article[] = [
  { key: "custodySettlement", topic: "collections", type: "article", minutes: 5, community: true },
  { key: "distributorStory", topic: "collections", type: "customerStory", minutes: 6, community: true },
  { key: "smartRoute", topic: "fieldSales", type: "article", minutes: 4, community: true },
  { key: "eInvoicingMistakes", topic: "eInvoicing", type: "article", minutes: 7 },
  { key: "morningNumbers", topic: "reports", type: "article", minutes: 4 },
  { key: "vanStock", topic: "warehouse", type: "article", minutes: 5 },
  { key: "repTargets", topic: "fieldSales", type: "article", minutes: 6 },
  { key: "fromExcel", topic: "gettingStarted", type: "article", minutes: 8 },
];
