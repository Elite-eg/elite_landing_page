"use client";

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
import { InputField } from "@/app/components/shared/InputField";

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  notes: string;
}

export interface BookingDetailsFormProps {
  formData: BookingFormData;
  isRtl: boolean;
  onFormChange: (data: BookingFormData) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function BookingDetailsForm({
  formData,
  isRtl,
  onFormChange,
  onBack,
  onSubmit,
}: BookingDetailsFormProps) {
  const t = useTranslations("booking");

  return (
    <motion.form
      key="details"
      initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRtl ? 16 : -16 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <InputField
        label={t("form.name")}
        type="text"
        required
        value={formData.name}
        onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
        placeholder={t("form.namePlaceholder")}
        icon={<FiUser className="size-4" />}
      />

      <InputField
        label={t("form.phone")}
        type="tel"
        required
        value={formData.phone}
        onChange={(e) => onFormChange({ ...formData, phone: e.target.value })}
        placeholder={t("form.phonePlaceholder")}
        icon={<FiPhone className="size-4" />}
      />

      <InputField
        label={t("form.email")}
        type="email"
        required
        value={formData.email}
        onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
        placeholder={t("form.emailPlaceholder")}
        icon={<FiMail className="size-4" />}
      />

      <InputField
        label={t("form.company")}
        type="text"
        value={formData.company}
        onChange={(e) => onFormChange({ ...formData, company: e.target.value })}
        placeholder={t("form.companyPlaceholder")}
        icon={<FiBriefcase className="size-4" />}
      />

      <InputField
        as="textarea"
        rows={3}
        label={t("form.notes")}
        value={formData.notes}
        onChange={(e) => onFormChange({ ...formData, notes: e.target.value })}
        placeholder={t("form.notesPlaceholder")}
        icon={<FiMessageSquare className="size-4" />}
      />

      <div className="flex items-center gap-3 pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={onBack}
          className="py-3 px-4 rounded-xl text-xs font-bold border border-edge/60 text-content hover:bg-surface-alt transition-all duration-200 cursor-pointer"
        >
          {t("backCta")}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-surface font-bold py-3.5 px-6 rounded-2xl text-sm shadow-lg shadow-secondary/20 transition-all duration-300 cursor-pointer"
        >
          <span>{t("confirmBookingCta")}</span>
          {isRtl ? (
            <FiArrowLeft className="size-4" />
          ) : (
            <FiArrowRight className="size-4" />
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
