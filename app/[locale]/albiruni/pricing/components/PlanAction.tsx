"use client";

import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { ROUTES } from "@/lib/constants";
import { PRICING_APPS_ID, isPricedPlan, type PricingPlan } from "../data/pricingData";
import { usePricingConfig } from "../hooks/usePricingConfig";
import { trialHref } from "../utils/trialHref";

export interface PlanActionProps {
  plan: PricingPlan;
}

/**
 * A plan card's button: enterprise → request a quote (contact page); the featured plan → free trial with the
 * visitor's choices; any other plan → choose it and scroll to the apps step (then it reads "Plan chosen").
 */
export function PlanAction({ plan }: PlanActionProps) {
  const t = useTranslations("albiruniPricing.plans");
  const config = usePricingConfig();
  const reduceMotion = useReducedMotion();

  if (!isPricedPlan(plan.key)) {
    return (
      <Button variant="outline" fullWidth href={ROUTES.contact}>
        {t(`${plan.key}.action`)}
      </Button>
    );
  }

  if (plan.featured) {
    return (
      <Button variant="secondary" fullWidth href={trialHref({ ...config, plan: plan.key })}>
        {t(`${plan.key}.action`)}
      </Button>
    );
  }

  const planKey = plan.key;
  const isChosen = config.plan === planKey;
  const choose = () => {
    config.choosePlan(planKey);
    document.getElementById(PRICING_APPS_ID)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <Button
      variant="outline"
      fullWidth
      onClick={choose}
      icon={isChosen ? <FiCheck /> : undefined}
      iconPosition="start"
    >
      {isChosen ? t("chosen") : t(`${planKey}.action`)}
    </Button>
  );
}
