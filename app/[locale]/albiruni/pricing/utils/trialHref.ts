import { ROUTES } from "@/lib/constants";
import type { PricingSelection } from "../hooks/usePricingConfig";

/** Free-trial link carrying the visitor's choices, so the trial page (not built yet) can start from them. */
export function trialHref({ plan, sector, billing, apps }: PricingSelection): string {
  const query = new URLSearchParams({ plan, sector, billing, apps: apps.join(",") });
  return `${ROUTES.albiruni.trial}?${query}`;
}
