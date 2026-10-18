import Image from "next/image";
import { useTranslations } from "next-intl";
import { ALBIRUNI_APP_LINKS } from "@/lib/constants";
import { StoreBadge } from "./StoreBadge";

export function FooterAppBadges() {
  const t = useTranslations("footer.app");

  return (
    <div className="space-y-3">
      <h2 className="text-caption font-bold text-surface">{t("title")}</h2>
      <div className="flex flex-wrap gap-2">
        <StoreBadge
          href={ALBIRUNI_APP_LINKS.appStore}
          caption={t("appStoreCaption")}
          storeName={t("appStoreName")}
          logo={<Image src="/images/app-store.svg" alt="" width={24} height={24} unoptimized className="size-full" />}
        />
        <StoreBadge
          href={ALBIRUNI_APP_LINKS.googlePlay}
          caption={t("googlePlayCaption")}
          storeName={t("googlePlayName")}
          logo={<Image src="/images/google-play.svg" alt="" width={24} height={24} unoptimized className="size-full" />}
        />
      </div>
    </div>
  );
}
