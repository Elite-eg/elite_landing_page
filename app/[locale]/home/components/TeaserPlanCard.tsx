"use client";

import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/app/components/shared/Badge";
import { Button } from "@/app/components/shared/Button";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { PlanFeatureList } from "@/app/components/shared/PlanFeatureList";
import { useCountry } from "@/app/store/useCountry";
import { ROUTES, type AppLocale } from "@/lib/constants";
import { intlLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { isPricedPlan, planMonthlyPrice, type PricingPlan, type SectorKey } from "../../albiruni/pricing/data/pricingData";
import { trialHref } from "../../albiruni/pricing/utils/trialHref";
import { TEASER_PLAN_FEATURES } from "../data/homeData";

export interface TeaserPlanCardProps {
  plan: PricingPlan;
  /** The sector picked above the cards: the free trial starts with it. */
  sector: SectorKey;
}

/**
 * A plan on the home pricing teaser (Figma "Plan", same look as the pricing page cards): name, monthly price in
 * the visitor's currency (billed yearly, as listed), who it's for, what it includes and its button: Basic → the
 * pricing page to pick apps, Business → free trial for the chosen sector, Enterprise → request a quote.
 */
export function TeaserPlanCard({ plan, sector }: TeaserPlanCardProps) {
  const t = useTranslations("home.pricing.plans");
  const tPlans = useTranslations("albiruniPricing.plans");
  const tPricing = useTranslations("albiruniPricing");
  const locale = useLocale() as AppLocale;
  const { country } = useCountry();
  const { key, featured = false } = plan;

  const action = !isPricedPlan(key)
    ? { href: ROUTES.contact, variant: "outline" as const }
    : featured
      ? { href: trialHref({ plan: key, sector, billing: "yearly", apps: [] }), variant: "secondary" as const }
      : { href: ROUTES.albiruni.pricing, variant: "outline" as const };

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-[1.125rem] rounded-3xl px-6 py-8 sm:px-[1.875rem]",
        featured
          ? "bg-gradient-to-br from-primary to-primary-dark shadow-lift"
          : cn("border border-edge bg-surface hover:border-primary/20", CARD_HOVER_CLASSES)
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <h3 className={cn("text-xl font-semibold", featured ? "text-white" : "text-body")}>{tPlans(`${key}.name`)}</h3>
        {featured && (
          <Badge variant="brand" className="rounded-full font-medium">
            {tPlans("popular")}
          </Badge>
        )}
      </header>

      <p className="flex flex-wrap items-end gap-x-2 gap-y-1">
        <span className={cn("font-heading text-h2", featured ? "text-white" : "text-body")}>
          {isPricedPlan(key)
            ? tPricing("money", {
                amount: new Intl.NumberFormat(intlLocale(locale)).format(planMonthlyPrice(country.code, key, "yearly")),
                symbol: country.currencySymbol[locale],
              })
            : tPlans("onRequest")}
        </span>
        {isPricedPlan(key) && (
          <span className={cn("pb-1.5 text-caption", featured ? "text-navy-200" : "text-content")}>
            {tPlans("perMonth", { users: plan.users })}
          </span>
        )}
      </p>

      <p className={cn("text-caption", featured ? "text-navy-200" : "text-content")}>
        {t(`${key}.description`, { users: plan.users })}
      </p>

      <PlanFeatureList
        features={TEASER_PLAN_FEATURES[key].map((feature) => t(`${key}.features.${feature}`, { apps: plan.appLimit ?? 0 }))}
        featured={featured}
      />

      <div className="mt-auto pt-1">
        <Button href={action.href} variant={action.variant} fullWidth>
          {t(`${key}.action`)}
        </Button>
      </div>
    </article>
  );
}
