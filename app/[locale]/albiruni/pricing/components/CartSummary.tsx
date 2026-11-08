"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/app/components/shared/Button";
import { planByKey } from "../data/pricingData";
import { usePlanPrice } from "../hooks/usePlanPrice";
import { usePricingConfig } from "../hooks/usePricingConfig";
import { trialHref } from "../utils/trialHref";

/**
 * Navy summary beside the apps title (Figma "Cart summary"): the chosen plan, its price, the apps it covers
 * (all, or "2 of 3") and the free-trial button carrying every choice. Changes are announced politely.
 */
export function CartSummary() {
  const t = useTranslations("albiruniPricing");
  const config = usePricingConfig();
  const formatPrice = usePlanPrice();
  const price = formatPrice(config.plan);

  return (
    <aside
      aria-label={t("apps.cart.label")}
      className="flex flex-wrap items-center justify-between gap-x-3.5 gap-y-3 rounded-2xl bg-primary-dark px-[1.125rem] py-3.5"
    >
      <div aria-live="polite">
        <p className="text-[0.8125rem] text-navy-200">
          {t("apps.cart.plan", { plan: t(`plans.${config.plan}.name`), users: planByKey(config.plan).users })}
        </p>
        <p className="mt-0.5 font-heading text-lg font-bold text-white">
          {config.appLimit === undefined
            ? t("apps.cart.allIncluded", { price })
            : t("apps.cart.limited", { price, count: config.apps.length, limit: config.appLimit })}
        </p>
      </div>

      <Button variant="secondary" size="sm" href={trialHref(config)}>
        {t("apps.cart.start")}
      </Button>
    </aside>
  );
}
