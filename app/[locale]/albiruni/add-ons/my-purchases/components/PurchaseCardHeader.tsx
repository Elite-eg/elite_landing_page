import { AddonDeveloperLabel } from "@/app/components/shared/addons/AddonDeveloperLabel";
import { AddonIcon } from "@/app/components/shared/addons/AddonIcon";
import { Link } from "@/i18n/navigation";
import { addonPath, type AddonPurchase } from "@/lib/addons";
import { PurchaseUpdatesBadge } from "./PurchaseUpdatesBadge";

export interface PurchaseCardHeaderProps extends Pick<AddonPurchase, "addon" | "updatesUntil" | "updatesActive"> {
  /** Id of the card title (names the card, describes its repeated buttons). */
  titleId: string;
}

/** Add-on icon, name (links to its page) and developer, with the free updates badge on the end side. */
export function PurchaseCardHeader({ titleId, addon, updatesUntil, updatesActive }: PurchaseCardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-center gap-4">
        <AddonIcon icon={addon.icon} />
        <div className="flex min-w-0 flex-col gap-1">
          <h2 id={titleId} className="text-h3 text-body">
            <Link href={addonPath(addon.slug)} className="transition-colors duration-200 hover:text-primary">
              {addon.name}
            </Link>
          </h2>
          <AddonDeveloperLabel developer={addon.developer} />
        </div>
      </div>
      <PurchaseUpdatesBadge until={updatesUntil} active={updatesActive} />
    </div>
  );
}
