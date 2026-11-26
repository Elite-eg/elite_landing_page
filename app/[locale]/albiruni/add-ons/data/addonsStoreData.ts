import { ADDON_CATEGORIES } from "@/lib/addons";

/** Popular searches under the hero search box (Figma), in display order. Texts: `addons.popular.items.<key>`. */
export const POPULAR_SEARCHES = ["whatsapp", "payments", "shipping", "barcode"] as const;

/** Category pills: everything, then each category. */
export const CATEGORY_OPTIONS = ["all", ...ADDON_CATEGORIES] as const;

/** Anchor of the results block: the pagination scrolls back to it. */
export const ADDONS_RESULTS_ID = "addons-results";
