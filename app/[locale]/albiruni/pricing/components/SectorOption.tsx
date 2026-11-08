"use client";

import { Radio } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { PricingSector } from "../data/pricingData";

export interface SectorOptionProps {
  sector: PricingSector;
}

/** One sector card (Figma "Sector"): icon tile, name and app count. Chosen = navy card with an orange icon tile. */
export function SectorOption({ sector: { key, icon: Icon, appCount } }: SectorOptionProps) {
  const t = useTranslations("albiruniPricing.sectors");
  const tSectors = useTranslations("nav.sectorsItems");

  return (
    <Radio
      value={key}
      className={cn(
        "group flex h-full cursor-pointer flex-col items-center gap-2.5 rounded-2xl border px-2 py-4 text-center sm:px-4 sm:py-[1.125rem]",
        "border-edge bg-surface transition duration-300 ease-out-brand hover:border-primary/30",
        "data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:shadow-lift"
      )}
    >
      <span className="rounded-xl bg-surface-muted p-2.5 text-primary transition-colors duration-300 ease-out-brand group-data-[checked]:bg-secondary group-data-[checked]:text-white">
        <Icon className="size-[1.375rem]" aria-hidden="true" />
      </span>
      <span className="text-balance font-heading text-caption font-semibold text-body group-data-[checked]:text-white">
        {tSectors(key)}
      </span>
      <span className="text-xs text-content group-data-[checked]:text-navy-200">
        {t("appCount", { count: appCount })}
      </span>
    </Radio>
  );
}
