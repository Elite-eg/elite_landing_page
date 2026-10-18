"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";
import { InputField } from "@/app/components/shared/InputField";
import type { PaymentValues } from "../data/paymentSchema";

interface CardFieldsProps {
  register: UseFormRegister<PaymentValues>;
  errors: FieldErrors<PaymentValues>;
  disabled?: boolean;
}

export function CardFields({ register, errors, disabled }: CardFieldsProps) {
  const t = useTranslations("checkout.payment.card");
  const tValidation = useTranslations("validation");
  const errorText = (key?: string) => (key ? tValidation(key) : undefined);
  const ltrInput = { dir: "ltr", inputClassName: "rtl:text-end", disabled } as const;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <InputField
        className="sm:col-span-2"
        label={t("number")}
        placeholder={t("numberPlaceholder")}
        inputMode="numeric"
        autoComplete="cc-number"
        error={errorText(errors.cardNumber?.message)}
        {...ltrInput}
        {...register("cardNumber")}
      />
      <InputField
        label={t("expiry")}
        placeholder={t("expiryPlaceholder")}
        inputMode="numeric"
        autoComplete="cc-exp"
        error={errorText(errors.cardExpiry?.message)}
        {...ltrInput}
        {...register("cardExpiry")}
      />
      <InputField
        label={t("cvc")}
        placeholder={t("cvcPlaceholder")}
        inputMode="numeric"
        autoComplete="cc-csc"
        error={errorText(errors.cardCvc?.message)}
        {...ltrInput}
        {...register("cardCvc")}
      />
    </div>
  );
}
