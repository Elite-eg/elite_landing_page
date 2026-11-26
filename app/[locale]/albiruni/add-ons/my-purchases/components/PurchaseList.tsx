import { Reveal } from "@/app/components/shared/Reveal";
import type { AddonPurchase } from "@/lib/addons";
import { PurchaseCard } from "./PurchaseCard";

export interface PurchaseListProps {
  purchases: AddonPurchase[];
}

/** One card per bought add-on, newest first; the cards rise in one after another. */
export function PurchaseList({ purchases }: PurchaseListProps) {
  return (
    <ul className="flex flex-col gap-6">
      {purchases.map((purchase, index) => (
        <li key={purchase.orderNumber}>
          <Reveal delay={index * 0.08}>
            <PurchaseCard purchase={purchase} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
