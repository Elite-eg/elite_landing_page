"use client";

import { useId } from "react";
import { RadioGroup } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { PRICING_SECTORS } from "../data/pricingData";
import { usePricingConfig } from "../hooks/usePricingConfig";
import { SectorOption } from "./SectorOption";
import { StepLabel } from "./StepLabel";

/** Step 1: the sector cards (one row at every width). The plans below follow the choice. */
export function SectorPicker() {
  const t = useTranslations("albiruniPricing.sectors");
  const { sector, setSector } = usePricingConfig();
  const titleId = useId();

  return (
    <div className="flex flex-col items-center gap-4">
      <StepLabel step={1} as="h2" id={titleId}>
        {t("title")}
      </StepLabel>

      <RadioGroup
        value={sector}
        onChange={setSector}
        aria-labelledby={titleId}
        className="grid w-full grid-cols-3 gap-2 sm:gap-3"
      >
        {PRICING_SECTORS.map((item) => (
          <SectorOption key={item.key} sector={item} />
        ))}
      </RadioGroup>
    </div>
  );
}
