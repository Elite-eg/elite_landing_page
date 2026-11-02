"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";

export interface ProjectsHeroProps {
  /** The category filter, the last line of the hero. */
  filter: ReactNode;
}

/**
 * White band with start-aligned copy (Figma v4 "Work"): the page's one orchestrated motion moment.
 * Eyebrow → title → paragraph → filter rise one after another.
 */
export function ProjectsHero({ filter }: ProjectsHeroProps) {
  const t = useTranslations("projects.hero");

  return (
    <section className="bg-surface pb-10 pt-16 sm:pb-12 sm:pt-24">
      <Container>
        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="flex flex-col items-start gap-5">
          <motion.div variants={fadeInUp}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </motion.div>

          <motion.h1 variants={heroTextReveal} className="text-balance text-display text-body">
            {t("title")}
          </motion.h1>

          <motion.p variants={fadeInUp} className="max-w-[35rem] text-body-lg text-content">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={fadeInUp}>{filter}</motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
