"use client";

import { useLocale, useTranslations } from "next-intl";
import { FiHome } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { SuccessPanel } from "@/app/components/shared/SuccessPanel";
import { ROUTES, type AppLocale } from "@/lib/constants";
import { countryByCode } from "@/lib/countries";
import type { SentPartnerApplication } from "../data/partnerSchema";

export interface PartnerSuccessProps {
  application: SentPartnerApplication;
}

/** Shown in the form's card once the application was accepted: what we received, then back home. */
export function PartnerSuccess({ application }: PartnerSuccessProps) {
  const t = useTranslations("partners");
  const locale = useLocale() as AppLocale;

  return (
    <SuccessPanel
      as="h2"
      focusTitle
      title={t("success.title")}
      subtitle={t("success.subtitle")}
      details={[
        { label: t("form.officeName"), value: application.officeName },
        { label: t("form.fullName"), value: application.fullName },
        {
          label: t("form.city"),
          value: `${countryByCode(application.country).name[locale]} · ${t(`form.cities.${application.city}`)}`,
        },
        { label: t("form.phone"), value: application.phone, ltr: true },
        { label: t("form.email"), value: application.email, ltr: true },
        { label: t("form.clientCount"), value: t(`form.clientCounts.${application.clientCount}`) },
        { label: t("form.officeType"), value: t(`form.officeTypes.${application.officeType}`), emphasis: true },
      ]}
    >
      <Button
        href={ROUTES.home}
        variant="primary"
        icon={<FiHome />}
        iconPosition="start"
        className="mx-auto bg-primary-deep shadow-md hover:bg-primary-dark"
      >
        {t("success.backHome")}
      </Button>
    </SuccessPanel>
  );
}
