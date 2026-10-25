"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/app/components/shared/Button";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { AGENCY_FORM_HREF, OUR_AGENT_HREF } from "../data/agentsData";

/**
 * Navy hero with start-aligned copy (Figma v4 "Agents"): the page's one orchestrated motion moment.
 * Eyebrow → title → paragraph → buttons rise one after another.
 */
export function AgentsHero() {
  const t = useTranslations("agents.hero");

  return (
    <section className="bg-primary-dark py-20 sm:py-[6.875rem]">
      <Container>
        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="flex flex-col items-start">
          <motion.div variants={fadeInUp}>
            <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
          </motion.div>

          <motion.h1 variants={heroTextReveal} className="mt-3.5 max-w-3xl text-balance text-display text-white">
            {t("title")}
          </motion.h1>

          <motion.p variants={fadeInUp} className="mt-3.5 max-w-prose text-body-lg text-content-dark">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-7 flex flex-wrap gap-3">
            <Button href={AGENCY_FORM_HREF} variant="secondary" size="lg">
              {t("apply")}
            </Button>
            <Button href={OUR_AGENT_HREF} variant="glass" size="lg">
              {t("meetAgent")}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
