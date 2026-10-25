"use client";

import { useEffect, useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import ApiService from "@/app/services/ApiService";
import { log } from "@/app/services/logger";
import { useRegion } from "@/app/store/useRegion";
import { Button } from "@/app/components/shared/Button";
import { InputField } from "@/app/components/shared/form-handlers/InputField";
import { SelectField } from "@/app/components/shared/form-handlers/SelectField";
import { usePhoneField } from "@/app/components/shared/form-handlers/usePhoneField";
import { Link } from "@/i18n/navigation";
import { fadeInUp } from "@/lib/animations";
import { API_ENDPOINTS, REGIONS, ROUTES } from "@/lib/constants";
import { internationalPhone } from "@/lib/phone";
import { COMPANY_SIZES, CONTACT_NEEDS } from "../data/contactData";
import {
  contactSchema,
  emptyContactValues,
  type ContactValues,
  type SentContactRequest,
} from "../data/contactSchema";

export interface ContactFormProps {
  /** Called once the backend accepted the request (2xx), with what to show in the confirmation. */
  onSent: (request: SentContactRequest) => void;
  /** Focus the first field when shown (the visitor came back from the confirmation to send another message). */
  focusFirstField?: boolean;
}

/**
 * Contact request: two columns from sm, the needs and message rows full width. The country starts at the visitor's
 * region, and the phone code follows the country until the visitor picks a code themselves.
 */
export function ContactForm({ onSent, focusFirstField = false }: ContactFormProps) {
  const t = useTranslations("contact.form");
  const tValidation = useTranslations("validation");
  const tCountries = useTranslations("countries");
  const countryOptions = REGIONS.map(({ code }) => ({ value: code, label: tCountries(code) }));
  const titleId = useId();
  const { region } = useRegion();
  const form = useForm<ContactValues>({ resolver: zodResolver(contactSchema), defaultValues: emptyContactValues(region) });
  const {
    register,
    control,
    handleSubmit,
    resetField,
    setFocus,
    getFieldState,
    watch,
    formState: { errors, isSubmitting },
  } = form;
  // The automatic phone code follows the Country field.
  const phone = usePhoneField({ form, codeName: "phoneCountry", numberName: "phone", fallback: watch("country") });

  // The saved region is restored after hydration: follow it until the visitor picks a country.
  useEffect(() => {
    if (!getFieldState("country").isDirty) resetField("country", { defaultValue: region });
  }, [region, getFieldState, resetField]);

  useEffect(() => {
    if (focusFirstField) setFocus("fullName");
  }, [focusFirstField, setFocus]);

  const onSubmit = async ({ phoneCountry: pickedCode, phone: number, ...values }: ContactValues) => {
    const request: SentContactRequest = { ...values, phone: internationalPhone(pickedCode || phone.code, number) };
    try {
      const response = await ApiService.post(API_ENDPOINTS.contactRequest, request);
      if (response.status >= 200 && response.status < 300) {
        onSent(request);
        return;
      }
      log.warn("Contact request rejected", response.status);
      toast.error(t("errorToast"));
    } catch (error) {
      log.error("Contact request failed", error);
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
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="text-h3 font-bold text-body">
        {t("title")}
      </h2>

      <div className="mt-[1.125rem] grid gap-[1.125rem] sm:grid-cols-2">
        <InputField label={t("fullName")} placeholder={t("fullNamePlaceholder")} autoComplete="name" error={errorText(errors.fullName?.message)} {...field} {...register("fullName")} />
        <InputField label={t("companyName")} placeholder={t("companyNamePlaceholder")} autoComplete="organization" error={errorText(errors.companyName?.message)} {...field} {...register("companyName")} />
        <InputField type="email" dir="ltr" inputClassName="rtl:text-end" label={t("email")} placeholder={t("emailPlaceholder")} autoComplete="email" error={errorText(errors.email?.message)} {...field} {...register("email")} />
        <InputField
          as="phone"
          label={t("phone")}
          {...phone.fieldProps}
          error={errorText(errors.phone?.message)}
          {...field}
        />
        <Controller
          name="country"
          control={control}
          render={({ field: country }) => (
            <SelectField label={t("country")} options={countryOptions} {...country} {...field} />
          )}
        />
        <Controller
          name="companySize"
          control={control}
          render={({ field: companySize }) => (
            <SelectField
              label={t("companySize")}
              placeholder={t("companySizePlaceholder")}
              options={COMPANY_SIZES.map((size) => ({ value: size, label: t(`companySizes.${size}`) }))}
              error={errorText(errors.companySize?.message)}
              {...companySize}
              {...field}
            />
          )}
        />
        <Controller
          name="need"
          control={control}
          render={({ field: need }) => (
            <SelectField
              label={t("need")}
              placeholder={t("needPlaceholder")}
              options={CONTACT_NEEDS.map((key) => ({ value: key, label: t(`needs.${key}`) }))}
              error={errorText(errors.need?.message)}
              className="sm:col-span-2"
              {...need}
              {...field}
            />
          )}
        />
        <InputField as="textarea" rows={3} label={t("message")} placeholder={t("messagePlaceholder")} className="sm:col-span-2" {...field} {...register("message")} />
      </div>

      <Button type="submit" variant="secondary" size="lg" fullWidth isLoading={isSubmitting} icon={<FiArrowRight />} flipIconInRtl className="mt-[1.125rem]">
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>

      <p className="mt-3 text-xs text-ink-400">
        {t.rich("privacyNote", {
          link: (chunks) => (
            <Link href={ROUTES.legal.privacy} className="underline underline-offset-2 transition-colors hover:text-primary">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </motion.form>
  );
}
