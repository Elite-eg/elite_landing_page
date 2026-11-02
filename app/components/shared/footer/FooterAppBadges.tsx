import { useTranslations } from "next-intl";
import { AppLinkBadge, type AppLink } from "@/app/components/shared/AppLinkBadge";
import { ALBIRUNI_APP_LINKS } from "@/lib/constants";

const ALBIRUNI_LINKS: AppLink[] = [
  { kind: "appStore", href: ALBIRUNI_APP_LINKS.appStore },
  { kind: "googlePlay", href: ALBIRUNI_APP_LINKS.googlePlay },
];

export function FooterAppBadges() {
  const t = useTranslations("footer.app");

  return (
    <div className="space-y-3">
      <h2 className="text-caption font-bold text-surface">{t("title")}</h2>
      <div className="flex flex-wrap gap-2">
        {ALBIRUNI_LINKS.map((link) => (
          <AppLinkBadge key={link.kind} link={link} />
        ))}
      </div>
    </div>
  );
}
