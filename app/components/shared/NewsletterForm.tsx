"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { FiMail, FiSend } from "react-icons/fi";
import ApiService from "@/app/services/ApiService";
import { log } from "@/app/services/logger";
import { API_ENDPOINTS } from "@/lib/constants";
import { Button } from "./Button";
import { InputField } from "./InputField";

/** Error messages are message keys inside the "validation" namespace. */
const newsletterSchema = z.object({
  email: z.string().trim().min(1, "emailRequired").email("emailInvalid"),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const t = useTranslations("footer.newsletter");
  const tValidation = useTranslations("validation");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: NewsletterValues) => {
    try {
      const response = await ApiService.post(API_ENDPOINTS.newsletter, values);
      if (response.status >= 200 && response.status < 300) {
        toast.success(t("success"));
        reset();
        return;
      }
      log.warn("Newsletter subscription rejected", response.status);
      toast.error(t("error"));
    } catch (error) {
      log.error("Newsletter subscription failed", error);
      toast.error(t("error"));
    }
  };

  const errorKey = errors.email?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-3 sm:flex-row sm:items-start">
      <InputField
        type="email"
        autoComplete="email"
        label={t("label")}
        hideLabel
        placeholder={t("placeholder")}
        icon={<FiMail className="size-4" />}
        error={errorKey ? tValidation(errorKey) : undefined}
        disabled={isSubmitting}
        dir="ltr"
        {...register("email")}
      />
      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        icon={<FiSend className="size-4 rtl:-scale-x-100" />}
        className="shrink-0"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
