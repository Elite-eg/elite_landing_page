"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { COMPANY_INFO, type AppLocale } from "@/lib/constants";
import { fadeInUp, heroStagger, heroTextReveal, slideInFromEnd, withDelay } from "@/lib/animations";
import { AboutHeroVisual } from "./AboutHeroVisual";

/** The page's one orchestrated motion moment: copy staggers in, then the visual slides from the end side. */
export function AboutHero() {
  const t = useTranslations("about.hero");
  const locale = useLocale() as AppLocale;
  const brand = COMPANY_INFO.brandName[locale];

  return (
    <section className="relative isolate overflow-hidden bg-surface pb-12 pt-10 sm:pt-14 lg:pb-16 lg:pt-20">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-dot-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />

      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.div className="lg:col-span-7" variants={heroStagger} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </motion.div>

          <motion.h1 variants={heroTextReveal} className="mt-5 text-balance text-display text-primary">
            {t("title")}
          </motion.h1>

          <motion.p variants={fadeInUp} className="mt-6 max-w-prose text-body-lg text-content">
            {t("description", { brand })}
          </motion.p>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          variants={withDelay(slideInFromEnd(locale === "ar"), 0.45)}
          initial="hidden"
          animate="visible"
        >
          <AboutHeroVisual alt={t("visualAlt", { brand })} />
        </motion.div>
      </Container>
    </section>
  );
}
