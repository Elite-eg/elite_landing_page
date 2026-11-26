"use client";

import { Badge } from "@/app/components/shared/Badge";
import { useAddonPrice } from "@/app/components/shared/addons/useAddonPrice";
import type { AddonPrice } from "@/lib/addons";

export interface AddonPriceTagProps {
  price: AddonPrice;
}

/** Price chip on a store card in the visitor's currency (Figma "Price"); free add-ons get the green "Free" chip. */
export function AddonPriceTag({ price }: AddonPriceTagProps) {
  const formatPrice = useAddonPrice();

  return <Badge variant={price === null ? "success" : "secondary"}>{formatPrice(price)}</Badge>;
}
