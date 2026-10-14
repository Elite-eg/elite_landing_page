import { useTranslations } from "next-intl";
import { FiBriefcase, FiSend } from "react-icons/fi";
import { JOBS_OPEN_POSITIONS_HREF, ROUTES } from "@/lib/constants";
import { CtaBanner } from "./CtaBanner";

/** "Join the team" closing banner. Drop it at the end of any page. */
export function JoinTeamCta() {
  const t = useTranslations("joinTeamCta");

  return (
    <CtaBanner
      title={t("title")}
      subtitle={t("subtitle")}
      primaryAction={{ label: t("primary"), href: ROUTES.jobs, icon: <FiBriefcase /> }}
      secondaryAction={{ label: t("secondary"), href: JOBS_OPEN_POSITIONS_HREF, icon: <FiSend /> }}
    />
  );
}
