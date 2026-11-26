import { useTranslations } from "next-intl";
import { FiBookOpen, FiDownload, FiMessageCircle } from "react-icons/fi";
import { AddonContactDeveloperButton } from "@/app/components/shared/addons/AddonContactDeveloperButton";
import { AddonDownloadLink } from "@/app/components/shared/addons/AddonDownloadLink";
import { Button } from "@/app/components/shared/Button";
import { addonInstallGuidePath, type AddonPurchase } from "@/lib/addons";

export interface PurchaseCardActionsProps {
  /** Card title id: every card repeats these buttons, so each names its add-on to screen readers. */
  titleId: string;
  addon: AddonPurchase["addon"];
  fileUrl: string;
}

/**
 * Download (navy: orange stays for a screen's one main action, and this page repeats it per card), the install guide
 * and the developer. Full width and stacked on phones.
 */
export function PurchaseCardActions({ titleId, addon, fileUrl }: PurchaseCardActionsProps) {
  const t = useTranslations("addons.myPurchases.actions");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <AddonDownloadLink url={fileUrl} variant="primary" icon={<FiDownload />} aria-describedby={titleId}>
        {t("download")}
      </AddonDownloadLink>
      <Button
        href={addonInstallGuidePath(addon.slug)}
        variant="outline"
        icon={<FiBookOpen />}
        iconPosition="start"
        aria-describedby={titleId}
      >
        {t("installGuide")}
      </Button>
      <AddonContactDeveloperButton addon={addon} icon={<FiMessageCircle />} iconPosition="start" aria-describedby={titleId} />
    </div>
  );
}
