/**
 * Every project the site shows, client work and our own Albiruni platform, in one place: its page, categories,
 * cover, images, public links, live-site preview and case-study details, plus which projects each page shows.
 * Pages read from here and never keep their own project data: the projects page, the project (case study) pages,
 * the home page and the footer.
 *
 * Paths stay in `ROUTES` (the one source of internal paths, also used by the header menu); a project's `href` points
 * there. Copy lives in messages: `projects.list.<key>` (name; wordmark, the name on covers and hero chips in the
 * visitor's language; the projects page copy), `home.projects.items.<key>` (home card copy), `caseStudies.<…>` (case
 * study pages).
 *
 * Adding a project: one entry in PROJECTS (its path in `ROUTES.projects`, its images in public/images), its copy in
 * `projects.list.<key>` (ar + en), then its key in the lists below where it should appear.
 */
import type { IconType } from "react-icons";
import { FiBarChart2, FiMapPin, FiMonitor, FiSmartphone } from "react-icons/fi";
import { ROUTES, type LocalizedText } from "./constants";

/* ── Types ───────────────────────────────────────────────────────────────────────────────── */

export type ProjectKey = "bareeq" | "amanCar" | "arfa" | "albiruni";

export type AppLinkKind = "website" | "googlePlay" | "appStore";

/** A product's public link (its website or a store listing), shown as an `AppLinkBadge` or a text link. */
export interface AppLink {
  kind: AppLinkKind;
  href: string;
  /** Website logo (a path in /public); a website without one shows a globe. Stores always show their own mark. */
  logo?: string;
}

/** Projects page filter. Keys map to `projects.filter.categories.<key>`; order = pill order after "all". */
export const PROJECT_CATEGORIES = ["mobile", "systems", "websites"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectFilterValue = ProjectCategory | "all";

/**
 * Cover colour: the client's identity where the design system has it (Bareeq teal), our own orange for Albiruni,
 * brand navy otherwise. It fills the cover and overlays the project photo, so the white wordmark stays readable.
 */
export type ProjectTone = "bareeq" | "navy" | "midnight" | "brand";

/** Code-drawn screens on the projects page cover: two app phones or a web dashboard. */
export type ProjectMockup = "phones" | "dashboard";

/** Case study timeline: "done" = teal check, "current" = orange (the ongoing phase). */
export type MilestoneStatus = "done" | "current";

/** The sections of a project page that come from data (copy in `caseStudies.<…>`, by the same keys). */
export interface CaseStudy {
  /** Hero tags: `hero.tags.<key>`. */
  tags: readonly string[];
  /** Hero facts: `hero.facts.<key>.{value,label}`. */
  facts: readonly string[];
  /** What we built: `solution.interfaces.<key>.{title,text}`. */
  interfaces: readonly { key: string; icon: IconType }[];
  /** Technologies: `solution.tech.<key>`. */
  tech: readonly string[];
  /** Milestones: `result.timeline.<key>.{date,title,text}`. */
  timeline: readonly { key: string; status: MilestoneStatus }[];
}

export interface Project {
  key: ProjectKey;
  /** The project's page (from `ROUTES`). TBD: the Aman Car and ARFA pages aren't built yet. */
  href: string;
  /** Projects page filter. */
  categories: readonly ProjectCategory[];
  cover: {
    tone: ProjectTone;
    mockup: ProjectMockup;
  };
  images: {
    /** Photo under the cover colour (projects page, home) and behind the case study hero. */
    photo?: string;
    /** The project's logo or mark. */
    logo?: string;
  };
  /** Public links only (website, store listings), in display order. */
  links: readonly AppLink[];
  /** The live site embedded on the project page, in the visitor's language. */
  preview?: LocalizedText;
  caseStudy?: CaseStudy;
}

/* ── Projects ────────────────────────────────────────────────────────────────────────────── */

const BAREEQ_LOGO = "/images/Bareeq.svg";

export const PROJECTS = {
  bareeq: {
    key: "bareeq",
    href: ROUTES.projects.bareeq,
    categories: ["mobile", "systems", "websites"],
    cover: { tone: "bareeq", mockup: "phones" },
    /** TBD: a clean photo (this one is a 1200×400 banner with its slogan and logo baked in; covers fade its sides). */
    images: { photo: "/images/hero-bareeq.jpeg", logo: BAREEQ_LOGO },
    links: [
      { kind: "website", href: "https://bareeqx.com", logo: BAREEQ_LOGO },
      /** TBD: Bareeq X Google Play listing (not linked from bareeqx.com yet). */
      { kind: "googlePlay", href: "https://play.google.com/store/apps" },
      /** TBD: Bareeq X App Store listing (not linked from bareeqx.com yet). */
      { kind: "appStore", href: "https://apps.apple.com/" },
    ],
    /** Needs bareeqx.com to allow framing (frame-ancestors). */
    preview: { ar: "https://bareeqx.com/ar", en: "https://bareeqx.com/en" },
    caseStudy: {
      tags: ["mobile", "web", "country", "live"],
      facts: ["duration", "interfaces", "stores"],
      interfaces: [
        { key: "website", icon: FiMonitor },
        { key: "customer", icon: FiSmartphone },
        { key: "agent", icon: FiMapPin },
        { key: "admin", icon: FiBarChart2 },
      ],
      tech: ["flutter", "nextjs", "tailwind", "laravel", "sql", "moyasar", "otp", "server"],
      timeline: [
        { key: "kickoff", status: "done" },
        { key: "launch", status: "done" },
        { key: "now", status: "current" },
      ],
    },
  },
  amanCar: {
    key: "amanCar",
    href: ROUTES.projects.amanCar,
    categories: ["systems"],
    cover: { tone: "navy", mockup: "dashboard" },
    /** TBD: photo from elitemsr.com (Figma note). */
    images: {},
    links: [],
  },
  arfa: {
    key: "arfa",
    href: ROUTES.projects.arfa,
    categories: ["websites"],
    cover: { tone: "midnight", mockup: "dashboard" },
    /** TBD: photo from elitemsr.com (Figma note). */
    images: {},
    links: [{ kind: "website", href: "https://arfa-sa.com" }],
  },
  albiruni: {
    key: "albiruni",
    href: ROUTES.albiruni.platform,
    categories: ["mobile", "systems"],
    cover: { tone: "brand", mockup: "dashboard" },
    /** TBD: a product photo for the cover. The mark is the dashboard mockup's logo. */
    images: { logo: "/images/albiruni-mark.svg" },
    links: [
      /** TBD: final Albiruni store listings. */
      { kind: "appStore", href: "https://apps.apple.com/" },
      { kind: "googlePlay", href: "https://play.google.com/store/apps" },
    ],
  },
} as const satisfies Record<ProjectKey, Project>;

/** The projects for a list of keys, in that order. */
export const projectsFor = (keys: readonly ProjectKey[]): Project[] => keys.map((key) => PROJECTS[key]);

/* ── Where each project appears ──────────────────────────────────────────────────────────── */

/** Projects page ("Our work", Figma "Work"), in display order. Its count is also the home stats strip figure. */
export const WORK_PROJECTS: readonly ProjectKey[] = ["bareeq", "amanCar", "arfa"];

/** Projects page filter pills: "all", then the categories at least one listed project has (never an empty list). */
export const WORK_PROJECT_FILTERS: readonly ProjectFilterValue[] = [
  "all",
  ...PROJECT_CATEGORIES.filter((category) =>
    projectsFor(WORK_PROJECTS).some((project) => project.categories.includes(category))
  ),
];

/**
 * Home project cards (Figma "Projects"), in display order. Each card links to the project's page (`href`); `linkTo`
 * sets its bottom row: "public" lists the project's public links (Bareeq X: site and stores), "page" names its page
 * (label `home.projects.items.<key>.link`).
 */
export const HOME_PROJECTS: readonly { key: ProjectKey; linkTo: "public" | "page" }[] = [
  { key: "bareeq", linkTo: "public" },
  { key: "amanCar", linkTo: "page" },
  { key: "albiruni", linkTo: "page" },
];

/** Client wordmarks in the home hero ("From our projects:"). */
export const HOME_PROOF_PROJECTS: readonly ProjectKey[] = ["bareeq", "arfa", "amanCar"];
