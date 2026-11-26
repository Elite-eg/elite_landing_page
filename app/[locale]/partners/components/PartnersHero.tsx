import { useTranslations } from "next-intl";
import { Button } from "@/app/components/shared/Button";
import { NavyHero } from "@/app/components/shared/NavyHero";
import { whatsappUrl } from "@/lib/constants";
import { PARTNER_FORM_HREF } from "../data/partnersData";

/** Navy hero (Figma v4 "Partners"): join → the form below, or ask on WhatsApp with a prefilled message. */
export function PartnersHero() {
  const t = useTranslations("partners.hero");

  return (
    <NavyHero eyebrow={t("eyebrow")} title={t.rich("title", { br: () => <br /> })} subtitle={t("subtitle")}>
      <Button href={PARTNER_FORM_HREF} variant="secondary" size="lg">
        {t("join")}
      </Button>
      <Button href={whatsappUrl(t("whatsappMessage"))} external variant="glass" size="lg">
        {t("whatsapp")}
      </Button>
    </NavyHero>
  );
}
