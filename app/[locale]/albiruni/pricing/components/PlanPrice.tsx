"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { isPricedPlan, type PricingPlan } from "../data/pricingData";
import { usePlanPrice } from "../hooks/usePlanPrice";

export interface PlanPriceProps {
  plan: PricingPlan;
}

/** Big monthly price in the visitor's currency, with "monthly · up to N users" beside it ("On request" for enterprise). */
export function PlanPrice({ plan }: PlanPriceProps) {
  const t = useTranslations("albiruniPricing.plans");
  const formatPrice = usePlanPrice();

  return (
    <p className="flex flex-wrap items-end gap-x-2 gap-y-1">
      <span className={cn("font-heading text-h2", plan.featured ? "text-white" : "text-body")}>
        {isPricedPlan(plan.key) ? formatPrice(plan.key) : t("onRequest")}
      </span>
      {isPricedPlan(plan.key) && (
        <span className={cn("pb-1.5 text-caption", plan.featured ? "text-navy-200" : "text-content")}>
          {t("perMonth", { users: plan.users })}
        </span>
      )}
    </p>
  );
}
