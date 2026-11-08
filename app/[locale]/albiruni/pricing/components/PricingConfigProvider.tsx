"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  BILLING_CYCLES,
  DEFAULT_APPS,
  DEFAULT_PLAN,
  PRICING_SECTORS,
  planByKey,
  type AlbiruniAppKey,
  type BillingCycle,
  type PricedPlanKey,
  type SectorKey,
} from "../data/pricingData";
import { PricingConfigContext, type PricingConfig } from "../hooks/usePricingConfig";

export interface PricingConfigProviderProps {
  children: ReactNode;
}

/** Holds the visitor's choices for every pricing section below it (hero, sectors, plans, apps, comparison). */
export function PricingConfigProvider({ children }: PricingConfigProviderProps) {
  const [sector, setSector] = useState<SectorKey>(PRICING_SECTORS[0].key);
  const [billing, setBilling] = useState<BillingCycle>(BILLING_CYCLES[0]);
  const [plan, setPlan] = useState<PricedPlanKey>(DEFAULT_PLAN);
  const [apps, setApps] = useState<readonly AlbiruniAppKey[]>(DEFAULT_APPS);
  const appLimit = planByKey(plan).appLimit;

  const choosePlan = useCallback((next: PricedPlanKey) => {
    const limit = planByKey(next).appLimit;
    setPlan(next);
    if (limit !== undefined) setApps((current) => current.slice(0, limit));
  }, []);

  const toggleApp = useCallback(
    (app: AlbiruniAppKey) =>
      setApps((current) => {
        if (current.includes(app)) return current.filter((picked) => picked !== app);
        return appLimit !== undefined && current.length >= appLimit ? current : [...current, app];
      }),
    [appLimit]
  );

  const config = useMemo<PricingConfig>(
    () => ({ sector, billing, plan, apps, appLimit, setSector, setBilling, choosePlan, toggleApp }),
    [sector, billing, plan, apps, appLimit, choosePlan, toggleApp]
  );

  return <PricingConfigContext.Provider value={config}>{children}</PricingConfigContext.Provider>;
}
