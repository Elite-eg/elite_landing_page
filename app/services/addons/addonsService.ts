import { cache } from "react";
import type { AppLocale } from "@/lib/constants";
import type { AddonDetails, AddonsPage, AddonsQuery } from "@/lib/addons";
import { findMockAddon, queryMockAddons } from "./mock/queryMockAddons";

/**
 * Add-ons store data: the only place the store and add-on pages get add-ons from. Server side; `cache` shares one
 * call per request between a page and its metadata.
 *
 * DRAFT: answers from the sample catalog in `./mock` until the backend exists (TBD: `API_ENDPOINTS.addons`).
 * To connect the API, replace each body with an `ApiService` call that returns the same shape, e.g.
 * `(await ApiService.get<AddonsPage>(API_ENDPOINTS.addons, { params: query, headers: { lang: locale } })).data`,
 * then delete the `mock` folder. The pages don't change.
 */

/** One page of store results for a query (search, category, filters, sort, page). */
export const getAddons = cache(async (query: AddonsQuery, locale: AppLocale): Promise<AddonsPage> => {
  return queryMockAddons(query, locale);
});

/** One add-on's page data, or null when the slug doesn't exist. */
export const getAddon = cache(async (slug: string, locale: AppLocale): Promise<AddonDetails | null> => {
  return findMockAddon(slug, locale);
});
