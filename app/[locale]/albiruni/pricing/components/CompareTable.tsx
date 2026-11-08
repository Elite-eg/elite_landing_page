"use client";

import { useTranslations } from "next-intl";
import { COMPARE_GROUPS, PRICING_PLANS, isPricedPlan, type PricingPlan } from "../data/pricingData";
import { usePlanPrice } from "../hooks/usePlanPrice";
import { CompareCell } from "./CompareCell";

/**
 * Plans side by side (Figma "Table"): navy header row, a grey row per group, then one row per feature with the
 * feature on the start side. Prices follow the country and billing choices. Scrolls sideways on small screens.
 */
export function CompareTable() {
  const t = useTranslations("albiruniPricing");
  const formatPrice = usePlanPrice();

  /** Values the text cells may use: `{users}`, `{apps}`, `{price}`. */
  const cellValues = (plan: PricingPlan) => ({
    users: plan.users,
    apps: plan.appLimit ?? 0,
    price: isPricedPlan(plan.key) ? formatPrice(plan.key) : "",
  });

  return (
    <div className="overflow-x-auto rounded-2xl border border-edge">
      <table className="w-full min-w-[40rem] border-collapse text-[0.9375rem]">
        <caption className="sr-only">{t("compare.title")}</caption>
        <thead className="bg-primary-dark font-heading text-white">
          <tr>
            <th scope="col" className="w-[36%] px-5 py-4 text-start font-medium sm:px-7">
              {t("compare.feature")}
            </th>
            {PRICING_PLANS.map((plan) => (
              <th key={plan.key} scope="col" className="px-3 py-4 text-center font-medium sm:px-4">
                {t(`plans.${plan.key}.name`)}
              </th>
            ))}
          </tr>
        </thead>

        {COMPARE_GROUPS.map((group, index) => (
          <tbody key={group.title ?? index}>
            {group.title && (
              <tr className="bg-surface-alt">
                <th
                  scope="colgroup"
                  colSpan={PRICING_PLANS.length + 1}
                  className="px-5 py-4 text-start text-caption font-medium text-primary sm:px-7"
                >
                  {t(`compare.groups.${group.title}`)}
                </th>
              </tr>
            )}

            {group.rows.map((row) => (
              <tr key={row.key} className="border-t border-edge/60 first:border-t-0">
                <th scope="row" className="px-5 py-4 text-start font-normal text-ink-700 sm:px-7">
                  {t(`compare.rows.${row.key}.label`)}
                </th>
                {PRICING_PLANS.map((plan) => (
                  <CompareCell
                    key={plan.key}
                    kind={row.cells[plan.key]}
                    text={
                      row.cells[plan.key] === "text"
                        ? t(`compare.rows.${row.key}.${plan.key}`, cellValues(plan))
                        : undefined
                    }
                  />
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
