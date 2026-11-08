"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/app/components/shared/Badge";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "../data/pricingData";
import { usePricingConfig } from "../hooks/usePricingConfig";
import { PlanAction } from "./PlanAction";
import { PlanFeatureList } from "./PlanFeatureList";
import { PlanPrice } from "./PlanPrice";

export interface PlanCardProps {
  plan: PricingPlan;
}

/**
 * One plan (Figma "Plan"): name, price, who it is for, what it includes and its button.
 * The featured plan is the navy "most popular" card, and its copy follows the chosen sector.
 * A plan chosen for the apps step gets an orange border.
 */
export function PlanCard({ plan }: PlanCardProps) {
  const t = useTranslations("albiruniPricing.plans");
  const { sector, plan: chosenPlan } = usePricingConfig();
  const copyKey = plan.featured ? `${plan.key}.sectors.${sector}` : plan.key;
  const isChosen = !plan.featured && chosenPlan === plan.key;

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-[1.125rem] rounded-3xl px-6 py-8 sm:px-[1.875rem]",
        plan.featured
          ? "bg-gradient-to-br from-primary to-primary-dark shadow-lift"
          : cn("border border-edge bg-surface hover:border-primary/20", CARD_HOVER_CLASSES),
        isChosen && "border-secondary hover:border-secondary"
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <h3 className={cn("text-h3", plan.featured ? "text-white" : "text-body")}>{t(`${plan.key}.name`)}</h3>
        {plan.featured && (
          <Badge variant="brand" className="rounded-full font-medium">
            {t("popular")}
          </Badge>
        )}
      </header>

      <PlanPrice plan={plan} />

      <p className={cn("text-caption", plan.featured ? "text-navy-200" : "text-content")}>
        {t(`${copyKey}.description`, { users: plan.users, apps: plan.appLimit ?? 0 })}
      </p>

      <PlanFeatureList features={t.raw(`${copyKey}.features`) as string[]} featured={plan.featured} />

      <div className="mt-auto pt-1">
        <PlanAction plan={plan} />
      </div>
    </article>
  );
}
