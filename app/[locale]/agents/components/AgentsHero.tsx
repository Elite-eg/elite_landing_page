import { useTranslations } from "next-intl";
import { Button } from "@/app/components/shared/Button";
import { NavyHero } from "@/app/components/shared/NavyHero";
import { AGENCY_FORM_HREF, OUR_AGENT_HREF } from "../data/agentsData";

/** Navy hero (Figma v4 "Agents"): apply → the application form, meet our agent → the agent card. */
export function AgentsHero() {
  const t = useTranslations("agents.hero");

  return (
    <NavyHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")}>
      <Button href={AGENCY_FORM_HREF} variant="secondary" size="lg">
        {t("apply")}
      </Button>
      <Button href={OUR_AGENT_HREF} variant="glass" size="lg">
        {t("meetAgent")}
      </Button>
    </NavyHero>
  );
}
