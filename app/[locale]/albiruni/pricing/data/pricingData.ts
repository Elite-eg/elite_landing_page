import type { IconType } from "react-icons";
import { FiShoppingBag, FiTool, FiTruck } from "react-icons/fi";
import type { CountryCode } from "@/lib/countries";

/* ── Step 1: sector ─────────────────────────────────────────────────────────── */

export type SectorKey = "distribution" | "fieldSales" | "carService";

export interface PricingSector {
  /** Name: `nav.sectorsItems.<key>` (same sectors as the header menu). */
  key: SectorKey;
  icon: IconType;
  /** Apps tuned for the sector (Figma). */
  appCount: number;
}

/** Sector cards, start → end. The first one is chosen when the page opens. */
export const PRICING_SECTORS: readonly PricingSector[] = [
  { key: "distribution", icon: FiTruck, appCount: 12 },
  { key: "fieldSales", icon: FiShoppingBag, appCount: 9 },
  { key: "carService", icon: FiTool, appCount: 8 },
];

/* ── Billing ────────────────────────────────────────────────────────────────── */

export type BillingCycle = "yearly" | "monthly";

/** Billing toggle options, start → end. The first one is chosen when the page opens. */
export const BILLING_CYCLES: readonly BillingCycle[] = ["yearly", "monthly"];

/** Yearly billing saves this share of the monthly price (the "Save 20%" chip). */
export const YEARLY_DISCOUNT = 0.2;

/* ── Step 2: plan ───────────────────────────────────────────────────────────── */

export type PlanKey = "basic" | "business" | "enterprise";

/** Plans with a listed price, which visitors can pick on this page (enterprise is priced on request). */
export type PricedPlanKey = Exclude<PlanKey, "enterprise">;

export const isPricedPlan = (key: PlanKey): key is PricedPlanKey => key !== "enterprise";

/**
 * One plan card. Its button follows from the data: priced on request → request a quote (contact page),
 * featured → start the free trial, otherwise → choose it and go on to the apps step.
 */
export interface PricingPlan {
  /** Copy: `albiruniPricing.plans.<key>`. */
  key: PlanKey;
  /** Users included ("up to"); for enterprise the number it starts above. */
  users: number;
  /** Apps the plan includes. No limit = every app. */
  appLimit?: number;
  /** Navy "most popular" card. Its description and features change with the sector (`plans.<key>.sectors.<sector>`). */
  featured?: boolean;
}

/** Plan cards, start → end. */
export const PRICING_PLANS: readonly PricingPlan[] = [
  { key: "basic", users: 5, appLimit: 3 },
  { key: "business", users: 25, featured: true },
  { key: "enterprise", users: 25 },
];

/** The plan the apps step starts with (Figma: the cart shows Business). */
export const DEFAULT_PLAN: PricedPlanKey = "business";

export const planByKey = (key: PlanKey): PricingPlan =>
  PRICING_PLANS.find((plan) => plan.key === key) ?? PRICING_PLANS[0];

/**
 * DRAFT SAMPLE / TBD: Albiruni pricing is not confirmed yet (open item 3 in elite-design-rules.txt).
 * Monthly price per plan when billed yearly, before VAT, in the country's currency.
 * EG = the Figma's preliminary prices; SA = placeholder at the draft checkout's EG:SA ratio (5:1).
 */
export const SAMPLE_PLAN_PRICES: Record<CountryCode, Record<PricedPlanKey, number>> = {
  EG: { basic: 1500, business: 4500 },
  SA: { basic: 300, business: 900 },
};

/** Monthly price of a plan: yearly billing as listed, monthly billing without the yearly discount. */
export function planMonthlyPrice(country: CountryCode, plan: PricedPlanKey, billing: BillingCycle): number {
  const yearlyPrice = SAMPLE_PLAN_PRICES[country][plan];
  return billing === "yearly" ? yearlyPrice : Math.round(yearlyPrice / (1 - YEARLY_DISCOUNT));
}

/* ── Step 3: apps ───────────────────────────────────────────────────────────── */

export type AlbiruniAppKey =
  | "attendance"
  | "maintenance"
  | "fleet"
  | "purchasing"
  | "expenses"
  | "reports"
  | "outlets"
  | "training";

/** App cards, start → end. Copy: `albiruniPricing.apps.items.<key>`. */
export const ALBIRUNI_APPS: readonly AlbiruniAppKey[] = [
  "attendance",
  "maintenance",
  "fleet",
  "purchasing",
  "expenses",
  "reports",
  "outlets",
  "training",
];

/** Apps already added when the page opens (Figma). */
export const DEFAULT_APPS: readonly AlbiruniAppKey[] = ["attendance", "fleet"];

/** The apps step: picking the Basic plan scrolls here. */
export const PRICING_APPS_ID = "apps";

/* ── Compare plans ──────────────────────────────────────────────────────────── */

/** "text" = `compare.rows.<row>.<plan>`, "check" = included, "none" = not included. */
export type CompareCellKind = "text" | "check" | "none";

export interface CompareRow {
  /** Label: `albiruniPricing.compare.rows.<key>.label`. */
  key: "users" | "price" | "appCount" | "mobileWeb" | "customReports" | "support" | "privateHosting" | "api";
  cells: Record<PlanKey, CompareCellKind>;
}

export interface CompareGroup {
  /** Group header row: `albiruniPricing.compare.groups.<title>`. The first group has none. */
  title?: "apps" | "reports" | "support";
  rows: readonly CompareRow[];
}

const ALL_TEXT = { basic: "text", business: "text", enterprise: "text" } as const;
const ALL_CHECK = { basic: "check", business: "check", enterprise: "check" } as const;

/** Comparison table, top → bottom. Columns follow PRICING_PLANS. */
export const COMPARE_GROUPS: readonly CompareGroup[] = [
  {
    rows: [
      { key: "users", cells: ALL_TEXT },
      { key: "price", cells: ALL_TEXT },
    ],
  },
  {
    title: "apps",
    rows: [
      { key: "appCount", cells: ALL_TEXT },
      { key: "mobileWeb", cells: ALL_CHECK },
    ],
  },
  {
    title: "reports",
    rows: [{ key: "customReports", cells: { basic: "none", business: "text", enterprise: "text" } }],
  },
  {
    title: "support",
    rows: [
      { key: "support", cells: ALL_TEXT },
      { key: "privateHosting", cells: { basic: "none", business: "none", enterprise: "check" } },
      { key: "api", cells: { basic: "none", business: "check", enterprise: "check" } },
    ],
  },
];

/* ── FAQ ────────────────────────────────────────────────────────────────────── */

/** Questions, top → bottom. Copy: `albiruniPricing.faq.items.<key>`. The first one opens with the page. */
export const PRICING_FAQ = ["currency", "trial", "onboarding", "security", "addApps"] as const;
