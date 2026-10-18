"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { InputField } from "@/app/components/shared/InputField";
import { fadeInUp } from "@/lib/animations";
import { PATTERNS } from "@/lib/validation";

/** Error messages are message keys inside the "validation" namespace. */
const detailsSchema = z.object({
  name: z.string().trim().min(1, "nameRequired"),
  phone: z
    .string()
    .trim()
    .min(1, "phoneRequired")
    .regex(PATTERNS.phone, "phoneInvalid"),
  email: z.string().trim().min(1, "emailRequired").email("emailInvalid"),
  company: z.string().trim(),
  notes: z.string().trim(),
});

export type BookingFormData = z.infer<typeof detailsSchema>;

export interface DetailsStepProps {
  defaultValues: BookingFormData;
  /** Receives every edit, so the values survive going back to the schedule step. */
  onChange: (values: BookingFormData) => void;
  onBack: () => void;
  /** Sends the booking. The form stays disabled (loading button) until it settles. */
  onSubmit: (values: BookingFormData) => Promise<void>;
}

/** Step 2: contact details. */
export function DetailsStep({
  defaultValues,
  onChange,
  onBack,
  onSubmit,
}: DetailsStepProps) {
  const t = useTranslations("booking");
  const tValidation = useTranslations("validation");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues,
  });

  useEffect(() => {
    // Every field has a default value, so the watched values are always complete.
    const subscription = watch((values) => onChange(values as BookingFormData));
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const errorText = (key?: string) => (key ? tValidation(key) : undefined);
  const field = { disabled: isSubmitting } as const;
  const ltrField = { ...field, dir: "ltr" } as const;

  return (
    <motion.form
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      <InputField
        label={t("form.name")}
        placeholder={t("form.namePlaceholder")}
        autoComplete="name"
        icon={<FiUser className="size-4" />}
        error={errorText(errors.name?.message)}
        {...field}
        {...register("name")}
      />
      <InputField
        type="tel"
        inputMode="tel"
        label={t("form.phone")}
        placeholder={t("form.phonePlaceholder")}
        autoComplete="tel"
        icon={<FiPhone className="size-4" />}
        error={errorText(errors.phone?.message)}
        {...ltrField}
        {...register("phone")}
      />
      <InputField
        type="email"
        label={t("form.email")}
        placeholder={t("form.emailPlaceholder")}
        autoComplete="email"
        icon={<FiMail className="size-4" />}
        error={errorText(errors.email?.message)}
        {...ltrField}
        {...register("email")}
      />
      <InputField
        label={t("form.company")}
        placeholder={t("form.companyPlaceholder")}
        autoComplete="organization"
        icon={<FiBriefcase className="size-4" />}
        {...field}
        {...register("company")}
      />
      <InputField
        as="textarea"
        rows={3}
        label={t("form.notes")}
        placeholder={t("form.notesPlaceholder")}
        icon={<FiMessageSquare className="size-4" />}
        {...field}
        {...register("notes")}
      />

      <div className="flex items-center gap-3 pt-2">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={isSubmitting}
          icon={<FiArrowLeft />}
          iconPosition="start"
          flipIconInRtl
          className="border-edge/60 text-content hover:shadow-none"
        >
          {t("backCta")}
        </Button>
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          isLoading={isSubmitting}
          icon={<FiArrowRight />}
          flipIconInRtl
          className="flex-1 bg-gradient-to-r from-secondary to-secondary-dark shadow-lg shadow-secondary/20 hover:from-secondary-dark hover:to-secondary disabled:bg-none"
        >
          {isSubmitting ? t("submitting") : t("confirmBookingCta")}
        </Button>
      </div>
    </motion.form>
  );
}
