import { cache } from "react";
import type { AppLocale } from "@/lib/constants";
import type { AddonDetails, AddonPurchase, AddonsPage, AddonsQuery } from "@/lib/addons";
import { findMockAddon, queryMockAddons } from "./mock/queryMockAddons";
import { findMockPurchase, listMockPurchases } from "./mock/queryMockPurchases";

/**
 * Add-ons store data: the only place the store, add-on and purchase pages get add-ons from. Server side; `cache`
 * shares one call per request between a page and its metadata.
 *
 * DRAFT: answers from the sample catalog and orders in `./mock` until the backend exists (TBD: `API_ENDPOINTS.addons`,
 * `API_ENDPOINTS.addonPurchases`; purchases also need the customer's session, sent with the request).
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

/** The signed-in customer's bought add-ons, newest first (My purchases). */
export const getAddonPurchases = cache(async (locale: AppLocale): Promise<AddonPurchase[]> => {
  return listMockPurchases(locale);
});

/** One of the customer's orders (purchase complete page), or null when it doesn't exist. */
export const getAddonPurchase = cache(async (orderNumber: string, locale: AppLocale): Promise<AddonPurchase | null> => {
  return findMockPurchase(orderNumber, locale);
});
