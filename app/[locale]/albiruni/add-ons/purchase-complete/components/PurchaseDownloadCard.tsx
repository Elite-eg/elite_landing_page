import { useTranslations } from "next-intl";
import { AddonContactDeveloperButton } from "@/app/components/shared/addons/AddonContactDeveloperButton";
import { AddonDownloadLink } from "@/app/components/shared/addons/AddonDownloadLink";
import { AddonFileCard } from "@/app/components/shared/addons/AddonFileCard";
import { AddonLicenseKey } from "@/app/components/shared/addons/AddonLicenseKey";
import { Button } from "@/app/components/shared/Button";
import { addonInstallGuidePath, type AddonPurchase } from "@/lib/addons";
import { PurchaseNextSteps } from "./PurchaseNextSteps";
import { PurchasePanel } from "./PurchasePanel";

export interface PurchaseDownloadCardProps {
  purchase: AddonPurchase;
}

/**
 * "Download your add-on" (Figma "Download"): the file, the download button (the page's one orange action), the
 * license key, the next steps, then the install guide and the developer.
 */
export function PurchaseDownloadCard({ purchase }: PurchaseDownloadCardProps) {
  const t = useTranslations("addons.purchaseComplete.download");
  const { addon, file, licenseKey } = purchase;

  return (
    <PurchasePanel id="purchase-download-title" title={t("title")}>
      <AddonFileCard file={file} />
      <AddonDownloadLink url={file.url} size="lg" fullWidth>
        {t("download")}
      </AddonDownloadLink>
      <AddonLicenseKey licenseKey={licenseKey} />

      <hr className="border-edge" />
      <PurchaseNextSteps />

      <div className="grid gap-3 sm:grid-cols-2">
        <Button href={addonInstallGuidePath(addon.slug)} variant="outline">
          {t("installGuide")}
        </Button>
        <AddonContactDeveloperButton addon={addon} />
      </div>
    </PurchasePanel>
  );
}
