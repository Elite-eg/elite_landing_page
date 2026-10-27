"use client";

import { useLocale, useTranslations } from "next-intl";
import { FiHome } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { SuccessPanel } from "@/app/components/shared/SuccessPanel";
import { ROUTES, type AppLocale } from "@/lib/constants";
import { countryByCode } from "@/lib/countries";
import type { SentAgencyApplication } from "../data/agencySchema";

export interface AgencySuccessProps {
  application: SentAgencyApplication;
}

/** Shown in the form's card once the application was accepted: what we received, then back home. */
export function AgencySuccess({ application }: AgencySuccessProps) {
  const t = useTranslations("agents");
  const locale = useLocale() as AppLocale;

  return (
    <SuccessPanel
      as="h3"
      focusTitle
      title={t("success.title")}
      subtitle={t("success.subtitle")}
      details={[
        { label: t("form.companyName"), value: application.companyName },
        { label: t("form.contactName"), value: application.contactName },
        { label: t("form.country"), value: `${countryByCode(application.country).name[locale]} · ${application.city}` },
        { label: t("form.phone"), value: application.phone, ltr: true },
        { label: t("form.email"), value: application.email, ltr: true },
        { label: t("form.salesTeamSize"), value: t(`form.salesTeamSizes.${application.salesTeamSize}`), emphasis: true },
        { label: t("form.about"), value: application.about, wide: true },
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
