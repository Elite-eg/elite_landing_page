import { API_ENDPOINTS, type AppLocale } from "@/lib/constants";
import type { AddonPurchase } from "@/lib/addons";
import { countryByCode } from "@/lib/countries";
import { todayIsoDate } from "@/lib/dates";
import { MOCK_ADDONS } from "./addonsMockData";
import { MOCK_FREE_UPDATE_MONTHS, MOCK_PURCHASES, type MockPurchase } from "./purchasesMockData";
import { toDeveloper } from "./queryMockAddons";

/**
 * DRAFT: what the backend will return for the customer's purchases, built from the sample orders: texts in the
 * visitor's language, amounts with VAT, the end of free updates. Delete with the rest of this folder.
 */

/** "2026-10-11" + 12 months → "2027-10-11". */
function addMonths(isoDate: string, months: number): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.toISOString().slice(0, 10);
}

function toPurchase(purchase: MockPurchase, locale: AppLocale): AddonPurchase | null {
  const addon = MOCK_ADDONS.find(({ slug }) => slug === purchase.slug);
  if (!addon?.price) return null;

  const price = addon.price[purchase.country];
  const { vatRate } = countryByCode(purchase.country);
  const vat = Math.round(price * vatRate);
  const updatesUntil = addMonths(purchase.purchasedAt, MOCK_FREE_UPDATE_MONTHS);

  return {
    orderNumber: purchase.orderNumber,
    purchasedAt: purchase.purchasedAt,
    updatesUntil,
    updatesActive: updatesUntil >= todayIsoDate(),
    addon: { slug: addon.slug, name: addon.name[locale], developer: toDeveloper(addon.developer, locale), icon: addon.icon },
    // TBD: the backend's signed download link.
    file: { ...purchase.file, url: `${API_ENDPOINTS.addonPurchases}/${purchase.orderNumber}/download` },
    licenseKey: purchase.licenseKey,
    payment: purchase.payment,
    amounts: { country: purchase.country, price, vatRate, vat, total: price + vat },
  };
}

export function listMockPurchases(locale: AppLocale): AddonPurchase[] {
  return MOCK_PURCHASES.map((purchase) => toPurchase(purchase, locale)).filter((purchase) => purchase !== null);
}

export function findMockPurchase(orderNumber: string, locale: AppLocale): AddonPurchase | null {
  const purchase = MOCK_PURCHASES.find((item) => item.orderNumber === orderNumber);
  return purchase ? toPurchase(purchase, locale) : null;
}
