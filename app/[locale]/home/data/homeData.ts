import type { IconType } from "react-icons";
import {
  FiBox,
  FiCalendar,
  FiCheckSquare,
  FiClock,
  FiDollarSign,
  FiHexagon,
  FiLayers,
  FiMapPin,
  FiMonitor,
  FiPenTool,
  FiShoppingCart,
  FiSmartphone,
  FiTool,
  FiTrendingUp,
  FiTruck,
} from "react-icons/fi";
import {
  LuBot,
  LuBuilding2,
  LuCalculator,
  LuCar,
  LuChartColumn,
  LuFileDown,
  LuLightbulb,
  LuSparkles,
  LuSquareKanban,
  LuStore,
  LuWallet,
} from "react-icons/lu";
import { ROUTES } from "@/lib/constants";

/*
 * Home page (Figma v4 "Home · الرئيسية", node 14:25 in the copy). Keys, icons, links and config only: the copy
 * lives in messages under `home.*`. Lists run start → end (right → left in Arabic). Projects (cards, hero chips, the
 * stats count) come from `lib/projects.ts`.
 * Icons: Feather (react-icons/fi) where it has the Figma's Lucide glyph; Lucide (react-icons/lu) where Feather has
 * none (building, lightbulb, sparkles, wallet, bot, calculator, file-down, column chart, kanban, car, store).
 */

/* ── Hero ────────────────────────────────────────────────────────────────────────────────── */

export interface HeroPath {
  /** Copy: `home.hero.paths.<key>`. */
  key: "company" | "appIdea";
  icon: IconType;
  href: string;
  /** The orange card (the hero's main action). */
  featured?: boolean;
}

/** "Where do you start?" cards. */
export const HERO_PATHS: readonly HeroPath[] = [
  { key: "company", icon: LuBuilding2, href: ROUTES.albiruni.trial, featured: true },
  { key: "appIdea", icon: LuLightbulb, href: ROUTES.contact },
];

/* ── Team ────────────────────────────────────────────────────────────────────────────────── */

export type TeamPanelTone = "light" | "dark";

export interface TeamPanel {
  /** Copy: `home.team.panels.<key>` (title, description, points.<point>.{title,description}). */
  key: "operations" | "developers";
  tone: TeamPanelTone;
  points: readonly { key: string; icon: IconType }[];
}

/** Operations experts (white) and developers (navy), joined in the middle by "a system that fits your procedures". */
export const TEAM_PANELS: readonly TeamPanel[] = [
  {
    key: "operations",
    tone: "light",
    points: [
      { key: "finance", icon: FiDollarSign },
      { key: "procurement", icon: FiShoppingCart },
      { key: "fieldOps", icon: FiTruck },
    ],
  },
  {
    key: "developers",
    tone: "dark",
    points: [
      { key: "mobile", icon: FiSmartphone },
      { key: "web", icon: FiMonitor },
      { key: "ai", icon: LuSparkles },
    ],
  },
];

export const TEAM_JOIN_ICON: IconType = FiTrendingUp;

/* ── Problems → solutions ────────────────────────────────────────────────────────────────── */

/** Where an Albiruni feature runs: the mobile app (reps, employees) or the web dashboard (management). */
export type AppSurface = "mobile" | "web";

/** Legend chips beside the section title, start → end. */
export const APP_SURFACES: readonly AppSurface[] = ["mobile", "web"];

export interface PainPoint {
  /** Copy: `home.pains.items.<key>` (problem, solution, area). */
  key: "sales" | "collection" | "warehouse" | "attendance" | "approvals" | "reports";
  icon: IconType;
  surfaces: readonly AppSurface[];
}

export const PAIN_POINTS: readonly PainPoint[] = [
  { key: "sales", icon: FiMapPin, surfaces: ["mobile", "web"] },
  { key: "collection", icon: LuWallet, surfaces: ["mobile", "web"] },
  { key: "warehouse", icon: FiHexagon, surfaces: ["mobile", "web"] },
  { key: "attendance", icon: FiClock, surfaces: ["mobile", "web"] },
  { key: "approvals", icon: FiCheckSquare, surfaces: ["mobile"] },
  { key: "reports", icon: LuChartColumn, surfaces: ["web"] },
];

/* ── Services ────────────────────────────────────────────────────────────────────────────── */

export interface HomeService {
  /** Copy: `home.services.items.<key>`. */
  key: "consulting" | "web" | "mobile" | "erp" | "ai" | "uiux" | "data";
  icon: IconType;
}

/** Service cards: four on the first row, three on the second (desktop). Their count feeds the stats strip. */
export const HOME_SERVICES: readonly HomeService[] = [
  { key: "consulting", icon: FiLayers },
  { key: "web", icon: FiMonitor },
  { key: "mobile", icon: FiSmartphone },
  { key: "erp", icon: FiBox },
  { key: "ai", icon: LuBot },
  { key: "uiux", icon: FiPenTool },
  { key: "data", icon: LuChartColumn },
];

/** Cards on the first row from lg (the rest share the second row). */
export const SERVICES_FIRST_ROW = 4;

/* ── Albiruni apps ───────────────────────────────────────────────────────────────────────── */

/** Filter pills, after "all". Labels: `home.apps.filters.<key>`. */
export const APP_CATEGORIES = ["sales", "operations", "team", "finance"] as const;
export type AppCategory = (typeof APP_CATEGORIES)[number];
export type AppFilter = AppCategory | "all";
export const APP_FILTERS: readonly AppFilter[] = ["all", ...APP_CATEGORIES];

export interface PlatformApp {
  /** Copy: `home.apps.items.<key>` (name, description). */
  key: string;
  icon: IconType;
  /** TBD: the Figma has the filter pills but doesn't say which apps each one shows; this grouping is a proposal. */
  category: AppCategory;
}

export const PLATFORM_APPS: readonly PlatformApp[] = [
  { key: "sales", icon: FiTruck, category: "sales" },
  { key: "attendance", icon: FiClock, category: "team" },
  { key: "projects", icon: LuSquareKanban, category: "team" },
  { key: "maintenance", icon: FiTool, category: "operations" },
  { key: "warehouse", icon: FiBox, category: "operations" },
  { key: "delivery", icon: FiMapPin, category: "sales" },
  { key: "expenses", icon: LuWallet, category: "finance" },
  { key: "outlets", icon: LuStore, category: "sales" },
  { key: "fleet", icon: LuCar, category: "operations" },
  { key: "purchasing", icon: FiShoppingCart, category: "operations" },
  { key: "approvals", icon: FiCheckSquare, category: "team" },
  { key: "reports", icon: LuChartColumn, category: "finance" },
];

/** Apps named in the "+N more apps" line (names: `home.apps.moreItems.<key>`; N = this list's length). */
export const MORE_PLATFORM_APPS = ["assets", "training", "internalComms", "forms", "incentives", "selfService"] as const;

/* ── Next steps (free offers) ────────────────────────────────────────────────────────────── */

export interface NextStep {
  /** Copy: `home.nextSteps.items.<key>` (badge, title, description, action). */
  key: string;
  icon: IconType;
  href: string;
  featured?: boolean;
}

/** Three offers, then three PDF guides. The orange card is the section's main action. */
export const NEXT_STEPS: readonly NextStep[] = [
  { key: "projectRequest", icon: LuCalculator, href: ROUTES.contact, featured: true },
  { key: "diagnosticSession", icon: FiCalendar, href: ROUTES.bookSession },
  { key: "trial", icon: FiTrendingUp, href: ROUTES.albiruni.trial },
  { key: "serviceAppGuide", icon: LuFileDown, href: ROUTES.learn.serviceAppGuide },
  { key: "collectionsGuide", icon: LuFileDown, href: ROUTES.learn.collections },
  { key: "eInvoicingGuide", icon: LuFileDown, href: ROUTES.learn.eInvoicing },
];

/* ── Sectors ─────────────────────────────────────────────────────────────────────────────── */

export interface HomeSector {
  /** Name: `nav.sectorsItems.<key>` (header menu); copy: `home.sectors.items.<key>`. */
  key: keyof typeof ROUTES.sectors;
  icon: IconType;
}

/** Sector cards, each linking to its sector page (`ROUTES.sectors`, not built yet). */
export const HOME_SECTORS: readonly HomeSector[] = [
  { key: "distribution", icon: FiTruck },
  { key: "fieldSales", icon: FiMapPin },
  { key: "carService", icon: FiTool },
];

/* ── Process ─────────────────────────────────────────────────────────────────────────────── */

/** Steps in order, numbered 01–04 from their position. Copy: `home.process.steps.<key>`. */
export const PROCESS_STEPS = ["diagnosis", "design", "build", "operate"] as const;

/* ── Pricing teaser ──────────────────────────────────────────────────────────────────────── */

/** Feature lines per plan card, top → bottom. Copy: `home.pricing.plans.<plan>.features.<key>`. */
export const TEASER_PLAN_FEATURES = {
  basic: ["apps", "platforms", "support"],
  business: ["sectorApps", "expert", "prioritySupport"],
  enterprise: ["integrations", "hosting", "accountManager"],
} as const;

/* ── Stats strip ─────────────────────────────────────────────────────────────────────────── */

/** Stats after the intro line, start → end. Values come from data (founding year, service and project counts). */
export const HOME_STATS = ["founded", "services", "projects", "codeOwnership"] as const;
export type HomeStatKey = (typeof HOME_STATS)[number];
