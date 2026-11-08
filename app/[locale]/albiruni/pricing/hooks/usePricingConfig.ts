"use client";

import { createContext, useContext } from "react";
import type { AlbiruniAppKey, BillingCycle, PricedPlanKey, SectorKey } from "../data/pricingData";

/** What the visitor has picked so far (the free-trial link carries it). */
export interface PricingSelection {
  sector: SectorKey;
  billing: BillingCycle;
  plan: PricedPlanKey;
  apps: readonly AlbiruniAppKey[];
}

export interface PricingConfig extends PricingSelection {
  /** Apps the chosen plan includes; undefined = every app. */
  appLimit?: number;
  setSector: (sector: SectorKey) => void;
  setBilling: (billing: BillingCycle) => void;
  /** Picks a plan. A plan with an app limit keeps only the first apps picked that fit. */
  choosePlan: (plan: PricedPlanKey) => void;
  /** Adds or removes an app (adding does nothing once the plan's limit is reached). */
  toggleApp: (app: AlbiruniAppKey) => void;
}

export const PricingConfigContext = createContext<PricingConfig | null>(null);

/** The pricing page's shared choices (sector, billing, plan, apps), set by <PricingConfigProvider>. */
export function usePricingConfig(): PricingConfig {
  const config = useContext(PricingConfigContext);
  if (!config) throw new Error("usePricingConfig must be used inside <PricingConfigProvider>");
  return config;
}
