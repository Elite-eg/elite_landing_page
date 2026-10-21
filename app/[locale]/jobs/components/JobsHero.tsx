"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { OPEN_JOB_POSITIONS } from "../data/jobsData";

/**
 * Navy gradient hero with centred copy (Figma v4 "Careers"): the page's one orchestrated motion moment.
 * Eyebrow → title → paragraph rise one after another.
 */
export function JobsHero() {
  const t = useTranslations("jobs");

  return (
    <section className="bg-gradient-to-tr from-primary-deep from-15% to-primary to-85% pb-16 pt-20 sm:pb-[5.625rem] sm:pt-[6.25rem]">
      <Container className="text-center">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Eyebrow tone="dark">{t("badge", { count: OPEN_JOB_POSITIONS.length })}</Eyebrow>
          </motion.div>

          <motion.h1 variants={heroTextReveal} className="mx-auto mt-5 max-w-3xl text-balance text-display text-white">
            {t("heroTitle")}
          </motion.h1>

          <motion.p variants={fadeInUp} className="mx-auto mt-5 max-w-[38.75rem] text-body-lg text-content-dark">
            {t("heroSubtitle")}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
