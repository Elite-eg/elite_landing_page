"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import ApiService from "@/app/services/ApiService";
import { log } from "@/app/services/logger";
import { Button } from "@/app/components/shared/Button";
import { InputField } from "@/app/components/shared/InputField";
import { API_ENDPOINTS, COMPANY_INFO, whatsappUrl, type AppLocale } from "@/lib/constants";
import { PATTERNS } from "@/lib/validation";

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
}

export function JobApplyForm({ jobId, jobTitle, onSent }: JobApplyFormProps) {
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <InputField label={t("fullName")} placeholder={t("fullNamePlaceholder")} autoComplete="name" error={errorText(errors.fullName?.message)} {...field} {...register("fullName")} />
      <InputField type="email" label={t("email")} placeholder={t("emailPlaceholder")} autoComplete="email" error={errorText(errors.email?.message)} {...ltrField} {...register("email")} />
      <InputField type="tel" inputMode="tel" label={t("phone")} placeholder={t("phonePlaceholder")} autoComplete="tel" error={errorText(errors.phone?.message)} {...ltrField} {...register("phone")} />
      <InputField type="url" inputMode="url" label={t("cvLink")} placeholder={t("cvLinkPlaceholder")} error={errorText(errors.cvLink?.message)} {...ltrField} {...register("cvLink")} />
      <InputField as="textarea" rows={3} label={t("coverNote")} placeholder={t("coverNotePlaceholder")} {...field} {...register("coverNote")} />

      <div className="space-y-3 pt-2">
        <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting} icon={<FiSend />} iconPosition="start" flipIconInRtl className="shadow-md">
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
        <Button
          href={whatsappUrl(t("whatsappMessage", { brand, jobTitle }))}
          external
          variant="outline"
          fullWidth
          icon={<FaWhatsapp className="text-whatsapp" />}
          iconPosition="start"
          className="border-whatsapp/40 bg-whatsapp/10 text-whatsapp-dark hover:border-whatsapp/40 hover:bg-whatsapp/20 hover:shadow-none"
        >
          {t("orApplyWhatsapp")}
        </Button>
      </div>
    </form>
  );
}
