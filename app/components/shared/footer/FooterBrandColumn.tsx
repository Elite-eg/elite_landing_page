import { useTranslations } from "next-intl";
import { Logo } from "../Logo";
import { FooterAppBadges } from "./FooterAppBadges";
import { FooterContactList } from "./FooterContactList";
import { FooterSocialLinks } from "./FooterSocialLinks";

export function FooterBrandColumn() {
  const t = useTranslations("footer");

  return (
    <div className="max-w-sm space-y-6">
      <div className="space-y-4">
        <Logo tone="dark" withWordMark />
        <p className="text-caption text-content-dark">{t("tagline")}</p>
      </div>
      <FooterContactList />
      <FooterAppBadges />
      <FooterSocialLinks />
    </div>
  );
}
