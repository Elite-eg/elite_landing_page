"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { FiX, FiSend, FiMessageSquare } from "react-icons/fi";
import { InputField } from "@/app/components/shared/InputField";
import { COMPANY_INFO } from "@/lib/constants";
import type { JobOpening } from "../data/jobsData";

const applySchema = z.object({
  fullName: z.string().min(2, "الاسم بالكامل مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(8, "رقم الهاتف مطلوب"),
  cvLink: z.string().min(5, "رابط السيرة الذاتية مطلوب"),
  coverNote: z.string().optional(),
});

type ApplyFormData = z.infer<typeof applySchema>;

interface JobApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobOpening;
  locale: "ar" | "en";
}

export function JobApplyModal({ isOpen, onClose, job, locale }: JobApplyModalProps) {
  const t = useTranslations("jobs.applyModal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTitle = job.title[locale] ?? job.title.ar ?? job.title.en ?? "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
  });

  const onSubmit = async (data: ApplyFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      toast.success(t("successToast"));
      reset();
      onClose();
    } catch {
      toast.error("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppApply = () => {
    const text = encodeURIComponent(
      `مرحباً إيليت تك، أرغب في التقديم على وظيفة: ${jobTitle}`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappPhone}?text=${text}`, "_blank");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      {/* Light Ambient Overlay Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#070e1c]/45 backdrop-blur-md transition-opacity duration-300 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
        <DialogPanel
          transition
          className="relative w-full max-w-lg transform overflow-hidden rounded-3xl bg-surface p-6 sm:p-8 text-start align-middle shadow-2xl transition-all duration-300 ease-out border border-edge/60 data-[closed]:translate-y-6 data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {/* Top Decorative Gradient Line */}
          <div
            className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse"
            aria-hidden="true"
          />

          {/* Modal Header */}
          <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-edge/40 pt-1">
            <div>
              <DialogTitle
                as="h3"
                className="text-lg sm:text-xl font-extrabold text-surface-dark"
              >
                {t("title")}
              </DialogTitle>
              <p className="text-xs sm:text-sm text-secondary-dark font-semibold mt-1">
                {t("subtitle", { jobTitle })}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={onClose}
              className="p-2 text-content hover:text-surface-dark hover:bg-surface-muted rounded-full transition-colors shrink-0"
            >
              <FiX className="size-5" />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              label={t("fullName")}
              placeholder={t("fullNamePlaceholder")}
              error={errors.fullName?.message}
              {...register("fullName")}
            />

            <InputField
              label={t("email")}
              type="email"
              placeholder={t("emailPlaceholder")}
              error={errors.email?.message}
              {...register("email")}
            />

            <InputField
              label={t("phone")}
              type="tel"
              placeholder={t("phonePlaceholder")}
              error={errors.phone?.message}
              {...register("phone")}
            />

            <InputField
              label={t("cvLink")}
              placeholder={t("cvLinkPlaceholder")}
              error={errors.cvLink?.message}
              {...register("cvLink")}
            />

            <InputField
              as="textarea"
              rows={3}
              label={t("coverNote")}
              placeholder={t("coverNotePlaceholder")}
              error={errors.coverNote?.message}
              {...register("coverNote")}
            />

            <div className="pt-2 space-y-3">
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-surface font-bold text-sm transition-all duration-200 shadow-md disabled:opacity-50"
              >
                <FiSend className="size-4" />
                <span>{isSubmitting ? t("submitting") : t("submit")}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                type="button"
                onClick={handleWhatsAppApply}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-whatsapp/40 bg-whatsapp/10 hover:bg-whatsapp/20 text-whatsapp-dark font-bold text-xs sm:text-sm transition-all duration-200"
              >
                <FiMessageSquare className="size-4 text-whatsapp" />
                <span>{t("orApplyWhatsapp")}</span>
              </motion.button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
