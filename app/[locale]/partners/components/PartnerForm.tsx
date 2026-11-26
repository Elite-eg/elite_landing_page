"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import ApiService from "@/app/services/ApiService";
import { log } from "@/app/services/logger";
import { useCountry } from "@/app/store/useCountry";
import { ChoiceChips } from "@/app/components/shared/form-handlers/ChoiceChips";
import { FORM_NOTE_LINK_CLASSES } from "@/app/components/shared/form-handlers/fieldStyles";
import { FormLayout } from "@/app/components/shared/form-handlers/FormLayout";
import { InputField } from "@/app/components/shared/form-handlers/InputField";
import { SelectField } from "@/app/components/shared/form-handlers/SelectField";
import { usePhoneField } from "@/app/components/shared/form-handlers/usePhoneField";
import { Link } from "@/i18n/navigation";
import { API_ENDPOINTS, ROUTES } from "@/lib/constants";
import { internationalPhone } from "@/lib/phone";
import { CLIENT_COUNT_RANGES, OFFICE_TYPES, PARTNER_CITIES, PARTNER_TERMS_HREF } from "../data/partnersData";
import {
  EMPTY_PARTNER_VALUES,
  partnerSchema,
  type PartnerValues,
  type SentPartnerApplication,
} from "../data/partnerSchema";

export interface PartnerFormProps {
  /** Called once the backend accepted the application (2xx), with what to show in the confirmation. */
  onSent: (application: SentPartnerApplication) => void;
}

/**
 * Partner program application in the shared form layout: two columns from sm, office type full width, the terms and
 * privacy note under the button. The city list and the automatic phone code follow the visitor's country.
 */
export function PartnerForm({ onSent }: PartnerFormProps) {
  const t = useTranslations("partners.form");
  const tValidation = useTranslations("validation");
  const { country } = useCountry();
  const schema = useMemo(() => partnerSchema(country.code), [country]);
  const form = useForm<PartnerValues>({ resolver: zodResolver(schema), defaultValues: EMPTY_PARTNER_VALUES });
  const {
    register,
    control,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors, isSubmitting },
  } = form;
  const phone = usePhoneField({ form, codeName: "phoneCountry", numberName: "phone" });
  const cities: readonly string[] = PARTNER_CITIES[country.code];

  // A country switch keeps the city only if the new country lists it ("other").
  useEffect(() => {
    const city = getValues("city");
    if (city && !cities.includes(city)) resetField("city");
  }, [cities, getValues, resetField]);

  const onSubmit = async ({ phoneCountry: pickedCode, phone: number, ...values }: PartnerValues) => {
    const application: SentPartnerApplication = {
      ...values,
      country: country.code,
      phone: internationalPhone(pickedCode || phone.code, number),
    };
    try {
      const response = await ApiService.post(API_ENDPOINTS.partnerApplication, application);
      if (response.status >= 200 && response.status < 300) {
        onSent(application);
        return;
      }
      log.warn("Partner application rejected", response.status);
      toast.error(t("errorToast"));
    } catch (error) {
      log.error("Partner application failed", error);
      toast.error(t("errorToast"));
    }
  };

  const errorText = (key?: string) => (key ? tValidation(key) : undefined);
  const field = { disabled: isSubmitting } as const;

  return (
    <FormLayout
      title={t("title")}
      subtitle={t("subtitle")}
      onSubmit={handleSubmit(onSubmit)}
      submitLabel={t("submit")}
      submittingLabel={t("submitting")}
      isSubmitting={isSubmitting}
      note={t.rich("privacyNote", {
        terms: (chunks) => (
          <Link href={PARTNER_TERMS_HREF} className={FORM_NOTE_LINK_CLASSES}>
            {chunks}
          </Link>
        ),
        privacy: (chunks) => (
          <Link href={ROUTES.legal.privacy} className={FORM_NOTE_LINK_CLASSES}>
            {chunks}
          </Link>
        ),
      })}
    >
      <InputField label={t("officeName")} placeholder={t("officeNamePlaceholder")} autoComplete="organization" error={errorText(errors.officeName?.message)} {...field} {...register("officeName")} />
      <InputField label={t("fullName")} placeholder={t("fullNamePlaceholder")} autoComplete="name" error={errorText(errors.fullName?.message)} {...field} {...register("fullName")} />
      <InputField as="phone" label={t("phone")} {...phone.fieldProps} {...field} />
      <InputField type="email" dir="ltr" inputClassName="rtl:text-end" label={t("email")} placeholder={t("emailPlaceholder")} autoComplete="email" error={errorText(errors.email?.message)} {...field} {...register("email")} />
      <Controller
        name="city"
        control={control}
        render={({ field: city }) => (
          <SelectField
            label={t("city")}
            placeholder={t("cityPlaceholder")}
            options={cities.map((key) => ({ value: key, label: t(`cities.${key}`) }))}
            error={errorText(errors.city?.message)}
            {...city}
            {...field}
          />
        )}
      />
      <Controller
        name="clientCount"
        control={control}
        render={({ field: clientCount }) => (
          <SelectField
            label={t("clientCount")}
            placeholder={t("clientCountPlaceholder")}
            options={CLIENT_COUNT_RANGES.map((key) => ({ value: key, label: t(`clientCounts.${key}`) }))}
            error={errorText(errors.clientCount?.message)}
            {...clientCount}
            {...field}
          />
        )}
      />
      <Controller
        name="officeType"
        control={control}
        render={({ field: officeType }) => (
          <ChoiceChips
            label={t("officeType")}
            options={OFFICE_TYPES.map((key) => ({ value: key, label: t(`officeTypes.${key}`) }))}
            value={officeType.value}
            onChange={officeType.onChange}
            error={errorText(errors.officeType?.message)}
            className="sm:col-span-2"
            {...field}
          />
        )}
      />
    </FormLayout>
  );
}
