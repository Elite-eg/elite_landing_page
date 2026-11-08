"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/app/components/shared/Badge";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { PRICING_PLANS } from "../data/pricingData";
import { usePricingConfig } from "../hooks/usePricingConfig";
import { PlanCard } from "./PlanCard";
import { StepLabel } from "./StepLabel";

/** Step 2: "Choose your plan · <sector>" with the "preliminary prices" chip, then the three plan cards. */
export function PlansStep() {
  const t = useTranslations("albiruniPricing.plans");
  const tSectors = useTranslations("nav.sectorsItems");
  const { sector } = usePricingConfig();

  return (
    <div className="mt-4 flex flex-col items-center gap-10">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <StepLabel step={2} as="h2">
          {t("title", { sector: tSectors(sector) })}
        </StepLabel>
        <Badge variant="secondary" className="rounded-full font-medium">
          {t("preliminary")}
        </Badge>
      </div>

      <RevealGroup className="grid w-full gap-5 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <Reveal key={plan.key} inGroup className="h-full">
            <PlanCard plan={plan} />
          </Reveal>
        ))}
      </RevealGroup>
    </div>
  );
}
