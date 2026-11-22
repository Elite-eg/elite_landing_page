import { useTranslations } from "next-intl";
import { AppLinkBadge } from "@/app/components/shared/AppLinkBadge";
import { PROJECTS } from "@/lib/projects";

/** "Get the Albiruni app": the Albiruni store listings from `lib/projects.ts`. */
export function FooterAppBadges() {
  const t = useTranslations("footer.app");

  return (
    <div className="space-y-3">
      <h2 className="text-caption font-bold text-surface">{t("title")}</h2>
      <div className="flex flex-wrap gap-2">
        {PROJECTS.albiruni.links.map((link) => (
          <AppLinkBadge key={link.kind} link={link} />
        ))}
      </div>
    </div>
  );
}
