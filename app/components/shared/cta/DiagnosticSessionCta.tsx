import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { ROUTES, WHATSAPP_URL } from "@/lib/constants";
import { CtaBanner } from "./CtaBanner";

/** "Start with a free diagnostic session" closing banner: book the session (main action) or chat on WhatsApp. */
export function DiagnosticSessionCta() {
  const t = useTranslations("diagnosticSessionCta");

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
