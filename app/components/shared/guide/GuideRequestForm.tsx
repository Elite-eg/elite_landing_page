"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { FiDownload, FiLock } from "react-icons/fi";
import ApiService from "@/app/services/ApiService";
import { log } from "@/app/services/logger";
import { Button } from "@/app/components/shared/Button";
import { InputField } from "@/app/components/shared/InputField";
import { API_ENDPOINTS } from "@/lib/constants";
import { PATTERNS } from "@/lib/validation";
import type { GuideKey } from "./guidesData";

/** Error messages are message keys inside the "validation" namespace. */
const guideRequestSchema = z.object({
  name: z.string().trim().min(1, "nameRequired"),
  phone: z.string().trim().min(1, "phoneRequired").regex(PATTERNS.phone, "phoneInvalid"),
});

type GuideRequestValues = z.infer<typeof guideRequestSchema>;

interface GuideRequestFormProps {
  guide: GuideKey;
}

export function GuideRequestForm({ guide }: GuideRequestFormProps) {
  const t = useTranslations("guides.common.form");
  const tValidation = useTranslations("validation");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GuideRequestValues>({
    resolver: zodResolver(guideRequestSchema),
    defaultValues: { name: "", phone: "" },
  });

  const onSubmit = async (values: GuideRequestValues) => {
    try {
      const response = await ApiService.post(API_ENDPOINTS.guideRequest, { guide, ...values });
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={t("label")}
      className="rounded-2xl border border-edge bg-surface p-4 shadow-card sm:p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <InputField
          label={t("name")}
          placeholder={t("namePlaceholder")}
          autoComplete="name"
          error={errorText(errors.name?.message)}
          disabled={isSubmitting}
          {...register("name")}
        />
        <InputField
          type="tel"
          inputMode="tel"
          dir="ltr"
          label={t("phone")}
          placeholder={t("phonePlaceholder")}
          autoComplete="tel"
          inputClassName="rtl:text-end"
          error={errorText(errors.phone?.message)}
          disabled={isSubmitting}
          {...register("phone")}
        />
      </div>

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
        icon={<FiDownload />}
        iconPosition="start"
        className="mt-4"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-content">
        <FiLock className="size-3.5 shrink-0" aria-hidden="true" />
        {t("note")}
      </p>
    </form>
  );
}
