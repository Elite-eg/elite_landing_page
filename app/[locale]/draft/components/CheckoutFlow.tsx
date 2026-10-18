"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { useRegion } from "@/app/store/useRegion";
import type { RegionCode } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";
import type { CheckoutStep, CompanyDetails, PaymentMethodKey } from "../data/checkoutData";
import { ActivationSuccess } from "./ActivationSuccess";
import { BankTransferPending } from "./BankTransferPending";
import { CheckoutStepper } from "./CheckoutStepper";
import { CompanyDetailsStep } from "./CompanyDetailsStep";
import { OrderSummary } from "./OrderSummary";
import { PaymentStep } from "./PaymentStep";

const STEP_INDEX: Record<CheckoutStep, number> = { company: 0, payment: 1, result: 2 };

/**
 * Subscription checkout: company details → payment (Egypt / Saudi Arabia) → activated or awaiting bank transfer.
 * DRAFT: state is local only; nothing is sent to a backend yet.
 */
export function CheckoutFlow() {
  const t = useTranslations("checkout.meta");
  const { region } = useRegion();
  const [step, setStep] = useState<CheckoutStep>("company");
  const [country, setCountry] = useState<RegionCode | null>(null);
  const [company, setCompany] = useState<CompanyDetails | undefined>();
  const [method, setMethod] = useState<PaymentMethodKey | null>(null);

  /** Defaults to the visitor's header region until they pick a country. */
  const activeCountry = country ?? region;
  const isPending = method === "bankTransfer";

  const goTo = (next: CheckoutStep) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="min-h-[70vh] bg-surface-alt py-10 sm:py-14">
      <Container className="max-w-5xl">
        {/* The flow has no hero, so the page's single h1 is visually hidden. */}
        <h1 className="sr-only">{t("title")}</h1>
        <CheckoutStepper current={STEP_INDEX[step]} isComplete={step === "result" && !isPending} />

        <motion.div key={step} variants={fadeInUp} initial="hidden" animate="visible" className="mt-10">
          {step === "result" ? (
            isPending ? (
              <BankTransferPending country={activeCountry} />
            ) : (
              <ActivationSuccess country={activeCountry} email={company?.email ?? ""} />
            )
          ) : (
            <div className="grid items-start gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                {step === "company" ? (
                  <CompanyDetailsStep
                    country={activeCountry}
                    onCountryChange={setCountry}
                    defaultValues={company}
                    onSubmit={(values) => {
                      setCompany(values);
                      goTo("payment");
                    }}
                  />
                ) : (
                  <PaymentStep
                    country={activeCountry}
                    onBack={() => goTo("company")}
                    onComplete={(chosen) => {
                      setMethod(chosen);
                      goTo("result");
                    }}
                  />
                )}
              </div>
              <div className="lg:col-span-5">
                <OrderSummary country={activeCountry} />
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
