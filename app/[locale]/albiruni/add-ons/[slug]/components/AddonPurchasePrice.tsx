"use client";

import { useTranslations } from "next-intl";
import { useAddonPrice } from "@/app/components/shared/addons/useAddonPrice";
import type { AddonPrice } from "@/lib/addons";

export interface AddonPurchasePriceProps {
  price: AddonPrice;
}

/** Price in the visitor's currency and how it is paid (one-time, before tax), or "Free" for free add-ons. */
export function AddonPurchasePrice({ price }: AddonPurchasePriceProps) {
  const t = useTranslations("addons.details.purchase");
  const formatPrice = useAddonPrice();

  return (
    <div className="flex flex-col gap-2">
      <p className="text-h2 text-body">{formatPrice(price)}</p>
      <p className="text-caption text-content">{price === null ? t("freeNote") : t("oneTime")}</p>
    </div>
  );
}
