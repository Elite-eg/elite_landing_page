"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { SectorTabs } from "./SectorTabs";

/**
 * Navy gradient hero (Figma "Hero"), copy on the start side: the page's one orchestrated motion moment.
 * Eyebrow → title → paragraph → sector tabs rise one after another.
 */
export function SolutionsHero() {
  const t = useTranslations("solutions.hero");

  return (
    <section className="bg-gradient-to-tr from-primary-deep from-15% to-primary to-85% pb-14 pt-16 sm:pb-[3.75rem] sm:pt-[6.25rem]">
      <Container>
        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="flex flex-col items-start">
          <motion.div variants={fadeInUp}>
            <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
          </motion.div>

          <motion.h1 variants={heroTextReveal} className="mt-5 text-balance text-display text-white">
            {t.rich("title", { br: () => <br /> })}
          </motion.h1>

          <motion.p variants={fadeInUp} className="mt-5 max-w-[38.75rem] text-body-lg text-content-dark">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-9">
            <SectorTabs />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
