import { ROUTES, type AppLocale } from "./constants";
import type { CountryCode } from "./countries";

/**
 * Albiruni add-ons store: the shapes the store and add-on pages work with, the store's taxonomy and its URL query.
 * The data itself comes from `app/services/addons/addonsService.ts` (sample data until the backend exists).
 */

/* ── Taxonomy ───────────────────────────────────────────────────────────────────────────── */

/** Store categories in display order (category pills, breadcrumb). Names: `addons.categories.<key>`. */
export const ADDON_CATEGORIES = ["sales", "inventory", "accounting", "hr", "reports", "integrations", "sectorTools"] as const;

export type AddonCategory = (typeof ADDON_CATEGORIES)[number];

/** Albiruni releases an add-on can support, newest first. */
export const ALBIRUNI_VERSIONS = ["2.4", "2.3"] as const;

export type AlbiruniVersion = (typeof ALBIRUNI_VERSIONS)[number];

/** Sectors an add-on is made for: the header menu's sectors (names: `nav.sectorsItems.<key>`). */
export type AddonSector = keyof typeof ROUTES.sectors;

export const ADDON_SECTORS = Object.keys(ROUTES.sectors) as AddonSector[];

/** Tile colour behind an add-on's initials (until add-ons have their own icons). */
export type AddonIconTone = "primary" | "primaryDark" | "secondary" | "secondaryDark" | "accent" | "success" | "albiruni" | "ink";

/** License an add-on is sold under. Names: `addons.details.licenses.<key>`. */
export type AddonLicense = "singleCompany";

/* ── What the service returns (texts already in the visitor's language) ─────────────────── */

/** Price per country before VAT, in the country's currency; null = free. */
export type AddonPrice = Record<CountryCode, number> | null;

export interface AddonDeveloper {
  id: string;
  name: string;
  /** Published by the company itself ("Official"); every other developer is a certified partner. */
  official: boolean;
}

export interface AddonIconStyle {
  initials: string;
  tone: AddonIconTone;
}

/** One store card. */
export interface AddonSummary {
  slug: string;
  name: string;
  summary: string;
  category: AddonCategory;
  developer: AddonDeveloper;
  icon: AddonIconStyle;
  price: AddonPrice;
  /** Average rating out of 5, one decimal. */
  rating: number;
  reviewCount: number;
  installs: number;
}

/** A gallery item. No files yet: the frames are drawn as placeholders. */
export type AddonMedia = { kind: "video"; /** Seconds. */ duration: number } | { kind: "image" };

/** Number of reviews per star rating, 5 stars first. */
export type AddonRatingBreakdown = readonly [number, number, number, number, number];

export interface AddonReview {
  id: string;
  author: string;
  company: string;
  /** Stars out of 5. */
  rating: number;
  text: string;
}

export interface AddonRelease {
  version: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  notes: string[];
}

/** Everything the add-on page shows. */
export interface AddonDetails extends AddonSummary {
  description: string;
  features: string[];
  installSteps: string[];
  /** What buying (or installing, when free) gives the customer. */
  includes: string[];
  version: string;
  /** ISO date (YYYY-MM-DD) of the latest release. */
  updatedAt: string;
  versions: AlbiruniVersion[];
  sectors: AddonSector[];
  languages: AppLocale[];
  license: AddonLicense;
  media: AddonMedia[];
  ratingBreakdown: AddonRatingBreakdown;
  reviews: AddonReview[];
  /** Newest release first. */
  changelog: AddonRelease[];
}

/** One page of store results. */
export interface AddonsPage {
  items: AddonSummary[];
  /** Results for the whole query (all pages). */
  total: number;
  page: number;
  pageCount: number;
  /** Results per category for the query without its category ("all" = every category). */
  categoryCounts: Record<AddonCategory | "all", number>;
  /** Developer filter options. */
  developers: AddonDeveloper[];
}

/* ── Store query (the URL's search params) ──────────────────────────────────────────────── */

/** Sort options; the first is the default. Names: `addons.filters.sort.options.<key>`. */
export const ADDON_SORTS = ["popular", "rating", "newest"] as const;
export type AddonSort = (typeof ADDON_SORTS)[number];

export const ADDON_PRICE_FILTERS = ["all", "free", "paid"] as const;
export type AddonPriceFilter = (typeof ADDON_PRICE_FILTERS)[number];

export const ADDON_RATING_FILTERS = ["all", "above45", "above4"] as const;
export type AddonRatingFilter = (typeof ADDON_RATING_FILTERS)[number];

/** Lowest average rating each rating filter keeps. */
export const ADDON_RATING_MINIMUM: Record<Exclude<AddonRatingFilter, "all">, number> = { above45: 4.5, above4: 4 };

export interface AddonsQuery {
  /** Search text. */
  q: string;
  category: AddonCategory | "all";
  sector: AddonSector | "all";
  version: AlbiruniVersion | "all";
  /** A developer id, or "all". */
  developer: string;
  price: AddonPriceFilter;
  rating: AddonRatingFilter;
  sort: AddonSort;
  page: number;
}

export const DEFAULT_ADDONS_QUERY: AddonsQuery = {
  q: "",
  category: "all",
  sector: "all",
  version: "all",
  developer: "all",
  price: "all",
  rating: "all",
  sort: "popular",
  page: 1,
};

/** Cards per store page (three rows of three, as in the Figma). */
export const ADDONS_PAGE_SIZE = 9;

/** Longest search text kept from the URL. */
const MAX_SEARCH_LENGTH = 100;

type SearchParams = Record<string, string | string[] | undefined>;

const oneOf = <T extends string>(value: string | undefined, allowed: readonly T[], fallback: T): T =>
  allowed.find((option) => option === value) ?? fallback;

/** Reads the store query from the URL; anything unknown falls back to its default. */
export function parseAddonsQuery(params: SearchParams): AddonsQuery {
  const get = (key: keyof AddonsQuery) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };
  const page = Number.parseInt(get("page") ?? "", 10);

  return {
    q: (get("q") ?? "").trim().slice(0, MAX_SEARCH_LENGTH),
    category: oneOf(get("category"), ["all", ...ADDON_CATEGORIES], "all"),
    sector: oneOf(get("sector"), ["all", ...ADDON_SECTORS], "all"),
    version: oneOf(get("version"), ["all", ...ALBIRUNI_VERSIONS], "all"),
    developer: get("developer")?.trim() || "all",
    price: oneOf(get("price"), ADDON_PRICE_FILTERS, "all"),
    rating: oneOf(get("rating"), ADDON_RATING_FILTERS, "all"),
    sort: oneOf(get("sort"), ADDON_SORTS, "popular"),
    page: Number.isFinite(page) && page > 1 ? page : 1,
  };
}

/** Store URL for a query. Only values that differ from the defaults go into the search string. */
export function addonsStoreHref(query: Partial<AddonsQuery> = {}): string {
  const params = new URLSearchParams();
  const full: AddonsQuery = { ...DEFAULT_ADDONS_QUERY, ...query };

  for (const key of Object.keys(DEFAULT_ADDONS_QUERY) as (keyof AddonsQuery)[]) {
    if (full[key] !== DEFAULT_ADDONS_QUERY[key]) params.set(key, String(full[key]));
  }

  const search = params.toString();
  return search ? `${ROUTES.albiruni.addons}?${search}` : ROUTES.albiruni.addons;
}

/** Path of an add-on's page. */
export const addonPath = (slug: string) => `${ROUTES.albiruni.addons}/${encodeURIComponent(slug)}`;
