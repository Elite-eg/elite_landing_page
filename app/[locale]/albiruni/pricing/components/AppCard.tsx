"use client";

import { useId } from "react";
import { Checkbox } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { AlbiruniAppKey } from "../data/pricingData";
import { usePricingConfig } from "../hooks/usePricingConfig";
import { AppToggleChip } from "./AppToggleChip";

export interface AppCardProps {
  app: AlbiruniAppKey;
}

/**
 * One Albiruni app (Figma "Addon"): the whole card is a checkbox. Added = warm card with an orange border.
 * Once the chosen plan's app limit is reached, the apps not added yet are disabled.
 */
export function AppCard({ app }: AppCardProps) {
  const t = useTranslations("albiruniPricing.apps");
  const { apps, appLimit, toggleApp } = usePricingConfig();
  const nameId = useId();
  const descriptionId = useId();
  const added = apps.includes(app);
  const isFull = appLimit !== undefined && apps.length >= appLimit;

  return (
    <Checkbox
      as="div"
      checked={added}
      onChange={() => toggleApp(app)}
      disabled={!added && isFull}
      aria-labelledby={nameId}
      aria-describedby={descriptionId}
      className={cn(
        "flex h-full cursor-pointer flex-col items-start gap-2.5 rounded-2xl border p-[1.125rem]",
        "border-transparent bg-surface-alt transition-colors duration-200 ease-out-brand hover:border-edge",
        "data-[checked]:border-secondary data-[checked]:bg-surface-warm",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60 data-[disabled]:hover:border-transparent"
      )}
    >
      <span className="flex w-full items-center justify-between gap-3">
        <span id={nameId} className="font-heading text-base font-semibold text-body">
          {t(`items.${app}.name`)}
        </span>
        <AppToggleChip added={added} />
      </span>
      <span id={descriptionId} className="text-caption text-content">
        {t(`items.${app}.description`)}
      </span>
      <span className="font-heading text-caption font-medium text-primary">{t("includedInBusiness")}</span>
    </Checkbox>
  );
}
