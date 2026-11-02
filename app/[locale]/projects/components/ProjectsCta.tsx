import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { CtaBanner } from "@/app/components/shared/cta/CtaBanner";
import { ROUTES, WHATSAPP_URL } from "@/lib/constants";

/** Closing banner: book a free diagnostic session (main action) or chat on WhatsApp. */
export function ProjectsCta() {
  const t = useTranslations("projects.cta");

  return (
    <CtaBanner
      title={t("title")}
      subtitle={t("subtitle")}
      primaryAction={{
        label: t("book"),
        href: ROUTES.bookSession,
        icon: <FiArrowRight />,
        iconPosition: "end",
        flipIconInRtl: true,
      }}
      secondaryAction={{ label: t("whatsapp"), href: WHATSAPP_URL, external: true }}
      secondaryVariant="glass"
    />
  );
}
