/**
 * Single source of truth for company data, navigation and external links.
 * Values marked TBD still need owner confirmation (see elite-design-rules.txt, "Open items").
 */

import type { IconType } from "react-icons";
import { FiHeadphones, FiLogIn, FiMapPin, FiTool, FiTruck } from "react-icons/fi";
import type { routing } from "@/i18n/routing";

/** "ar" | "en", derived from the next-intl routing config so the locale list lives in one place. */
export type AppLocale = (typeof routing.locales)[number];

export interface LocalizedText {
  ar: string;
  en: string;
}

export const COMPANY_INFO = {
  /** Official Arabic spelling is TBD (إيليت تك vs إليت تك). Change it here only. */
  brandName: { ar: "إيليت تك", en: "Elite Tech" } satisfies LocalizedText,
  legalName: { ar: "إيليت تك لتقنية المعلومات", en: "Elite Tech IT" } satisfies LocalizedText,
  /** Fixed Latin wordmark shown next to the logo mark in both locales (Poppins). */
  wordmark: { primary: "Elite", accent: "Tech" },
  /** The Arabic lines wrap the Latin building code in an LTR isolate (U+2066 … U+2069), so it reads 9/H/5, not H/5/9. */
  address: {
    ar: "\u20669/H/5\u2069 قسم اللاسلكي، شارع أحمد عبد العظيم، بجوار شارع النصر الرئيسي، المعادي، القاهرة",
    en: "9/H/5 El-Laselky Division, Ahmed Abdel Azim St., Off Main El-Nasr St., Maadi, Cairo",
  } satisfies LocalizedText,
  /** Compact address used in the footer. */
  addressShort: {
    ar: "تقسيم اللاسلكي، المعادي، القاهرة \u20669/H/5\u2069",
    en: "9/H/5 El-Laselky Division, Maadi, Cairo",
  } satisfies LocalizedText,
  commercialRegister: "290259",
  phones: ["+20 113 134 0647", "+20 103 436 0644"],
  whatsappPhone: "201131340647",
  email: "info@elitemsr.com",
} as const;

/**
 * Company time zone. Booking slots are in Cairo time, and the server and the browser both format
 * dates in this zone, so the rendered markup never differs between them (no hydration mismatch).
 */
export const APP_TIME_ZONE = "Africa/Cairo";

/** WhatsApp chat with the company number, optionally with a prefilled (already translated) message. */
export const whatsappUrl = (text?: string) =>
  `https://wa.me/${COMPANY_INFO.whatsappPhone}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Direct WhatsApp chat with the company number. */
export const WHATSAPP_URL = whatsappUrl();

/** The WhatsApp number as displayed (the matching entry of COMPANY_INFO.phones). */
export const WHATSAPP_DISPLAY_PHONE =
  COMPANY_INFO.phones.find((phone) => phone.replace(/\D/g, "") === COMPANY_INFO.whatsappPhone) ??
  `+${COMPANY_INFO.whatsappPhone}`;

/** Click-to-call link for a displayed phone number ("+20 113 134 0647" → "tel:+201131340647"). */
export const telUrl = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

export const EMAIL_URL = `mailto:${COMPANY_INFO.email}`;

/** TBD: the office's own Google Maps place link. Until then, a Maps search for the official address. */
export const COMPANY_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address.en)}`;

/** Live community platform. Used until the (community) route group is built. */
export const COMMUNITY_URLS = {
  home: "https://community.elitemsr.com",
  register: "https://community.elitemsr.com/register",
  login: "https://community.elitemsr.com/login",
  ideas: "https://community.elitemsr.com/ideas",
  jobs: "https://community.elitemsr.com/jobs",
  about: "https://community.elitemsr.com/about",
} as const;

export const MEDIA = {
  heroVideo: "/videos/hero.mp4",
  heroPoster: "/images/hero-office.png",
  enterprise: "/images/enterprise-meeting.png",
  community: "/images/community-meetup.png",
  product: "/images/mobile-web-product.png",
  mentoring: "/images/mentoring-session.png",
} as const;

export const API_ENDPOINTS = {
  /** TBD: backend endpoint for newsletter sign-ups. */
  newsletter: "/newsletter/subscribe",
  /** TBD: backend endpoint that sends a free PDF guide to the visitor's WhatsApp. */
  guideRequest: "/guides/request",
  /** TBD: backend endpoint that books a diagnostic session (book-session widget). */
  bookSession: "/sessions/book",
  /** TBD: backend endpoint that receives job applications (jobs page modal). */
  jobApplication: "/jobs/apply",
  /** TBD: backend endpoint that receives contact requests (contact page form). */
  contactRequest: "/contact/request",
} as const;

/* ─────────────────────────────────────────────────────────────────────────
 * Routing — the ONLY place header and footer paths are defined.
 * Pages marked TBD are not built yet (they fall through to not-found).
 * ───────────────────────────────────────────────────────────────────────── */

export const ROUTES = {
  home: "/home",
  about: "/about",
  jobs: "/jobs",
  bookSession: "/book-session",
  contact: "/contact",
  support: "/contact",
  partners: "/partners",
  agents: "/agents",
  solutions: {
    all: "/solutions",
    consulting: "/solutions/consulting",
    web: "/solutions/web-apps",
    mobile: "/solutions/mobile-apps",
    erp: "/solutions/erp-systems",
    ai: "/solutions/ai-automation",
  },
  sectors: {
    distribution: "/sectors/distribution",
    fieldSales: "/sectors/field-sales",
    carService: "/sectors/car-service-centers",
  },
  projects: {
    all: "/projects",
    bareeq: "/projects/bareeq-x",
    amanCar: "/projects/aman-car",
    arfa: "/projects/arfa",
  },
  albiruni: {
    platform: "/albiruni",
    pricing: "/albiruni/pricing",
    addons: "/albiruni/add-ons",
    trial: "/albiruni/free-trial",
  },
  learn: {
    collections: "/learn/collections-guide",
    eInvoicing: "/learn/e-invoicing-guide",
    videos: "/learn/videos",
    knowledgeBase: "/learn/knowledge-base",
    articles: "/learn/articles",
  },
  developers: {
    register: "/developers/register",
    downloads: "/developers/downloads",
    installation: "/developers/installation-guide",
    apiDocs: "/developers/add-on-api",
  },
  legal: {
    privacy: "/privacy",
    terms: "/terms",
    cookies: "/cookie-settings",
    sla: "/sla",
    refund: "/refund-policy",
  },
} as const;

export interface NavItem {
  /** Key inside the "nav" messages namespace (dot paths allowed, e.g. "solutionsItems.web"). */
  labelKey: string;
  href: string;
  external?: boolean;
  /** Optional secondary line (mega menu), key inside "nav". */
  descriptionKey?: string;
  /** Optional icon tile (mega menu). */
  icon?: IconType;
}

export interface MegaMenuSection {
  /** Small heading above the column, key inside "nav". */
  titleKey: string;
  items: readonly NavItem[];
  /** Trailing "see all" link. */
  moreLink?: NavItem;
}

export interface MegaMenuPromo {
  titleKey: string;
  textKey: string;
  cta: NavItem;
}

export interface MegaMenu {
  sections: readonly MegaMenuSection[];
  promo: MegaMenuPromo;
}

export type HeaderNavEntry =
  | ({ type: "link" } & NavItem)
  | { type: "mega"; labelKey: string; menu: MegaMenu };

export const COMMUNITY_NAV_ITEM: NavItem = { labelKey: "community", href: COMMUNITY_URLS.home, external: true };

export const SOLUTIONS_NAV_ITEMS: readonly NavItem[] = [
  { labelKey: "solutionsItems.consulting", href: ROUTES.solutions.consulting },
  { labelKey: "solutionsItems.web", href: ROUTES.solutions.web },
  { labelKey: "solutionsItems.mobile", href: ROUTES.solutions.mobile },
  { labelKey: "solutionsItems.erp", href: ROUTES.solutions.erp },
  { labelKey: "solutionsItems.ai", href: ROUTES.solutions.ai },
];

export const SECTORS_NAV_ITEMS: readonly NavItem[] = [
  {
    labelKey: "sectorsItems.distribution",
    descriptionKey: "sectorsDescriptions.distribution",
    href: ROUTES.sectors.distribution,
    icon: FiTruck,
  },
  {
    labelKey: "sectorsItems.fieldSales",
    descriptionKey: "sectorsDescriptions.fieldSales",
    href: ROUTES.sectors.fieldSales,
    icon: FiMapPin,
  },
  {
    labelKey: "sectorsItems.carService",
    descriptionKey: "sectorsDescriptions.carService",
    href: ROUTES.sectors.carService,
    icon: FiTool,
  },
];

export const ALBIRUNI_NAV_ITEMS: readonly NavItem[] = [
  { labelKey: "albiruniSystem", descriptionKey: "productsDescriptions.albiruni", href: ROUTES.albiruni.platform },
  { labelKey: "pricing", descriptionKey: "productsDescriptions.pricing", href: ROUTES.albiruni.pricing },
  { labelKey: "addonsStore", descriptionKey: "productsDescriptions.addons", href: ROUTES.albiruni.addons },
];

export const PROJECTS_NAV_ITEMS: readonly NavItem[] = [
  { labelKey: "projectsItems.bareeq", descriptionKey: "projectsDescriptions.bareeq", href: ROUTES.projects.bareeq },
  { labelKey: "projectsItems.amanCar", descriptionKey: "projectsDescriptions.amanCar", href: ROUTES.projects.amanCar },
  { labelKey: "projectsItems.arfa", descriptionKey: "projectsDescriptions.arfa", href: ROUTES.projects.arfa },
];

export const SOLUTIONS_MEGA_MENU: MegaMenu = {
  sections: [
    { titleKey: "megaMenu.bySector", items: SECTORS_NAV_ITEMS },
    { titleKey: "megaMenu.byService", items: SOLUTIONS_NAV_ITEMS },
  ],
  promo: {
    titleKey: "megaMenu.solutionsPromo.title",
    textKey: "megaMenu.solutionsPromo.text",
    cta: { labelKey: "megaMenu.solutionsPromo.cta", href: ROUTES.bookSession },
  },
};

export const PRODUCTS_MEGA_MENU: MegaMenu = {
  sections: [
    { titleKey: "megaMenu.ourProducts", items: ALBIRUNI_NAV_ITEMS },
    {
      titleKey: "megaMenu.projects",
      items: PROJECTS_NAV_ITEMS,
      moreLink: { labelKey: "megaMenu.allProjects", href: ROUTES.projects.all },
    },
  ],
  promo: {
    titleKey: "megaMenu.productsPromo.title",
    textKey: "megaMenu.productsPromo.text",
    cta: { labelKey: "megaMenu.productsPromo.cta", href: ROUTES.albiruni.trial },
  },
};

/** Main header navigation (desktop bar + mobile drawer), in display order. */
export const NAV_LINKS: readonly HeaderNavEntry[] = [
  { type: "link", labelKey: "home", href: ROUTES.home },
  { type: "mega", labelKey: "solutionsDropdown", menu: SOLUTIONS_MEGA_MENU },
  { type: "mega", labelKey: "productsDropdown", menu: PRODUCTS_MEGA_MENU },
  { type: "link", labelKey: "agents", href: ROUTES.agents },
  { type: "link", labelKey: "about", href: ROUTES.about },
];

/** Primary header CTA (the only orange action in the header). */
export const HEADER_CTA: NavItem = { labelKey: "bookDiagnosticCta", href: ROUTES.bookSession };

/** Header top bar utility links (start side). */
export const HEADER_UTILITY_LINKS: readonly NavItem[] = [
  COMMUNITY_NAV_ITEM,
  { labelKey: "jobs", href: ROUTES.jobs },
  { labelKey: "contact", href: ROUTES.contact },
];

/** Header top bar account links (end side), in reading order after the language toggle. */
export const HEADER_ACCOUNT_LINKS: readonly NavItem[] = [
  { labelKey: "support", href: ROUTES.support, icon: FiHeadphones },
  { labelKey: "login", href: COMMUNITY_URLS.login, external: true, icon: FiLogIn },
];

/**
 * Country / currency options for the header switcher. Prices read the "region" cookie.
 * `dialCode` and `mobile` drive phone fields (lib/phone.ts): the mobile number after the dial code (no leading 0) has
 * `length` digits, shown in `groups`. Which digits are valid is checked by PATTERNS.mobile (lib/validation.ts).
 */
export const REGIONS = [
  { code: "EG", currency: "EGP", dialCode: "+20", mobile: { length: 10, groups: [2, 4, 4], placeholder: "1X XXXX XXXX" } },
  { code: "SA", currency: "SAR", dialCode: "+966", mobile: { length: 9, groups: [2, 3, 4], placeholder: "5X XXX XXXX" } },
] as const;

export type RegionCode = (typeof REGIONS)[number]["code"];
export const DEFAULT_REGION: RegionCode = "EG";

/** Region codes as a tuple, for z.enum(). */
export const REGION_CODES = REGIONS.map(({ code }) => code) as [RegionCode, ...RegionCode[]];

/** Region entry for a code (dial code, currency, phone example). */
export const regionByCode = (code: RegionCode) => REGIONS.find((region) => region.code === code) ?? REGIONS[0];
export const REGION_COOKIE = "region";

export interface FooterNavGroup {
  /** Key inside "nav.groups". */
  key: "albiruni" | "solutions" | "learn" | "developers" | "company";
  items: readonly NavItem[];
}

export const FOOTER_NAV_GROUPS: readonly FooterNavGroup[] = [
  {
    key: "albiruni",
    items: [
      { labelKey: "albiruniItems.platform", href: ROUTES.albiruni.platform },
      { labelKey: "albiruniItems.pricing", href: ROUTES.albiruni.pricing },
      { labelKey: "albiruniItems.addons", href: ROUTES.albiruni.addons },
      { labelKey: "albiruniItems.trial", href: ROUTES.albiruni.trial },
    ],
  },
  { key: "solutions", items: SOLUTIONS_NAV_ITEMS },
  {
    key: "learn",
    items: [
      { labelKey: "learnItems.collections", href: ROUTES.learn.collections },
      { labelKey: "learnItems.eInvoicing", href: ROUTES.learn.eInvoicing },
      { labelKey: "learnItems.videos", href: ROUTES.learn.videos },
      { labelKey: "learnItems.knowledgeBase", href: ROUTES.learn.knowledgeBase },
      { labelKey: "learnItems.articles", href: ROUTES.learn.articles },
    ],
  },
  {
    key: "developers",
    items: [
      { labelKey: "developersItems.register", href: ROUTES.developers.register },
      { labelKey: "developersItems.downloads", href: ROUTES.developers.downloads },
      { labelKey: "developersItems.installation", href: ROUTES.developers.installation },
      { labelKey: "developersItems.apiDocs", href: ROUTES.developers.apiDocs },
    ],
  },
  {
    key: "company",
    items: [
      { labelKey: "companyItems.about", href: ROUTES.about },
      { labelKey: "companyItems.ourWork", href: ROUTES.projects.all },
      { labelKey: "companyItems.partners", href: ROUTES.partners },
      { labelKey: "companyItems.agents", href: ROUTES.agents },
      COMMUNITY_NAV_ITEM,
      { labelKey: "jobs", href: ROUTES.jobs },
      { labelKey: "contact", href: ROUTES.contact },
    ],
  },
];

export const LEGAL_NAV_ITEMS: readonly NavItem[] = [
  { labelKey: "legalItems.privacy", href: ROUTES.legal.privacy },
  { labelKey: "legalItems.terms", href: ROUTES.legal.terms },
  { labelKey: "legalItems.cookies", href: ROUTES.legal.cookies },
  { labelKey: "legalItems.sla", href: ROUTES.legal.sla },
  { labelKey: "legalItems.refund", href: ROUTES.legal.refund },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/elitemsr" },
  { label: "LinkedIn", href: "https://linkedin.com/company/elitemsr" },
  { label: "Instagram", href: "https://instagram.com/elitemsr" },
  { label: "TikTok", href: "https://tiktok.com/@elitemsr" },
] as const;

/** TBD: final Albiruni store listings. */
export const ALBIRUNI_APP_LINKS = {
  appStore: "https://apps.apple.com/",
  googlePlay: "https://play.google.com/store/apps",
} as const;

/** Public links of client projects shown on case study pages. */
export const PROJECT_LINKS = {
  bareeq: {
    website: "https://bareeqx.com",
    /** Embedded on the case study, in the visitor's language. Needs bareeqx.com to allow framing (frame-ancestors). */
    preview: { ar: "https://bareeqx.com/ar", en: "https://bareeqx.com/en" },
    /** TBD: Bareeq X App Store listing (not linked from bareeqx.com yet). */
    appStore: "https://apps.apple.com/",
    /** TBD: Bareeq X Google Play listing (not linked from bareeqx.com yet). */
    googlePlay: "https://play.google.com/store/apps",
  },
} as const;

/** Kept for page sections that link to the contact page. */
export const CONTACT_HREF = ROUTES.contact;

/** Anchor of the open positions list on the jobs page (id set in OpenPositionsSection). */
export const JOBS_OPEN_POSITIONS_ID = "open-positions";
export const JOBS_OPEN_POSITIONS_HREF = `${ROUTES.jobs}#${JOBS_OPEN_POSITIONS_ID}`;

/** Technologies named on elitemsr.com/our-services and in community idea stacks. */
export const TECH_STACK: string[] = [
  "Laravel",
  "React",
  "Next.js",
  "Flutter",
  "Odoo",
  "ERPNext",
  "Python",
  "Django",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
  "OpenAI API",
  "Figma",
];
