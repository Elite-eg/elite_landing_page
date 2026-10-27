"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiLock } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { InputField } from "@/app/components/shared/form-handlers/InputField";
import { usePhoneField } from "@/app/components/shared/form-handlers/usePhoneField";
import type { CountryCode } from "@/lib/countries";
import { EMPTY_COMPANY, companySchema, type CompanyDetails } from "../data/companySchema";
import { CheckoutPanel } from "./CheckoutPanel";
import { CountryToggle } from "./CountryToggle";

interface CompanyDetailsStepProps {
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  defaultValues?: CompanyDetails;
  onSubmit: (values: CompanyDetails) => void;
}

/** P-01 · Company details. Country lives in the parent so the order summary updates live. */
export function CompanyDetailsStep({ country, onCountryChange, defaultValues, onSubmit }: CompanyDetailsStepProps) {
  const t = useTranslations("checkout.company");
  const tValidation = useTranslations("validation");
  const schema = useMemo(() => companySchema(country), [country]);
  const form = useForm<CompanyDetails>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? EMPTY_COMPANY,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  // The automatic phone code follows the company country.
  const phone = usePhoneField({ form, codeName: "phoneCountry", numberName: "phone", fallback: country });

  const errorText = (key?: string) => (key ? tValidation(key) : undefined);

  return (
    <CheckoutPanel title={t("title")} subtitle={t("subtitle")}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <CountryToggle label={t("country")} value={country} onChange={onCountryChange} />

        <InputField
          label={t("companyName")}
          placeholder={t("companyNamePlaceholder")}
          autoComplete="organization"
          error={errorText(errors.companyName?.message)}
          {...register("companyName")}
        />
        <InputField
          label={t("taxNumber")}
          placeholder={t("taxNumberPlaceholder")}
          inputMode="numeric"
          {...register("taxNumber")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label={t("contactName")}
            placeholder={t("contactNamePlaceholder")}
            autoComplete="name"
            error={errorText(errors.contactName?.message)}
            {...register("contactName")}
          />
          <InputField as="phone" label={t("phone")} {...phone.fieldProps} />
        </div>

        <InputField
          type="email"
          dir="ltr"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          inputClassName="rtl:text-end"
          error={errorText(errors.email?.message)}
          {...register("email")}
        />

        <Button type="submit" variant="secondary" size="lg" fullWidth icon={<FiArrowRight />} flipIconInRtl>
          {t("submit")}
        </Button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-content">
          <FiLock className="size-3.5 shrink-0" aria-hidden="true" />
          {t("note")}
        </p>
      </form>
    </CheckoutPanel>
  );
}
