import { ROUTES } from "@/lib/constants";
import type { CountryCode } from "@/lib/countries";
import { planMonthlyPrice, type PricedPlanKey } from "../../albiruni/pricing/data/pricingData";

/** Anchor of the join form ("Join the program" in the hero scrolls here). */
export const PARTNER_FORM_ID = "partner-form";
export const PARTNER_FORM_HREF = `${ROUTES.partners}#${PARTNER_FORM_ID}`;

/** TBD: the partner program's own terms page. Until it exists, the consent line links the site terms. */
export const PARTNER_TERMS_HREF = ROUTES.legal.terms;

/**
 * DRAFT / TBD (the Figma marks the rates as preliminary): share of a referred client's subscription (before VAT)
 * paid to the partner, and for how many months.
 */
export const PARTNER_COMMISSION_RATE = 0.2;
export const PARTNER_COMMISSION_MONTHS = 12;

/** The rate as copy shows it ("20%"): `{rate}%` in the messages. */
export const PARTNER_COMMISSION_PERCENT = Math.round(PARTNER_COMMISSION_RATE * 100);

/** A partner's monthly commission on one client of a plan, from the plan's listed price in the country's currency. */
export const monthlyCommission = (country: CountryCode, plan: PricedPlanKey): number =>
  Math.round(planMonthlyPrice(country, plan, "yearly") * PARTNER_COMMISSION_RATE);

/** "What your office gains" tiles. Copy: `partners.benefits.items.<key>`. */
export const PARTNER_BENEFITS = ["commission", "dashboard", "clientAccess", "training"] as const;

/** "How referral and commission work", in order. Copy: `partners.steps.items.<key>`. */
export const PARTNER_STEPS = ["register", "refer", "onboard", "payout"] as const;

/** Office type chips (one answer). Labels: `partners.form.officeTypes.<key>`. */
export const OFFICE_TYPES = ["accounting", "audit", "taxConsulting"] as const;

/** Approximate client count ranges. Labels: `partners.form.clientCounts.<key>`. TBD: owner to confirm the ranges. */
export const CLIENT_COUNT_RANGES = ["under10", "from10to50", "from51to100", "over100"] as const;

/**
 * City choices, per country: the list follows the visitor's country (header switcher), like the phone code.
 * Labels: `partners.form.cities.<key>`. DRAFT SAMPLE / TBD: owner to confirm the cities; "other" ends every list.
 */
export const PARTNER_CITIES = {
  EG: ["cairo", "giza", "alexandria", "mansoura", "tanta", "assiut", "other"],
  SA: ["riyadh", "jeddah", "makkah", "madinah", "dammam", "khobar", "other"],
} as const satisfies Record<CountryCode, readonly string[]>;

export type PartnerCityKey = (typeof PARTNER_CITIES)[CountryCode][number];
