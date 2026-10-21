"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { FiSend } from "react-icons/fi";
import ApiService from "@/app/services/ApiService";
import { log } from "@/app/services/logger";
import { Button } from "@/app/components/shared/Button";
import { InputField } from "@/app/components/shared/InputField";
import { API_ENDPOINTS, COMPANY_INFO, whatsappUrl, type AppLocale } from "@/lib/constants";
import { PATTERNS } from "@/lib/validation";
import { WhatsAppApplyButton } from "./WhatsAppApplyButton";

/** Error messages are message keys inside the "validation" namespace. */
const applySchema = z.object({
  fullName: z.string().trim().min(1, "nameRequired"),
  email: z.string().trim().min(1, "emailRequired").email("emailInvalid"),
  phone: z.string().trim().min(1, "phoneRequired").regex(PATTERNS.phone, "phoneInvalid"),
  cvLink: z.string().trim().min(1, "linkRequired").url("linkInvalid"),
  coverNote: z.string().trim(),
});

type ApplyValues = z.infer<typeof applySchema>;

const EMPTY_APPLICATION: ApplyValues = { fullName: "", email: "", phone: "", cvLink: "", coverNote: "" };

export interface JobApplyFormProps {
  jobId: string;
  /** Already-translated title, used in the WhatsApp message. */
  jobTitle: string;
  /** Called after the backend accepted the application. */
  onSent: () => void;
  /** Shown above the fields, inside the scrolling body (the role details). */
  children?: ReactNode;
}

/**
 * Scrolling body (children + fields, two columns from sm) and a pinned footer with the actions, so "Send" stays
 * reachable however long the role details are. The footer buttons don't lift on hover (colour change only).
 * Fills the dialog panel's height.
 */
export function JobApplyForm({ jobId, jobTitle, onSent, children }: JobApplyFormProps) {
  const t = useTranslations("jobs.applyModal");
  const tValidation = useTranslations("validation");
  const brand = COMPANY_INFO.brandName[useLocale() as AppLocale];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyValues>({ resolver: zodResolver(applySchema), defaultValues: EMPTY_APPLICATION });

  const onSubmit = async (values: ApplyValues) => {
    try {
      const response = await ApiService.post(API_ENDPOINTS.jobApplication, { jobId, ...values });
      if (response.status >= 200 && response.status < 300) {
        toast.success(t("successToast"));
        reset();
        onSent();
        return;
      }
      log.warn("Job application rejected", response.status);
      toast.error(t("errorToast"));
    } catch (error) {
      log.error("Job application failed", error);
      toast.error(t("errorToast"));
    }
  };

  const errorText = (key?: string) => (key ? tValidation(key) : undefined);
  const field = { disabled: isSubmitting } as const;
  const ltrField = { ...field, dir: "ltr", inputClassName: "rtl:text-end" } as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-5 sm:py-6 sm:pe-6 sm:ps-8 sm:[scrollbar-gutter:stable]">
        {children}

        <section>
          <h3 className="mb-4 text-sm font-bold text-body">{t("formTitle")}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label={t("fullName")} placeholder={t("fullNamePlaceholder")} autoComplete="name" error={errorText(errors.fullName?.message)} {...field} {...register("fullName")} />
            <InputField type="email" label={t("email")} placeholder={t("emailPlaceholder")} autoComplete="email" error={errorText(errors.email?.message)} {...ltrField} {...register("email")} />
            <InputField type="tel" inputMode="tel" label={t("phone")} placeholder={t("phonePlaceholder")} autoComplete="tel" error={errorText(errors.phone?.message)} {...ltrField} {...register("phone")} />
            <InputField type="url" inputMode="url" label={t("cvLink")} placeholder={t("cvLinkPlaceholder")} error={errorText(errors.cvLink?.message)} {...ltrField} {...register("cvLink")} />
            <InputField as="textarea" rows={3} label={t("coverNote")} placeholder={t("coverNotePlaceholder")} className="sm:col-span-2" {...field} {...register("coverNote")} />
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-3 border-t border-edge bg-surface px-5 py-4 sm:flex-row sm:px-8">
        <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} icon={<FiSend />} iconPosition="start" flipIconInRtl lift={false} className="sm:flex-1">
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
        <WhatsAppApplyButton href={whatsappUrl(t("whatsappMessage", { brand, jobTitle }))} size="lg" className="sm:flex-1">
          {t("orApplyWhatsapp")}
        </WhatsAppApplyButton>
      </div>
    </form>
  );
}
