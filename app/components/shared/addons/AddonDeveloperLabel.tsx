import { useTranslations } from "next-intl";
import { LuShieldCheck } from "react-icons/lu";
import { Badge } from "@/app/components/shared/Badge";
import type { AddonDeveloper } from "@/lib/addons";
import { cn } from "@/lib/utils";

export interface AddonDeveloperLabelProps {
  developer: AddonDeveloper;
  /** Also mark partner developers as certified (add-on page). Official add-ons are always marked. */
  showCertified?: boolean;
  /** Text colour and weight of the name (default: muted caption). */
  className?: string;
}

/** Developer name + its badge: "Official" for the company's own add-ons, "Certified developer" for partners. */
export function AddonDeveloperLabel({ developer, showCertified = false, className }: AddonDeveloperLabelProps) {
  const t = useTranslations("addons.developer");

  return (
    <p className={cn("flex flex-wrap items-center gap-2 text-caption text-content", className)}>
      <span>{developer.name}</span>
      {developer.official ? (
        <Badge variant="primary">{t("official")}</Badge>
      ) : (
        showCertified && (
          <Badge variant="primary" icon={<LuShieldCheck className="size-3.5" />}>
            {t("certified")}
          </Badge>
        )
      )}
    </p>
  );
}
