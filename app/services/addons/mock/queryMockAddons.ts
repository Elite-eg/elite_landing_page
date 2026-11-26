import type { AppLocale } from "@/lib/constants";
import {
  ADDON_CATEGORIES,
  ADDON_RATING_MINIMUM,
  ADDONS_PAGE_SIZE,
  type AddonCategory,
  type AddonDetails,
  type AddonDeveloper,
  type AddonMedia,
  type AddonRatingBreakdown,
  type AddonSummary,
  type AddonsPage,
  type AddonsQuery,
} from "@/lib/addons";
import {
  MOCK_ADDONS,
  MOCK_DEVELOPERS,
  MOCK_INCLUDES,
  MOCK_INSTALL_STEPS,
  MOCK_SCREENSHOT_COUNT,
  type MockAddon,
  type MockDeveloperId,
} from "./addonsMockData";

/**
 * DRAFT: what the backend will do for the store, run over the sample catalog: search, filter, sort, paginate and
 * return texts in the visitor's language. Delete with the rest of this folder once the API exists.
 */

/** Average of a 5→1 star breakdown, one decimal (0 without reviews). */
function averageRating(breakdown: AddonRatingBreakdown): number {
  const count = breakdown.reduce((sum, value) => sum + value, 0);
  if (count === 0) return 0;
  const total = breakdown.reduce((sum, value, index) => sum + value * (5 - index), 0);
  return Math.round((total / count) * 10) / 10;
}

const reviewCount = (addon: MockAddon) => addon.ratingBreakdown.reduce((sum, value) => sum + value, 0);

export function toDeveloper(id: MockDeveloperId, locale: AppLocale): AddonDeveloper {
  const { name, official } = MOCK_DEVELOPERS[id];
  return { id, name: name[locale], official };
}

function toSummary(addon: MockAddon, locale: AppLocale): AddonSummary {
  return {
    slug: addon.slug,
    name: addon.name[locale],
    summary: addon.summary[locale],
    category: addon.category,
    developer: toDeveloper(addon.developer, locale),
    icon: addon.icon,
    price: addon.price,
    rating: averageRating(addon.ratingBreakdown),
    reviewCount: reviewCount(addon),
    installs: addon.installs,
  };
}

function toDetails(addon: MockAddon, locale: AppLocale): AddonDetails {
  const isFree = addon.price === null;
  const download = isFree ? MOCK_INSTALL_STEPS.downloadFree : MOCK_INSTALL_STEPS.downloadPaid;
  const screenshots: AddonMedia[] = Array.from({ length: MOCK_SCREENSHOT_COUNT }, () => ({ kind: "image" }));

  return {
    ...toSummary(addon, locale),
    description: addon.description[locale],
    features: addon.features.map((feature) => feature[locale]),
    installSteps: [download, ...MOCK_INSTALL_STEPS.shared, addon.settingsStep].map((step) => step[locale]),
    includes: MOCK_INCLUDES[isFree ? "free" : "paid"].map((line) => line[locale]),
    version: addon.changelog[0]?.version ?? "",
    updatedAt: addon.updatedAt,
    versions: [...addon.versions],
    sectors: [...addon.sectors],
    languages: ["ar", "en"],
    license: "singleCompany",
    media: [{ kind: "video", duration: addon.videoDuration }, ...screenshots],
    ratingBreakdown: addon.ratingBreakdown,
    reviews: addon.reviews.map((review, index) => ({
      id: `${addon.slug}-${index}`,
      author: review.author[locale],
      company: review.company[locale],
      rating: review.rating,
      text: review.text[locale],
    })),
    changelog: addon.changelog.map((release) => ({
      version: release.version,
      date: release.date,
      notes: release.notes.map((note) => note[locale]),
    })),
  };
}

/** A catalog add-on with its localized card. */
interface CatalogEntry {
  source: MockAddon;
  summary: AddonSummary;
}

/** Every filter except the category (the category pills count against this set). */
function matchesFilters({ source, summary }: CatalogEntry, query: AddonsQuery): boolean {
  const search = query.q.toLocaleLowerCase();
  const text = `${summary.name} ${summary.summary} ${summary.developer.name}`.toLocaleLowerCase();

  return (
    (!search || text.includes(search)) &&
    (query.sector === "all" || source.sectors.includes(query.sector)) &&
    (query.version === "all" || source.versions.includes(query.version)) &&
    (query.developer === "all" || summary.developer.id === query.developer) &&
    (query.price === "all" || (query.price === "free") === (summary.price === null)) &&
    (query.rating === "all" || summary.rating >= ADDON_RATING_MINIMUM[query.rating])
  );
}

const SORTERS: Record<AddonsQuery["sort"], (a: CatalogEntry, b: CatalogEntry) => number> = {
  popular: (a, b) => b.summary.installs - a.summary.installs,
  rating: (a, b) => b.summary.rating - a.summary.rating || b.summary.reviewCount - a.summary.reviewCount,
  newest: (a, b) => b.source.updatedAt.localeCompare(a.source.updatedAt),
};

export function queryMockAddons(query: AddonsQuery, locale: AppLocale): AddonsPage {
  const filtered = MOCK_ADDONS.map((source): CatalogEntry => ({ source, summary: toSummary(source, locale) })).filter(
    (entry) => matchesFilters(entry, query)
  );

  const categoryCounts = Object.fromEntries(
    ADDON_CATEGORIES.map((category) => [category, filtered.filter(({ source }) => source.category === category).length])
  ) as Record<AddonCategory, number>;

  const inCategory = filtered
    .filter(({ source }) => query.category === "all" || source.category === query.category)
    .sort(SORTERS[query.sort]);

  const pageCount = Math.max(1, Math.ceil(inCategory.length / ADDONS_PAGE_SIZE));
  const page = Math.min(query.page, pageCount);
  const start = (page - 1) * ADDONS_PAGE_SIZE;

  return {
    items: inCategory.slice(start, start + ADDONS_PAGE_SIZE).map(({ summary }) => summary),
    total: inCategory.length,
    page,
    pageCount,
    categoryCounts: { all: filtered.length, ...categoryCounts },
    developers: (Object.keys(MOCK_DEVELOPERS) as MockDeveloperId[]).map((id) => toDeveloper(id, locale)),
  };
}

export function findMockAddon(slug: string, locale: AppLocale): AddonDetails | null {
  const addon = MOCK_ADDONS.find((item) => item.slug === slug);
  return addon ? toDetails(addon, locale) : null;
}
