import { AddonFileCard } from "@/app/components/shared/addons/AddonFileCard";
import { AddonLicenseKey } from "@/app/components/shared/addons/AddonLicenseKey";
import type { AddonPurchase } from "@/lib/addons";
import { PurchaseCardActions } from "./PurchaseCardActions";
import { PurchaseCardHeader } from "./PurchaseCardHeader";
import { PurchaseOrderDetails } from "./PurchaseOrderDetails";

export interface PurchaseCardProps {
  purchase: AddonPurchase;
}

/**
 * One bought add-on: name, developer and free updates; the order's details beside the file and license key (stacked
 * below lg); then download, install guide and contact the developer.
 */
export function PurchaseCard({ purchase }: PurchaseCardProps) {
  const titleId = `purchase-${purchase.orderNumber}`;

  return (
    <article aria-labelledby={titleId} className="flex flex-col gap-6 rounded-3xl border border-edge bg-surface p-6 sm:p-8">
      <PurchaseCardHeader
        titleId={titleId}
        addon={purchase.addon}
        updatesUntil={purchase.updatesUntil}
        updatesActive={purchase.updatesActive}
      />

      <div className="grid gap-6 border-t border-edge pt-6 lg:grid-cols-2 lg:gap-10">
        <PurchaseOrderDetails purchase={purchase} />
        <div className="flex flex-col gap-3">
          <AddonFileCard file={purchase.file} />
          <AddonLicenseKey licenseKey={purchase.licenseKey} />
        </div>
      </div>

      <PurchaseCardActions titleId={titleId} addon={purchase.addon} fileUrl={purchase.file.url} />
    </article>
  );
}
