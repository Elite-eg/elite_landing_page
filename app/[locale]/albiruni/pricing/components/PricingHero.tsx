"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { CountrySwitcher } from "@/app/components/shared/country/CountrySwitcher";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { BillingToggle } from "./BillingToggle";

/**
 * Grey band with centred copy (Figma v4 "Pricing" hero), the page's one orchestrated entrance:
 * eyebrow → title → paragraph → billing toggle and country (currency) pill.
 */
export function PricingHero() {
  const t = useTranslations("albiruniPricing.hero");

  return (
    <section className="bg-surface-alt pb-10 pt-16 sm:pt-24">
      <Container>
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 text-center"
        >
          <motion.div variants={fadeInUp}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </motion.div>

          <motion.h1 variants={heroTextReveal} className="text-balance text-display text-body">
            {t.rich("title", { br: () => <br /> })}
          </motion.h1>

          <motion.p variants={fadeInUp} className="max-w-[38.75rem] text-body-lg text-content">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4">
            <BillingToggle />
            <CountrySwitcher
              showCurrencyName
              className="border-edge bg-surface px-4 py-2.5 text-caption text-body before:opacity-0"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
