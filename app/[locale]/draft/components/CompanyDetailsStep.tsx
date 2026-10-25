"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiLock } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { InputField } from "@/app/components/shared/form-handlers/InputField";
import type { RegionCode } from "@/lib/constants";
import { PATTERNS } from "@/lib/validation";
import type { CompanyDetails } from "../data/checkoutData";
import { CheckoutPanel } from "./CheckoutPanel";
import { CountryToggle } from "./CountryToggle";

/** Error messages are message keys inside the "validation" namespace. */
const companySchema = z.object({
  companyName: z.string().trim().min(1, "companyNameRequired"),
  taxNumber: z.string().trim(),
  contactName: z.string().trim().min(1, "nameRequired"),
  phone: z.string().trim().min(1, "phoneRequired").regex(PATTERNS.phone, "phoneInvalid"),
  email: z.string().trim().min(1, "emailRequired").email("emailInvalid"),
}) satisfies z.ZodType<CompanyDetails>;

interface CompanyDetailsStepProps {
  country: RegionCode;
  onCountryChange: (country: RegionCode) => void;
  defaultValues?: CompanyDetails;
  onSubmit: (values: CompanyDetails) => void;
}

const EMPTY_COMPANY: CompanyDetails = { companyName: "", taxNumber: "", contactName: "", phone: "", email: "" };

/** P-01 · Company details. Country lives in the parent so the order summary updates live. */
export function CompanyDetailsStep({ country, onCountryChange, defaultValues, onSubmit }: CompanyDetailsStepProps) {
  const t = useTranslations("checkout.company");
  const tValidation = useTranslations("validation");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyDetails>({
    resolver: zodResolver(companySchema),
    defaultValues: defaultValues ?? EMPTY_COMPANY,
  });

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
          <InputField
            type="tel"
            inputMode="tel"
            dir="ltr"
            label={t("phone")}
            placeholder={t(`phonePlaceholder.${country}`)}
            autoComplete="tel"
            inputClassName="rtl:text-end"
            error={errorText(errors.phone?.message)}
            {...register("phone")}
          />
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
