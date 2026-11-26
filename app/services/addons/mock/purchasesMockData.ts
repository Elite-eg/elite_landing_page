import type { AddonFile, AddonPayment } from "@/lib/addons";
import type { CountryCode } from "@/lib/countries";

/**
 * DRAFT SAMPLE / TBD: the signed-in customer's bought add-ons until the backend (and sign-in) exist. Delete with the
 * rest of this folder. The first order is the Figma's purchase complete page (node 238:4040 in the v4 copy); the
 * other two are invented samples (one whose free updates have ended). Amounts come from the add-on's price in the
 * order's country plus that country's VAT.
 */

export interface MockPurchase {
  orderNumber: string;
  /** A MOCK_ADDONS slug (paid add-ons only). */
  slug: string;
  /** ISO date (YYYY-MM-DD). */
  purchasedAt: string;
  /** Country the customer bought in: the order's currency and VAT. */
  country: CountryCode;
  payment: AddonPayment;
  file: Omit<AddonFile, "url">;
  licenseKey: string;
}

/** Months of free updates after buying (the add-on page's "Free updates for 12 months"). */
export const MOCK_FREE_UPDATE_MONTHS = 12;

const MEGABYTE = 1024 * 1024;

/** Newest first. */
export const MOCK_PURCHASES: readonly MockPurchase[] = [
  {
    orderNumber: "ET-ADD-10482",
    slug: "rep-routes-map",
    purchasedAt: "2026-10-11",
    country: "EG",
    payment: { method: "card", last4: "4242" },
    file: { name: "route-planner-1.6.2.zip", version: "1.6.2", sizeBytes: Math.round(6.4 * MEGABYTE) },
    licenseKey: "ALB-7Q4K-M2RX-9TPL",
  },
  {
    orderNumber: "ET-ADD-10217",
    slug: "shipping-delivery",
    purchasedAt: "2026-07-02",
    country: "EG",
    payment: { method: "instapay" },
    file: { name: "shipping-delivery-1.4.0.zip", version: "1.4.0", sizeBytes: Math.round(4.1 * MEGABYTE) },
    licenseKey: "ALB-3HDW-8KQP-V6NE",
  },
  {
    orderNumber: "ET-ADD-08893",
    slug: "customer-loyalty",
    purchasedAt: "2025-09-14",
    country: "EG",
    payment: { method: "fawry" },
    file: { name: "customer-loyalty-1.3.2.zip", version: "1.3.2", sizeBytes: Math.round(3.1 * MEGABYTE) },
    licenseKey: "ALB-K9TF-2WMC-5RJA",
  },
];
