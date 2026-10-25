"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import type { AppLocale, RegionCode } from "@/lib/constants";
import { PAYMENT_METHODS, PAYMENT_METHOD_ICONS, getOrderTotals, type PaymentMethodKey } from "../data/checkoutData";
import { paymentSchema, type PaymentValues } from "../data/paymentSchema";
import { formatMoney } from "../utils/formatMoney";
import { CardFields } from "./CardFields";
import { CheckoutPanel } from "./CheckoutPanel";
import { PaymentMethodOption } from "./PaymentMethodOption";

/** DRAFT: no payment gateway yet, so payment is simulated with a short delay. */
const SIMULATED_PAYMENT_MS = 900;

interface PaymentStepProps {
  country: RegionCode;
  onBack: () => void;
  onComplete: (method: PaymentMethodKey) => void;
}

/** P-02a (Egypt) / P-02b (Saudi Arabia) · Payment method. */
export function PaymentStep({ country, onBack, onComplete }: PaymentStepProps) {
  const t = useTranslations("checkout.payment");
  const tCountries = useTranslations("countries");
  const locale = useLocale() as AppLocale;
  const { total, currency } = getOrderTotals(country);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { method: "card", cardNumber: "", cardExpiry: "", cardCvc: "" },
  });
  const method = watch("method");

  const onSubmit = async ({ method: chosen }: PaymentValues) => {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_PAYMENT_MS));
    onComplete(chosen);
  };

  const submitLabel = isSubmitting
    ? t("processing")
    : method === "bankTransfer"
      ? t("confirmTransfer")
      : t("pay", { amount: formatMoney(total, currency, locale) });

  return (
    <CheckoutPanel title={t("title")} subtitle={t("subtitle", { country: tCountries(country) })}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <Controller
          control={control}
          name="method"
          render={({ field }) => (
            <RadioGroup value={field.value} onChange={field.onChange} aria-label={t("title")} className="space-y-3">
              {PAYMENT_METHODS[country].map((key) => (
                <PaymentMethodOption
                  key={key}
                  value={key}
                  icon={PAYMENT_METHOD_ICONS[key]}
                  label={t(`methods.${key}.label`)}
                  description={t(`methods.${key}.description`, { country })}
                  isSelected={field.value === key}
                >
                  {key === "card" && <CardFields register={register} errors={errors} disabled={isSubmitting} />}
                </PaymentMethodOption>
              ))}
            </RadioGroup>
          )}
        />

        <Button type="submit" variant="secondary" size="lg" fullWidth isLoading={isSubmitting} icon={<FiLock />} iconPosition="start">
          {submitLabel}
        </Button>
        <p className="text-center text-xs text-content">{t("secureNote")}</p>

        <div className="text-center">
          <Button variant="ghost" size="sm" onClick={onBack} disabled={isSubmitting} icon={<FiArrowLeft />} iconPosition="start" flipIconInRtl>
            {t("back")}
          </Button>
        </div>
      </form>
    </CheckoutPanel>
  );
}
