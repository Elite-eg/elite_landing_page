"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import ApiService from "@/app/services/ApiService";
import { log } from "@/app/services/logger";
import { useCountry } from "@/app/store/useCountry";
import { FormCard } from "@/app/components/shared/form-handlers/FormCard";
import { FormLayout } from "@/app/components/shared/form-handlers/FormLayout";
import { InputField } from "@/app/components/shared/form-handlers/InputField";
import { usePhoneField } from "@/app/components/shared/form-handlers/usePhoneField";
import { API_ENDPOINTS } from "@/lib/constants";
import type { CountryCode } from "@/lib/countries";
import { internationalPhone } from "@/lib/phone";
import { mobileNumberCheck, phoneFieldsSchema } from "@/lib/validation";
import type { GuideKey } from "./guidesData";

/**
 * Error messages are message keys inside the "validation" namespace. Built per country: the WhatsApp number is
 * checked against the automatic code (the visitor's country) until the visitor picks one.
 */
const guideRequestSchema = (country: CountryCode) =>
  z
    .object({
      name: z.string().trim().min(1, "nameRequired"),
      ...phoneFieldsSchema(),
    })
    .superRefine(mobileNumberCheck(country));

type GuideRequestValues = z.infer<ReturnType<typeof guideRequestSchema>>;

const EMPTY_REQUEST: GuideRequestValues = { name: "", phoneCountry: "", phone: "" };

interface GuideRequestFormProps {
  guide: GuideKey;
}

/**
 * Name + WhatsApp number (the shared phone field: dial code from the visitor's country, checked per country), in the
 * shared form card and layout.
 */
export function GuideRequestForm({ guide }: GuideRequestFormProps) {
  const t = useTranslations("guides.common.form");
  const tValidation = useTranslations("validation");
  const { country } = useCountry();
  const schema = useMemo(() => guideRequestSchema(country.code), [country]);
  const form = useForm<GuideRequestValues>({ resolver: zodResolver(schema), defaultValues: EMPTY_REQUEST });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;
  const phone = usePhoneField({ form, codeName: "phoneCountry", numberName: "phone" });

  const onSubmit = async ({ phoneCountry: pickedCode, phone: number, ...values }: GuideRequestValues) => {
    try {
      const response = await ApiService.post(API_ENDPOINTS.guideRequest, {
        guide,
        ...values,
        phone: internationalPhone(pickedCode || phone.code, number),
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success(t("success"));
        reset();
        return;
      }
      log.warn("Guide request rejected", response.status);
      toast.error(t("error"));
    } catch (error) {
      log.error("Guide request failed", error);
      toast.error(t("error"));
    }
  };

  const errorText = (key?: string) => (key ? tValidation(key) : undefined);

  return (
    <FormCard>
      <FormLayout
        title={t("label")}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel={t("submit")}
        submittingLabel={t("submitting")}
        isSubmitting={isSubmitting}
        note={t("note")}
      >
        <InputField
          label={t("name")}
          placeholder={t("namePlaceholder")}
          autoComplete="name"
          error={errorText(errors.name?.message)}
          disabled={isSubmitting}
          {...register("name")}
        />
        <InputField as="phone" label={t("phone")} {...phone.fieldProps} disabled={isSubmitting} />
      </FormLayout>
    </FormCard>
  );
}
