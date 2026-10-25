"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import ApiService from "@/app/services/ApiService";
import { log } from "@/app/services/logger";
import { useRegion } from "@/app/store/useRegion";
import { Button } from "@/app/components/shared/Button";
import { CheckboxField } from "@/app/components/shared/form-handlers/CheckboxField";
import { ChoiceChips } from "@/app/components/shared/form-handlers/ChoiceChips";
import { InputField } from "@/app/components/shared/form-handlers/InputField";
import { SelectField } from "@/app/components/shared/form-handlers/SelectField";
import { usePhoneField } from "@/app/components/shared/form-handlers/usePhoneField";
import { Link } from "@/i18n/navigation";
import { fadeInUp } from "@/lib/animations";
import { API_ENDPOINTS, COMPANY_INFO, REGIONS, ROUTES, type AppLocale } from "@/lib/constants";
import { internationalPhone } from "@/lib/phone";
import { BUSINESS_ACTIVITIES, ERP_EXPERIENCE, SALES_TEAM_SIZES } from "../data/agentsData";
import { agencySchema, emptyAgencyValues, type AgencyValues, type SentAgencyApplication } from "../data/agencySchema";

export interface AgencyFormProps {
  /** Called once the backend accepted the application (2xx), with what to show in the confirmation. */
  onSent: (application: SentAgencyApplication) => void;
}

/**
 * Agency application: two columns from sm, the chip questions, company summary and consent full width.
 * The country starts at the visitor's region, and the phone code follows the country until the visitor picks a code
 * themselves.
 */
export function AgencyForm({ onSent }: AgencyFormProps) {
  const t = useTranslations("agents.form");
  const tValidation = useTranslations("validation");
  const tCountries = useTranslations("countries");
  const locale = useLocale() as AppLocale;
  const { region } = useRegion();
  const form = useForm<AgencyValues>({
    resolver: zodResolver(agencySchema),
    defaultValues: emptyAgencyValues(region),
  });
  const {
    register,
    control,
    handleSubmit,
    resetField,
    getFieldState,
    watch,
    formState: { errors, isSubmitting },
  } = form;
  const phone = usePhoneField({ form, codeName: "phoneCountry", numberName: "phone", fallback: watch("country") });

  // The saved region is restored after hydration: follow it until the visitor picks a country.
  useEffect(() => {
    if (!getFieldState("country").isDirty) resetField("country", { defaultValue: region });
  }, [region, getFieldState, resetField]);

  const onSubmit = async ({ phoneCountry: pickedCode, phone: number, ...values }: AgencyValues) => {
    const application: SentAgencyApplication = { ...values, phone: internationalPhone(pickedCode || phone.code, number) };
    try {
      const response = await ApiService.post(API_ENDPOINTS.agencyApplication, application);
      if (response.status >= 200 && response.status < 300) {
        onSent(application);
        return;
      }
      log.warn("Agency application rejected", response.status);
      toast.error(t("errorToast"));
    } catch (error) {
      log.error("Agency application failed", error);
      toast.error(t("errorToast"));
    }
  };

  const errorText = (key?: string) => (key ? tValidation(key) : undefined);
  const field = { disabled: isSubmitting } as const;

  return (
    <motion.form
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={t("title")}
      className="grid gap-x-4 gap-y-5 sm:grid-cols-2"
    >
      <InputField label={t("companyName")} placeholder={t("companyNamePlaceholder")} autoComplete="organization" error={errorText(errors.companyName?.message)} {...field} {...register("companyName")} />
      <InputField label={t("contactName")} placeholder={t("contactNamePlaceholder")} autoComplete="name" error={errorText(errors.contactName?.message)} {...field} {...register("contactName")} />
      <Controller
        name="country"
        control={control}
        render={({ field: country }) => (
          <SelectField
            label={t("country")}
            options={REGIONS.map(({ code }) => ({ value: code, label: tCountries(code) }))}
            {...country}
            {...field}
          />
        )}
      />
      <InputField label={t("city")} placeholder={t("cityPlaceholder")} autoComplete="address-level2" error={errorText(errors.city?.message)} {...field} {...register("city")} />
      <InputField as="phone" label={t("phone")} {...phone.fieldProps} error={errorText(errors.phone?.message)} {...field} />
      <InputField type="email" dir="ltr" inputClassName="rtl:text-end" label={t("email")} placeholder={t("emailPlaceholder")} autoComplete="email" error={errorText(errors.email?.message)} {...field} {...register("email")} />
      <InputField dir="ltr" inputClassName="rtl:text-end" label={t("commercialRegister")} placeholder={t("commercialRegisterPlaceholder")} error={errorText(errors.commercialRegister?.message)} {...field} {...register("commercialRegister")} />
      <Controller
        name="salesTeamSize"
        control={control}
        render={({ field: salesTeamSize }) => (
          <SelectField
            label={t("salesTeamSize")}
            placeholder={t("salesTeamSizePlaceholder")}
            options={SALES_TEAM_SIZES.map((size) => ({ value: size, label: t(`salesTeamSizes.${size}`) }))}
            error={errorText(errors.salesTeamSize?.message)}
            {...salesTeamSize}
            {...field}
          />
        )}
      />
      <Controller
        name="activities"
        control={control}
        render={({ field: activities }) => (
          <ChoiceChips
            multiple
            label={t("activities")}
            options={BUSINESS_ACTIVITIES.map((key) => ({ value: key, label: t(`activityOptions.${key}`) }))}
            value={activities.value}
            onChange={activities.onChange}
            error={errorText(errors.activities?.message)}
            className="sm:col-span-2"
            {...field}
          />
        )}
      />
      <Controller
        name="erpExperience"
        control={control}
        render={({ field: erpExperience }) => (
          <ChoiceChips
            label={t("erpExperience")}
            options={ERP_EXPERIENCE.map((key) => ({ value: key, label: t(`erpExperienceOptions.${key}`) }))}
            value={erpExperience.value}
            onChange={erpExperience.onChange}
            error={errorText(errors.erpExperience?.message)}
            className="sm:col-span-2"
            {...field}
          />
        )}
      />
      <InputField as="textarea" rows={4} label={t("about")} placeholder={t("aboutPlaceholder")} error={errorText(errors.about?.message)} className="sm:col-span-2" {...field} {...register("about")} />
      <Controller
        name="consent"
        control={control}
        render={({ field: consent }) => (
          <CheckboxField
            label={t.rich("consent", {
              brand: COMPANY_INFO.brandName[locale],
              link: (chunks) => (
                <Link href={ROUTES.legal.privacy} className="underline underline-offset-2 transition-colors hover:text-primary">
                  {chunks}
                </Link>
              ),
            })}
            checked={consent.value}
            onChange={consent.onChange}
            onBlur={consent.onBlur}
            name={consent.name}
            ref={consent.ref}
            error={errorText(errors.consent?.message)}
            className="sm:col-span-2"
            {...field}
          />
        )}
      />

      <Button type="submit" variant="secondary" size="lg" fullWidth isLoading={isSubmitting} className="sm:col-span-2">
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </motion.form>
  );
}
