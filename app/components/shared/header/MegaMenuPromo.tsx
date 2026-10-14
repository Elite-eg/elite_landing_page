"use client";

import { useClose } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import type { MegaMenuPromo as MegaMenuPromoData } from "@/lib/constants";
import { Button } from "../Button";

export interface MegaMenuPromoProps {
  promo: MegaMenuPromoData;
}

/** Dark navy card at the end of a mega menu with a single orange text CTA. */
export function MegaMenuPromo({ promo }: MegaMenuPromoProps) {
  const t = useTranslations("nav");
  const close = useClose();

  return (
    <div className="group/promo relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-navy-900 to-navy-950 p-5">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -end-10 size-32 rounded-full bg-navy-500/30 blur-2xl transition-[transform,background-color] duration-500 ease-out-brand group-hover/promo:scale-150 group-hover/promo:bg-navy-500/50"
      />
      <p className="relative font-heading text-body-lg font-bold leading-snug text-surface">{t(promo.titleKey)}</p>
      <p className="relative mt-2 text-xs leading-relaxed text-content-dark">{t(promo.textKey)}</p>
      <Button
        href={promo.cta.href}
        onClick={close}
        variant="text"
        size="sm"
        icon={<FiArrowRight />}
        flipIconInRtl
        className="relative mt-auto self-start pt-4 hover:text-orange-50 focus-visible:ring-offset-navy-900"
      >
        {t(promo.cta.labelKey)}
      </Button>
    </div>
  );
}
