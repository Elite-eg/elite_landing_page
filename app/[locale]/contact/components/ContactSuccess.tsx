"use client";

import { useLocale, useTranslations } from "next-intl";
import { FiEdit3, FiHome } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { SuccessPanel } from "@/app/components/shared/SuccessPanel";
import { ROUTES, type AppLocale } from "@/lib/constants";
import { countryByCode } from "@/lib/countries";
import type { SentContactRequest } from "../data/contactSchema";

export interface ContactSuccessProps {
  request: SentContactRequest;
  /** Back to an empty form. */
  onNewMessage: () => void;
}

/**
 * Shown in the form's card once the request was accepted: everything we received (long values cut, the message to
 * 3 lines, full text on hover), then "new message" or "home".
 */
export function ContactSuccess({ request, onNewMessage }: ContactSuccessProps) {
  const t = useTranslations("contact");
  const locale = useLocale() as AppLocale;

  return (
    <SuccessPanel
      as="h2"
      focusTitle
      title={t("success.title")}
      subtitle={t("success.subtitle")}
      details={[
        { label: t("form.fullName"), value: request.fullName },
        { label: t("form.companyName"), value: request.companyName },
        { label: t("form.email"), value: request.email, ltr: true },
        { label: t("form.phone"), value: request.phone, ltr: true },
        { label: t("form.country"), value: countryByCode(request.country).name[locale] },
        { label: t("form.companySize"), value: t(`form.companySizes.${request.companySize}`) },
        { label: t("form.need"), value: t(`form.needs.${request.need}`), emphasis: true },
        ...(request.message ? [{ label: t("success.message"), value: request.message, wide: true }] : []),
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="outline" fullWidth icon={<FiEdit3 />} iconPosition="start" onClick={onNewMessage}>
          {t("success.newMessage")}
        </Button>
        <Button
          href={ROUTES.home}
          variant="primary"
          fullWidth
          icon={<FiHome />}
          iconPosition="start"
          className="bg-primary-deep shadow-md hover:bg-primary-dark"
        >
          {t("success.backHome")}
        </Button>
      </div>
    </SuccessPanel>
  );
}
